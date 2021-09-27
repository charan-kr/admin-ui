import React, { useEffect, useState, useRef } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

import SearchDBService from "./../Service/SearchDBService";
import subcategoryService from "./../Service/subcategoryService";
import CategoryService from "./../Service/categoryService";
import IngestionService from "./../Service/IngestionService";
import SkuIngestionService from "./../Service/SkuIngestion";
import { MultiSelect } from "primereact/multiselect";
import { useHistory } from "react-router-dom";

const Form = (props) => {
  const {
    edit = false,
    data = null,
    categories,
    item: selecetdRow,
    refresh,
    closeDialog,
  } = props;
  const [item, setItem] = useState(null);
  const [errors, setErrors] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [position, setPosition] = useState(0);
  const [productList, setProductList] = useState([]);
  const [dvnList, setDVNList] = useState([]);
  const [dskuList, setDskuList] = useState([]);
  const ingestionService = new IngestionService();
  useEffect(() => {
    if (edit && selecetdRow) {
      const item = {
        category: selecetdRow.category || "",
        subCategory: selecetdRow.subCategory || "",
        items: selecetdRow.items || [],
        product: selecetdRow.items
          ? Array.from(new Set(selecetdRow.items.map((item) => item.productId)))
          : [],
        dvn: selecetdRow.items
          ? Array.from(new Set(selecetdRow.items.map((item) => item.dvnId)))
          : [],
        dsku: selecetdRow.items,
      };
      console.log(item);
      setItem(item);
    }
  }, [edit, selecetdRow]);

  useEffect(() => {
    if (item?.category) {
      const subCategoryService = new subcategoryService();
      const category = categories.find(
        (ele) => ele.categoryName === item.category
      );

      if (category) {
        subCategoryService
          .getAllsubCategoriesByCategoryId(category.categoryId)
          .then((res) => setSubCategories(res.data));
      }
    }
  }, [item?.category]);
  useEffect(() => {
    if (item?.subCategory) {
      ingestionService.getProductIngestionDetails().then((res) => {
        setProductList(res.data);
      });
    }
  }, [item?.subCategory]);
  useEffect(() => {
    if (item?.product?.length > 0) {
      ingestionService
        .getAllDVNIngestionByProductId(item.product[0])
        .then((res) => {
          const validDvns = item?.dvn?.filter((ele) =>
            item.product.includes(ele.productId)
          );
          const validDskus = item?.dsku?.filter((ele) =>
            validDvns.map((ele) => ele.dvnid).includes(ele.dvnid)
          );
          setItem((prevState) => ({
            ...prevState,
            dvn: validDvns,
            dsku: validDskus,
          }));
          setDVNList(res.data);
        });
    }
  }, [item?.product]);
  useEffect(() => {
    const skuIngestionService = new SkuIngestionService();

    if (item?.dvn?.length > 0) {
      const validDskus = item?.dsku?.filter((ele) =>
        item?.dvn?.map((ele) => ele?.dvnid).includes(ele?.dvnid)
      );
      skuIngestionService.getAllDskusByDvnId(item.dvn[0]).then((res) => {
        setItem((prevState) => ({ ...prevState, dsku: validDskus }));
        setDskuList(res.data);
      });
    }
  }, [item?.dvn]);
  const history = useHistory();
  const onSubmit = () => {
    //  const isValid = runValidation(form);
    //  if (!isValid) {
    //    return;
    //  }
    const searchDBService = new SearchDBService();

    function getProductId(dvnId) {
      console.log(dvnList);
      const product = dvnList.find((item) => item.dvnid === dvnId);
      return product?.productId || null;
    }

    let parsedItems = item.dsku.map((ele) => ({
      productId: getProductId(ele.dvnid),
      dvnId: ele.dvnid,
      dskuId: ele.dskuid,
    }));
    let body = {
      ...data,
      category: item.category,
      subCategory: item.subCategory,
      items: parsedItems,
    };
    if (edit && selecetdRow?.id) {
      body.id = selecetdRow.id;
      searchDBService
        .updateSearchDB(body)
        .then(() => {
          refresh();
          closeDialog();
        })
        .catch((error) => {});
    } else {
      searchDBService
        .insertSearchDB(body)
        .then(() => {
          refresh();
          closeDialog();
        })
        .catch((error) => {});
    }
  };
  const isFormFieldValid = (name) => !errors[name];

  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error p-invalid">{errors[name]}</small>
      )
    );
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setItem((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <>
      {!position ? (
        <div>
          <div className="p-field">
            <label htmlFor="category">
              Category <span className="p-error">*</span>
            </label>

            <div className="p-inputgroup">
              <Dropdown
                className=" p-jc-center"
                value={item?.category}
                options={categories}
                name="category"
                id="category"
                onChange={handleFormChange}
                placeholder=" -- Select a category -- "
                optionLabel="categoryName"
                optionValue="categoryName"
                filter
                filterBy="categoryName"
              />
            </div>

            {getFormErrorMessage("category")}
          </div>
          <div className="p-field">
            <label htmlFor="subCategory">
              Sub Category <span className="p-error">*</span>
            </label>

            <div className="p-inputgroup">
              <Dropdown
                className=" p-jc-center"
                value={item?.subCategory}
                options={subCategories}
                name="subCategory"
                id="subCategory"
                onChange={handleFormChange}
                placeholder=" -- Select a subCategory -- "
                optionLabel="subCategoryName"
                optionValue="subCategoryName"
                disabled={!item?.category}
                filter
                filterBy="subCategoryName"
              />
            </div>

            {getFormErrorMessage("subCategory")}
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div>
              {item.category}
              <i
                className="p-mx-2 fa fa-angle-double-right"
                aria-hidden="true"
              ></i>
              {item.subCategory}
            </div>
          </div>
          <div className="p-field">
            <label htmlFor="productId">Product</label>

            <div className="p-inputgroup">
              <MultiSelect
                value={item?.product}
                options={productList}
                name="product"
                id="product"
                onChange={handleFormChange}
                placeholder=" -- Select a product -- "
                optionLabel="productName"
                optionValue="productId"
                disabled={!item?.subCategory}
                filter
                filterBy="productName"
              />
            </div>

            {getFormErrorMessage("product")}
          </div>

          <div className="p-field">
            <label htmlFor="dvn">DVN</label>

            <div className="p-inputgroup">
              <MultiSelect
                value={item?.dvn}
                options={dvnList}
                name="dvn"
                id="dvn"
                onChange={handleFormChange}
                placeholder=" -- Select a DVN -- "
                optionLabel="title"
                optionValue="dvnid"
                disabled={!item?.product}
                filter
                filterBy="title"
              />
            </div>

            {getFormErrorMessage("dvn")}
          </div>

          <div className="p-field">
            <label htmlFor="dsku">DSKU</label>

            <div className="p-inputgroup">
              <MultiSelect
                value={item?.dsku}
                options={dskuList}
                name="dsku"
                id="dsku"
                onChange={handleFormChange}
                placeholder=" -- Select a dsku's -- "
                optionLabel="sellerSKUId"
                disabled={!item?.dvn?.length}
                filter
                filterBy="sellerSKUId"
              />
            </div>

            {getFormErrorMessage("dsku")}
          </div>
        </div>
      )}
      <div className=" p-ai-center p-jc-between p-d-flex">
        <div>
          {position ? (
            <Button
              onClick={() => setPosition(0)}
              className="p-button-info p-py-1"
              label="Prev"
              icon="pi pi-angle-double-left"
              iconPos="left"
            />
          ) : null}
        </div>
        {position ? (
          <Button
            onClick={onSubmit}
            className="p-button-success p-py-1"
            label="Save"
            icon="pi pi-save"
          />
        ) : (
          <Button
            onClick={() => setPosition(1)}
            className="p-button-help p-py-1"
            label="Next"
            icon="pi pi-angle-double-right"
            iconPos="right"
            disabled={!item?.category || !item?.subCategory}
          />
        )}
      </div>
    </>
  );
};

export default Form;
