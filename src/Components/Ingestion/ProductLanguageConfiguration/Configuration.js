import React, { useEffect, useRef, useState } from "react";

import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import CustomBreadcrumbs from "../../CustomBreadCrumbs";
import Loading from "../../Loading";

import IngestionService from "../../Service/LanguagesService";

const breadcrumbs = [
  {
    label: "Product Language Config",
    path: "/ingestion/productLanguageConfiguration",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "Settings",
    path: "/ingestion/productLanguageConfiguration/settings",
    icon: "fa fa-cogs",
    onlyIcon: false,
    showIcon: false,
  },
];
const basicLanguageSetup = [
  { key: "productId", label: "Product Id", editable: false, default: "No" },
  { key: "categoryId", label: "Category Id", editable: false, default: "No" },
  {
    key: "subCategoryId",
    label: "SubCategory Id",
    editable: false,
    default: "No",
  },
  { key: "category", label: "Category", editable: true, default: "No" },
  { key: "subCategory", label: "Sub Category", editable: true, default: "No" },
  { key: "productName", label: "Product Name", editable: true, default: "No" },
  { key: "manufacturer", label: "Manufacturer", editable: true, default: "No" },
  {
    key: "manufacturerProductDescription",
    label: "Manufacturer Product Description",
    editable: true,
    default: "No",
  },
  { key: "model", label: "Model", editable: true, default: "No" },
  { key: "newerModel", label: "Newer Model", editable: false, default: "No" },
  {
    key: "newerModelExist",
    label: "Newer Model Exist",
    editable: false,
    default: "No",
  },
  {
    key: "newerModelProductId",
    label: "Newer Model ProductId",
    editable: false,
    default: "No",
  },
  { key: "brand", label: "Brand", editable: true, default: "No" },
  { key: "productType", label: "Product Type", editable: true, default: "No" },
  { key: "uitemplate", label: "UI Template", editable: true, default: "No" },
  { key: "title", label: "Title", editable: true, default: "No" },
  { key: "description", label: "Description", editable: true, default: "No" },
  { key: "createdDt", label: "Created Date", editable: false, default: "No" },
  { key: "modifiedDt", label: "Modified Date", editable: false, default: "No" },
  {
    key: "publishedDt",
    label: "Published Date",
    editable: false,
    default: "No",
  },
  { key: "tags", label: "Tags", editable: false, default: "No" },
  {
    key: "displayAttributes",
    label: "Display Attributes",
    editable: true,
    default: "No",
  },
  {
    key: "nonDisplayAttributes",
    label: "Non Display Attributes",
    editable: true,
    default: "No",
  },
  { key: "optionsList", label: "Options List", editable: true, default: "No" },
  { key: "status", label: "Status", editable: true, default: "No" },
];
const options = ["Yes", "No"];
const Configuration = () => {
  const [loading, setLoading] = useState(true);
  const toast = useRef();

  const languageConfiguration = new IngestionService();

  const [form, setForm] = useState({
    brand: "Yes",
    category: "No",
    categoryId: "No",
    createdDt: "No",
    description: "Yes",
    displayAttributes: "Yes",
    manufacturer: "Yes",
    manufacturerProductDescription: "Yes",
    model: "No",
    modifiedDt: "No",
    newerModel: "No",
    newerModelExist: "No",
    newerModelProductId: "No",
    nonDisplayAttributes: "Yes",
    optionsList: "No",
    productId: "No",
    productName: "Yes",
    productType: "No",
    publishedDt: "No",
    status: "No",
    subCategoryId: "No",
    subCategory: "No",
    tags: "No",
    title: "Yes",
    uitemplate: "Yes",
  });
  useEffect(() => {
    languageConfiguration
      .getProductlanguageConfigurationDetails()
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };
  const handleSave = () => {
    if (form.id) {
      languageConfiguration
        .updateProductLanguageConfig(form.id, form)
        .then((res) => {
          toast?.current?.show({
            severity: "success",
            summary: res.data,
          });
        });
    } else {
      languageConfiguration
        .addProductlanguageConfiguration(form)
        .then((res) => {
          toast?.current?.show({
            severity: "success",
            summary: res.data,
          });
        });
    }
  };
  const handleReset = () => {
    const obj = {};
    basicLanguageSetup.map((ele) => {
      obj[ele.key] = ele.default;
      return 1;
    });
    setForm(obj);
  };
  return (
    <>
      <Toast ref={toast} />
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {loading ? (
        <Loading />
      ) : (
        <div className="p-grid">
          {basicLanguageSetup.map((attribute) => (
            <div key={attribute.key} className="p-col-12 p-md-6 p-xl-4 p-p-1">
              <div className="p-grid p-ai-center p-py-0">
                <div className="p-col-6 p-py-0">
                  <div className="p-grid p-ai-center p-jc-between">
                    <label htmlFor={attribute.key}>{attribute.label}</label>
                    <span>:</span>
                  </div>
                </div>
                <div className="p-col-6 p-py-0">
                  <SelectButton
                    className="p-py-1"
                    disabled={!attribute.editable}
                    value={form[attribute.key]}
                    id={attribute.key}
                    name={attribute.key}
                    options={options}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="p-col-12 p-pb-0">
            <div>
              <small className="p-error p-invalid">
                No : English Only
                <br /> Yes : Allow Multiple Language
              </small>
            </div>
            <div className="p-d-flex p-jc-between">
              <Button
                onClick={() => handleReset()}
                className="p-button-help p-py-1"
                label="Reset"
                icon="fa fa-refresh"
              />
              <Button
                onClick={() => handleSave()}
                className="p-button-success p-py-1"
                label="Save"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Configuration;
