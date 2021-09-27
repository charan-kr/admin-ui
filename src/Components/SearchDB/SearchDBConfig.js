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
import { MultiSelect } from "primereact/multiselect";

import SearchDBService from "./../Service/SearchDBService";
import subcategoryService from "./../Service/subcategoryService";
import CategoryService from "./../Service/categoryService";
import IngestionService from "./../Service/IngestionService";
import SkuIngestionService from "./../Service/SkuIngestion";

const SearchDBConfig = ({ keyword = null, edit_ = false }) => {
  const dt = useRef(null);
  const [edit, setEdit] = useState(edit_);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const [form, setForm] = useState({
    keyword: "",
    description: "",
    algorithm: null,
    method: null,
    input: null,
  });

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const searchDBService = new SearchDBService();

  useEffect(() => {
    const categoryService = new CategoryService();
    categoryService.getAllCategories().then((res) => setCategories(res.data));
  }, []); //eslint-disable-line

  useEffect(() => {
    if (keyword && edit) {
      refresh(keyword);
      setForm((prevState) => ({ ...prevState, keyword }));
    }
  }, [keyword, edit]); //eslint-disable-line
  const refresh = (keyword = form.keyword) => {
    if (!edit) setEdit(true);
    searchDBService.getAllSearchDBs().then((res) => {
      const filterdRes = res.data.filter((ele) => ele.keyword === keyword);
      setItems(filterdRes);
      if (filterdRes.length > 0) {
        let data = filterdRes[0];
        setForm((prevState) => ({
          ...prevState,
          description: data.description,
          algorithm: data.algorithm,
          method: data.method,
          input: data.input,
          keyword: data.keyword,
        }));
      }
    });
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };
  const deleteRecord = (id) => {
    searchDBService.deleteSearchDB(id).then(() => {
      toast.current.show({
        severity: "info",
        summary: "Deleted !!",
      });
      setItems(items.filter((item) => item.id !== id));
    });
  };

  const confirm = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => deleteRecord(id),
    });
  };

  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of Search DB's</h3>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="p-py-1"
        />
      </span>
    </div>
  );
  const openDialog = (data) => {
    if (form.keyword && form.keyword.length > 2) {
      if (data) {
        setSelectedRow(data);
      }
      setVisible(true);
      return;
    }
    toast.current.show({
      severity: "info",
      summary: "Keyword cannot be empty",
      detail: "Enter valid keyword before adding product",
      life: 6000,
    });
  };
  const leftToolbarTemplate = () => {
    return (
      <Button
        onClick={openDialog}
        label="New"
        icon="pi pi-plus"
        className="p-button-success p-mr-2 p-py-1"
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="p-text-right">
        <Button
          onClick={() => openDialog(rowData)}
          icon="pi pi-pencil"
          className="p-button-text p-p-0 p-button-warning p-mx-1"
        />

        <Button
          icon="pi pi-trash"
          className="p-button-text p-p-0 p-button-danger"
          onClick={(e) => confirm(e, rowData.id)}
        />
      </div>
    );
  };
  const [visible, setVisible] = useState(false);
  const [selecetdRow, setSelectedRow] = useState(null);

  const closeDialog = () => {
    setVisible(false);
    setSelectedRow(null);
  };
  return (
    <>
      <Dialog
        header={form?.keyword}
        style={{ width: "30%" }}
        visible={visible}
        onHide={closeDialog}
        focusOnShow={false}
      >
        {selecetdRow ? (
          <Form
            edit={true}
            item={selecetdRow}
            data={form}
            categories={categories}
            refresh={refresh}
            closeDialog={closeDialog}
          />
        ) : (
          <Form
            refresh={refresh}
            closeDialog={closeDialog}
            data={form}
            categories={categories}
          />
        )}
      </Dialog>
      <Toast ref={toast} />
      <div className="p-grid">
        <div className="p-col-12 p-md-5 p-xl-4">
          <div className="p-field">
            <label htmlFor="keyword">
              Keyword <span className="p-error">*</span>
            </label>
            <div>
              <InputText
                disabled={edit}
                value={form.keyword}
                id="keyword"
                name="keyword"
                onChange={handleFormChange}
                className="p-inputgroup"
              />
            </div>
          </div>
          <div className="p-field">
            <label htmlFor="description">
              Description <span className="p-error">*</span>
            </label>
            <div>
              <InputTextarea
                value={form.description}
                id="description"
                name="description"
                onChange={handleFormChange}
                className="p-inputgroup"
                rows={3}
              />
            </div>
          </div>
        </div>
        <div className="p-col">
          <div>
            <Toolbar
              className="p-mb-1 p-p-1"
              left={leftToolbarTemplate}
            ></Toolbar>
            <DataTable
              value={items}
              ref={dt}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${
                keyword || form?.keyword
              }`}
              globalFilter={globalFilter}
              header={header}
              className="p-datatable-sm p-datatable-gridlines"
            >
              <Column field="category" header="Category" />
              <Column field="subCategory" header="Sub Category" />
              <Column field="items.length" header="Items" />
              <Column
                style={{ width: "7rem" }}
                header="Action"
                body={actionBodyTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchDBConfig;

const Form = ({
  edit = false,
  data = null,
  categories,
  item: selecetdRow,
  refresh,
  closeDialog,
}) => {
  const [item, setItem] = useState(null);
  const [errors] = useState({});
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
          ? Array.from(
              new Set(
                selecetdRow.items.map((item) => ({
                  dvnid: item.dvnId,
                  productId: item.productId,
                }))
              )
            )
          : [],
        dsku: selecetdRow.items,
      };
      setItem(item);
    }
  }, [edit, selecetdRow]); //eslint-disable-line

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
  }, [item?.category]); //eslint-disable-line
  useEffect(() => {
    if (item?.subCategory) {
      ingestionService.getProductIngestionDetails().then((res) => {
        setItem((prevState) => ({
          ...prevState,
          product:
            res.data
              .filter((item_) => item.product.includes(item_.productId))
              .map((item) => item.productId) || [],
        }));
        setProductList(res.data);
      });
    }
  }, [item?.subCategory]); //eslint-disable-line
  useEffect(() => {
    if (item?.product?.length > 0) {
      ingestionService
        .getAllDVNIngestionByProductId(item.product[0])
        .then((res) => {
          let validDvns = item?.dvn?.filter((ele) =>
            item.product.includes(ele.productId)
          );

          validDvns = validDvns.map((ele) =>
            res.data.find((item) => item.dvnid === ele.dvnid)
          );

          setItem((prevState) => ({
            ...prevState,
            dvn: validDvns,
          }));
          setDVNList(res.data);
        });
    }
  }, [item?.product]); //eslint-disable-line
  useEffect(() => {
    const skuIngestionService = new SkuIngestionService();

    if (item?.dvn?.length > 0) {
      let validDskus = item?.dsku?.filter((ele) =>
        item?.dvn?.map((ele) => ele?.dvnid).includes(ele?.dvnId || ele?.dvnid)
      );

      skuIngestionService.getAllDskusByDvnId(item.dvn[0].dvnid).then((res) => {
        validDskus = validDskus.map((ele) =>
          res.data.find((item) => item.dskuid === (ele.dskuid || ele?.dskuId))
        );

        setItem((prevState) => ({ ...prevState, dsku: validDskus }));
        setDskuList(res.data);
      });
    }
  }, [item?.dvn]); //eslint-disable-line
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
                // selectedItemTemplate={productTemplate}
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
