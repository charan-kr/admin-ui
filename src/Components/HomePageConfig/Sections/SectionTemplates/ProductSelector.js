import React, { useEffect, useState } from "react";

import { Dropdown } from "primereact/dropdown";

import CategoryService from "../../../Service/categoryService";
import SubCategoryService from "../../../Service/subcategoryService";
import IngestionService from "../../../Service/IngestionService";
import SkuIngestionService from "../../../Service/SkuIngestion";

export const ProductSelector = (props) => {
  const { handleItemSelection } = props;
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [dvns, setDvns] = useState([]);
  const [dsku, setDsku] = useState([]);
  const [item, setItem] = useState({
    category: null,
    subCategory: null,
    productId: "",
    dvnId: "",
    dskuId: "",
  });

  const ingestionService = new IngestionService();

  useEffect(() => {
    const categoryService = new CategoryService();
    categoryService.getAllCategories().then((res) => {
      setCategories(res.data);
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    if (item?.category) {
      const subCategoryService = new SubCategoryService();
      const category = categories.find(
        (ele) => ele.categoryName === item.category
      );

      if (category) {
        subCategoryService
          .getAllsubCategoriesByCategoryId(category.categoryId)
          .then((res) => {
            setSubCategories(res.data);
            setItem((prevState) => ({
              ...prevState,
              subCategory: null,
              productId: "",
              dvnId: "",
              dskuId: "",
            }));
          });
      }
    }
  }, [item?.category]); // eslint-disable-line
  useEffect(() => {
    if (item?.subCategory) {
      ingestionService
        .getProductsBySubCategory(item.category, item.subCategory)
        .then((res) => {
          setProducts(res.data);
          setItem((prevState) => ({
            ...prevState,
            productId: "",
            dvnId: "",
            dskuId: "",
          }));
        });
    }
  }, [item?.subCategory]); // eslint-disable-line

  useEffect(() => {
    if (item?.productId) {
      ingestionService.getAllDVNByProductId(item.productId).then((res) => {
        setDvns(res.data);
        setItem((prevState) => ({
          ...prevState,
          dvnId: "",
          dskuId: "",
        }));
      });
    }
  }, [item?.productId]); // eslint-disable-line
  useEffect(() => {
    const skuIngestionService = new SkuIngestionService();

    if (item?.dvnId) {
      skuIngestionService.getAllDskusByDvnId(item.dvnId).then((res) => {
        setDsku(res.data);
        setItem((prevState) => ({
          ...prevState,
          dskuId: "",
        }));
      });
    }
  }, [item?.dvnId]); // eslint-disable-line
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "dvnId") {
      handleItemSelection({ ...item, dvnId: value });
    }
  };
  return (
    <>
      <div>
        <label>
          <small>Choose Category </small>
        </label>
        <div className="p-fluid">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-tag"></i>
            </span>
            <Dropdown
              name="category"
              id="category"
              value={item.category}
              options={categories}
              onChange={handleFormChange}
              optionLabel="categoryName"
              optionValue="categoryName"
              filter
              showClear
              filterBy="categoryName"
              placeholder="Select a Category"
            />
          </div>
        </div>
      </div>
      <div>
        <label>
          <small>Choose Sub Category </small>
        </label>
        <div className="p-fluid">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-tag"></i>
            </span>
            <Dropdown
              name="subCategory"
              id="subCategory"
              value={item.subCategory}
              options={subCategories}
              onChange={handleFormChange}
              optionLabel="subCategoryName"
              optionValue="subCategoryName"
              filter
              showClear
              filterBy="subCategoryName"
              placeholder="Select a Sub Category"
            />
          </div>
        </div>
      </div>
      <div>
        <label>
          <small>Choose Product </small>
        </label>
        <div className="p-fluid">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-tag"></i>
            </span>
            <Dropdown
              name="productId"
              id="productId"
              value={item.productId}
              options={products}
              onChange={handleFormChange}
              filter
              showClear
              filterBy="productName"
              placeholder=" -- Select a product -- "
              optionLabel="productName"
              optionValue="productId"
            />
          </div>
        </div>
      </div>
      <div>
        <label>
          <small>Choose DVN </small>
        </label>
        <div className="p-fluid">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-tag"></i>
            </span>
            <Dropdown
              value={item?.dvnId}
              options={dvns}
              name="dvnId"
              id="dvnId"
              onChange={handleFormChange}
              placeholder=" -- Select a DVN -- "
              optionLabel="title"
              optionValue="dvnid"
              disabled={!item?.productId}
              filter
              filterBy="title"
              showClear
            />
          </div>
        </div>
      </div>
      <div className="p-d-none">
        <label>
          <small>Choose DSKU </small>
        </label>
        <div className="p-fluid">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-tag"></i>
            </span>
            <Dropdown
              value={item?.dskuId}
              options={dsku}
              name="dskuId"
              id="dskuId"
              onChange={handleFormChange}
              placeholder=" -- Select a DSKU -- "
              optionLabel="sellerDisplayName"
              optionValue="dskuId"
              disabled={!item?.dvnId}
              filter
              filterBy="sellerDisplayName"
              showClear
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSelector;
