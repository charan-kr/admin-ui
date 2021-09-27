import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { Chips } from "primereact/chips";
import { ListBox } from "primereact/listbox";
import { InputTextarea } from "primereact/inputtextarea";
import VarientCard from "./VarientCard";
import { Dialog } from "primereact/dialog";
import classNames from "classnames";
import { AutoComplete } from "primereact/autocomplete";

import IngestionPoolService from "../../Service/IngestionPoolService";
import IngestionService from "../../Service/IngestionConfigurationService";
import ProductIngestionService from "../../Service/ProductIngestionService";
import CategoryService from "../../Service/categoryService";
import SubcategoryService from "../../Service/subcategoryService";
import UITemplateService from "../../Service/UiTemplateService";

const varientObject = { name: "", key: "", position: 1, values: [] };
const statusValues = ["Created", "Review", "Published", "Inactive"];
const initialForm = {
  brand: "",
  selectedCategory: null,
  manufacturer: "",
  manufacturerProductDescription: "",
  model: "",
  selectedSubCategory: null,
  tags: [],
  title: null,
  uitemplate: null,
  productType: null,
  productName: null,
  status: statusValues[0],
  newerModel: null,
  newerModelExist: true,
  newerModelProductId: null,
};
const initialErrors = {
  manufacturer: "",
  manufacturerProductDescription: "",
  model: "",
  brand: "",
  selectedCategory: "",
  selectedSubCategory: "",
  tags: "",
  title: "",
  uitemplate: "",
  productName: "",
  // Extra field
  newerModel: "",
  newerModelExist: "",
  newerModelProductId: "",
};

const AddProductConfiguration = ({
  product,
  compare = false,
  readOnly = false,
  lang = "en",
  edit = false,
}) => {
  const [form, setForm] = useState(initialForm);
  const [displayAttributes, setDisplayAttributes] = useState([]);
  const [nonDisplayAttributes, setNonDisplayAttributes] = useState([]);
  const [optionList, setOptionList] = useState(null);
  const [errors, setErrors] = useState(initialErrors);

  const [selectedVarient, setSelectedVarient] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const [varient, setVarient] = useState("no");
  const [
    selectedDisplayAttributeKey,
    setSelectedDisplayAttributeKey,
  ] = useState(null);
  const [
    selectedNonDisplayAttributeKey,
    setSelectedNonDisplayAttributeKey,
  ] = useState(null);

  const [
    selectedNonDisplayAttribute,
    setSelectedNonDisplayAttribute,
  ] = useState(null);
  const [selectedDisplayAttribute, setSelectedDisplayAttribute] = useState(
    null
  );
  const [models, setModels] = useState([]);
  const toast = useRef(null);
  const ingestionService = new IngestionService();
  const categoryService = new CategoryService();
  const subcategoryService = new SubcategoryService();
  const productIngestionService = new ProductIngestionService();

  useEffect(() => {
    if (edit) {
      setForm(product);
      setNonDisplayAttributes(product.nonDisplayAttributes);
      setDisplayAttributes(product.displayAttributes);
      setVarient(product.varient);
      setOptionList(product.optionsList);
    } else {
      fetchData();
    }
  }, [edit]); // eslint-disable-line react-hooks/exhaustive-deps

  const [uITemplates, setUITemplates] = useState([]);
  useEffect(() => {
    const uITemplateService = new UITemplateService();
    uITemplateService
      .getAllUITemplate()
      .then((res) => setUITemplates(res.data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (value && errors[name]) {
      setErrors((prevstate) => ({ ...prevstate, [name]: "" }));
    } else if (!value) {
      setErrors((prevstate) => ({
        ...prevstate,
        [name]: "required field",
      }));
    }
    setForm((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));

    if (name === "selectedCategory") {
      subcategoryService
        .getAllsubCategoriesByCategoryId(value.categoryId)
        .then((res) => {
          setForm((prevstate) => ({
            ...prevstate,
            subCategory: res.data,
          }));
        });
    }
    if (name === "model") attributesController(value);
  };

  const [manufacturers, setManufacturers] = useState([]);
  useEffect(() => {
    if (form.selectedSubCategory) {
      ingestionService
        .getManufacturerBySubCategory(form.selectedSubCategory?.subCategoryName)
        .then((res) => {
          setManufacturers(res.data);
        });
    }
  }, [form.selectedSubCategory]); // eslint-disable-line

  useEffect(() => {
    if (form?.manufacturer) {
      ingestionService
        .getModelsByManufacturer(form.manufacturer)
        .then((res) => {
          setModels(res.data);
        });
    }
  }, [form?.manufacturer]); // eslint-disable-line

  const handleDescriptionChange = (name, e) => {
    if (e.htmlValue && errors[name]) {
      setErrors((prevstate) => ({ ...prevstate, [name]: "" }));
    } else if (!e.htmlValue) {
      setErrors((prevstate) => ({
        ...prevstate,
        [name]: "required field",
      }));
    }
    try {
      setForm((prevstate) => ({
        ...prevstate,
        [name]: e.htmlValue,
      }));
    } catch (error) {}
  };

  const validateAndCreateBody = () => {
    const {
      selectedCategory,
      selectedSubCategory,
      productName,
      manufacturer,
      model,
      brand,
      uitemplate,
      title,
      description,
      tags,
      status,
      manufacturerProductDescription,
    } = form;
    function validate(data) {
      let errors = {};

      if (!data.title) {
        errors.title = "Name is required.";
      }
      if (!data.description) {
        errors.description = "Description is required.";
      }
      if (!data.productName) {
        errors.productName = "Product Name is required.";
      }
      if (!data.manufacturer) {
        errors.manufacturer = "Manufacturer is required.";
      }
      if (!data.selectedCategory) {
        errors.selectedCategory = "Category is required.";
      }
      if (!data.selectedSubCategory) {
        errors.selectedSubCategory = "Sub Category is required.";
      }
      if (!data.model) {
        errors.model = "Model is required.";
      }
      if (!data.brand) {
        errors.brand = "Brand is required.";
      }
      if (!data.uitemplate) {
        errors.uitemplate = "UI template is required.";
      }
      if (!data.status) {
        errors.status = "Status is required.";
      }

      setErrors((prevstate) => ({ ...prevstate, ...errors }));
      return Object.keys(errors).length;
    }
    if (validate(form)) {
      toast.current.show({
        severity: "warn",
        summary: "Enter all mandatory fields",
      });
      return null;
    }

    const body = {
      categoryId: selectedCategory.categoryId,
      subCategoryId: selectedSubCategory.subCategoryId,
      category: selectedCategory.categoryName,
      subCategory: selectedSubCategory.subCategoryName,
      productName,
      manufacturer,
      model,
      brand,
      productType: varient === "yes" ? "Varient" : "Regular",
      uitemplate,
      title,
      description,
      tags,
      displayAttributes,
      nonDisplayAttributes,
      optionsList: optionList,
      status,
      manufacturerProductDescription: btoa(
        unescape(encodeURIComponent(manufacturerProductDescription))
      ),
    };
    return body;
  };

  const isFormFieldValid = (name) => !form[name];

  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error p-invalid">{errors[name]}</small>
      )
    );
  };
  const handleSave = () => {
    const body = validateAndCreateBody();
    if (!body) return;
    productIngestionService.addProductIngestion(body).then((response) => {
      toast.current.show({
        severity: "success",
        summary: response.data,
        life: 3000,
      });
      setShowMessage(true);
    });
  };

  const handleUpdate = () => {
    const body = validateAndCreateBody();
    if (!body) return;
    const data = { ...product, ...body };
    if (lang === "en") {
      productIngestionService
        .updateProductIngestionConfiguration(form.productId, data)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: response.data,
            life: 3000,
          });
        });
    } else {
      productIngestionService
        .updateProductDetailsById(form.productId, lang, {
          ...product,
          ...body,
        })
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: response.data,
            life: 3000,
          });
        });
    }
  };
  const attributesController = (value) => {
    let displayAttributes = [];
    let nonAttributes = [];

    ingestionService
      .getAttributesByModelAndManufacturer(
        form.selectedCategory.categoryId,
        form.manufacturer,
        value,
        form.selectedSubCategory.subCategoryId
      )
      .then((response) => {
        response.data.productDisplayAttributes.map((keys) => {
          let obj = {
            key: "",
            displayName: "",
            value: "",
          };
          obj.key = keys.key;
          obj.displayName = keys.displayName;

          displayAttributes.push(obj);
          return 1;
        });
        response.data.productNonDisplayAttributes.map((keys, id) => {
          let obj = {
            key: "",
            displayName: "",
            value: "",
          };
          obj.key = keys.key;
          obj.displayName = keys.displayName;

          nonAttributes.push(obj);
          return 1;
        });
        //alert(JSON.stringify(response));
        setDisplayAttributes(displayAttributes);
        setNonDisplayAttributes(nonAttributes);
        setForm((prevstate) => ({
          ...prevstate,
          displayAttributes: displayAttributes,
          nonAttributes: nonAttributes,
        }));

        toast.current.show({
          severity: "info",
          summary: `Attribute fetched for combination\n${form.manufacturer} + ${form.brand} + ${form.model}`,
          life: 4000,
        });
      })
      .catch(() => {
        setForm((prevstate) => ({
          ...prevstate,
          manufacturer: "",
          model: "",
          brand: "",
        }));
      });
  };

  const fetchData = () => {
    categoryService.getAllActiveCategories().then((response) => {
      setForm((prevstate) => ({
        ...prevstate,
        category: response.data,
      }));
    });
  };

  const customChip = (item) => {
    return (
      <div>
        <span>{item}</span>
      </div>
    );
  };
  const handleNonDisplayAttributesValue = (e) => {
    const { value } = e.target;
    setSelectedNonDisplayAttribute((prevstate) => ({
      ...prevstate,
      value,
    }));
    setNonDisplayAttributes(
      nonDisplayAttributes.map((attribute) =>
        attribute.key === selectedNonDisplayAttribute.key
          ? { ...attribute, value }
          : attribute
      )
    );
  };
  const handleDisplayAttributesValue = (e) => {
    const { value } = e.target;
    setSelectedDisplayAttribute((prevstate) => ({
      ...prevstate,
      value,
    }));
    setDisplayAttributes(
      displayAttributes.map((attribute) =>
        attribute.key === selectedDisplayAttribute.key
          ? { ...attribute, value }
          : attribute
      )
    );
  };
  const [test] = useState(true);
  const handleVarientChange = (e) => {
    setVarient(e.value);
    if (e.value === "yes")
      test ? setVarientVisible(true) : setOptionList([varientObject]);
    else setOptionList(null);
  };
  const handleUpdateVarientKey = (obj, index) => {
    setOptionList(
      optionList.map((ele, i) =>
        i === index
          ? { ...ele, key: obj.key, name: obj.displayName, values: [] }
          : ele
      )
    );
  };
  const handleDeleteVarient = (varient) => {
    setOptionList(optionList.filter((ele) => ele.key !== varient.key));
  };
  const addVarientPair = (varient) => {
    const newPair = {
      [varient.key]: "",
      value: "",
    };
    const updateList = optionList.map((ele) =>
      ele.key === varient.key
        ? { ...ele, values: [...ele.values, newPair] }
        : ele
    );
    // console.log(updateList);
    setOptionList(updateList);
  };
  const handleValuesChange = (_varient, e, i) => {
    const { name, value } = e.target;
    const varient = optionList.find((ele) => ele.key === _varient.key);
    const updatedVarient = {
      ...varient,
      values: varient.values.map((ele, index) =>
        index === i ? { ...ele, [name]: value } : ele
      ),
    };
    setOptionList(
      optionList.map((ele) => (ele.key === _varient.key ? updatedVarient : ele))
    );
  };
  const addNewVarient = () => {
    if (test) {
      setSelectedVarient(null);
      setVarientVisible(true);
    } else {
      setOptionList([
        ...optionList,
        { ...varientObject, position: optionList.length + 1 },
      ]);
    }
  };
  const handleDeleteVarientPair = (varient, index) => {
    setOptionList(
      optionList.map((ele) =>
        ele.key === varient.key
          ? {
              ...ele,
              values: ele.values.filter((val, i) => i !== index),
            }
          : ele
      )
    );
  };
  const attributeDisplayTemplate = (option) => {
    return (
      <div className="p-d-flex p-ai-center p-jc-between">
        <div>{option.displayName}</div>
        {option.value && (
          <i style={{ color: "green" }} className="pi pi-check-circle" />
        )}
      </div>
    );
  };
  const handleKeyChange = (varient) => {
    setSelectedVarient(varient);
    setVarientVisible(true);
  };
  const attributeTemplate = (
    <div className="p-grid">
      <div className={`p-col-12 p-md-${compare ? "12" : "6"}`}>
        <fieldset>
          <legend>Display Attributes</legend>
          <div className="p-grid">
            <div className="p-col-5">
              <div className="p-inputgroup">
                <ListBox
                  value={selectedDisplayAttributeKey}
                  options={displayAttributes}
                  onChange={(e) => {
                    setSelectedDisplayAttributeKey(e.value);
                    setSelectedDisplayAttribute(
                      displayAttributes.find((ele) => ele.key === e.value)
                    );
                  }}
                  itemTemplate={attributeDisplayTemplate}
                  optionLabel="displayName"
                  optionValue="key"
                  filter
                  listStyle={{ height: "200px" }}
                />
              </div>
            </div>
            <div className="p-col p-my-auto">
              {selectedDisplayAttribute ? (
                <div className="p-field p-mb-0">
                  <label htmlFor="nonattribute-value">
                    Describe : {selectedDisplayAttribute.displayName}
                  </label>
                  <InputTextarea
                    disabled={readOnly}
                    id="nonattribute-value"
                    className="p-inputgroup"
                    value={selectedDisplayAttribute.value}
                    onChange={(e) => handleDisplayAttributesValue(e)}
                    rows={8}
                  />
                </div>
              ) : (
                <div
                  className="p-card p-shadow-6"
                  style={{ border: "1px solid #51719e" }}
                >
                  <div className="p-card-body p-text-center">
                    <p>
                      <i className="fa fa-info-circle p-mr-1"></i>
                      Choose an attribute to describe it
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </fieldset>
      </div>
      <div className={`p-col-12 p-md-${compare ? "12" : "6"}`}>
        <fieldset>
          <legend>Non Display Attributes</legend>
          <div className="p-grid">
            <div className="p-col-5">
              <div className="p-inputgroup">
                <ListBox
                  value={selectedNonDisplayAttributeKey}
                  options={nonDisplayAttributes}
                  onChange={(e) => {
                    setSelectedNonDisplayAttributeKey(e.value);
                    setSelectedNonDisplayAttribute(
                      nonDisplayAttributes.find((ele) => ele.key === e.value)
                    );
                  }}
                  filter
                  itemTemplate={attributeDisplayTemplate}
                  optionLabel="displayName"
                  optionValue="key"
                  listStyle={{ height: "200px" }}
                />
              </div>
            </div>
            <div className="p-col p-my-auto">
              {selectedNonDisplayAttribute ? (
                <div className="p-field p-mb-0">
                  <label htmlFor="nonattribute-value">
                    Describe : {selectedNonDisplayAttribute.key}
                  </label>
                  <InputTextarea
                    disabled={readOnly}
                    value={selectedNonDisplayAttribute.value}
                    onChange={(e) => handleNonDisplayAttributesValue(e)}
                    id="nonattribute-value"
                    className="p-inputgroup"
                    rows={8}
                  />
                </div>
              ) : (
                <div
                  className="p-card p-shadow-6"
                  style={{ border: "1px solid #51719e" }}
                >
                  <div className="p-card-body p-text-center">
                    <p>
                      <i className="fa fa-info-circle p-mr-1"></i>
                      Choose an attribute to describe it
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
  const history = useHistory();
  const dialogFooter = (
    <div className="p-d-flex p-jc-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => history.replace("/ingestion/productIngestion")}
      />
    </div>
  );
  const [varientVisible, setVarientVisible] = useState(false);

  return (
    <div>
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "green" }}
          ></i>
          <h2>Product Ingestion Successfull !!</h2>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Proceed further by selecting the added product from product
            ingestion configuration table to include multiple languages.
            <i className="fa fa-language p-mx-1" style={{ color: "blue" }}></i>
          </p>
        </div>
      </Dialog>
      <Toast ref={toast} />
      <div className="p-grid">
        <div className={`p-col-12 p-md-${compare ? "12" : "6"}`}>
          <div className="p-field">
            <label htmlFor="title">Title</label>
            <div className="p-inputgroup">
              <Editor
                className={classNames({
                  keyboardInput: true,
                  "p-disabled": false,
                })}
                name="title"
                id="title"
                value={form.title}
                style={{ height: "80px", maxWidth: "100%" }}
                disabled={readOnly}
                onTextChange={(e) => {
                  handleDescriptionChange("title", e);
                }}
              />
            </div>
            {errors && getFormErrorMessage("title")}
          </div>
          <div className="p-field">
            <label htmlFor="description">Description</label>

            <div className="p-inputgroup">
              <Editor
                className="keyboardInput"
                name="description"
                id="description"
                value={form.description}
                style={{ height: "250px" }}
                disabled={readOnly}
                onTextChange={(e) => {
                  handleDescriptionChange("description", e);
                }}
              />
            </div>

            {errors && getFormErrorMessage("description")}
          </div>

          <div className="p-field">
            <label htmlFor="manufacturerProductDescription">
              Manufacturer Product Description
            </label>

            <div className="p-inputgroup">
              <Editor
                className="keyboardInput"
                name="manufacturerProductDescription"
                id="manufacturerProductDescription"
                value={form.manufacturerProductDescription}
                style={{ height: "140px" }}
                disabled={readOnly}
                onTextChange={(e) => {
                  handleDescriptionChange("manufacturerProductDescription", e);
                }}
              />
            </div>

            {errors && getFormErrorMessage("description")}
          </div>
          <div className="p-field">
            <label htmlFor="status">Status</label>

            <div className="p-inputgroup">
              <Dropdown
                value={form.status}
                options={statusValues}
                className="p-jc-center"
                id="status"
                name="status"
                onChange={(e) => handleFormChange(e)}
                disabled={readOnly}
                placeholder="Select a Status"
              />
            </div>

            {errors && getFormErrorMessage("status")}
          </div>

          <div className="p-field">
            <label htmlFor="uitemplate">UI template Id</label>

            <div className="p-inputgroup">
              <Dropdown
                options={uITemplates}
                optionLabel="templateName"
                optionValue="templateId"
                name="uiTemplate"
                value={form.uiTemplate}
                onChange={(e) => handleFormChange(e)}
                placeholder="-- Choose Appropriate Web Template --"
                disabled={readOnly}
              />
            </div>

            {errors && getFormErrorMessage("manufacturer")}
          </div>
        </div>
        <div className={`p-col-12 p-md-${compare ? "12" : "6"}`}>
          <div className="p-field">
            <label htmlFor="selectedCategory">Category</label>
            <div className="p-inputgroup">
              <Dropdown
                className=" p-jc-center"
                value={form.selectedCategory}
                options={form.category}
                name="selectedCategory"
                id="selectedCategory"
                onChange={(e) => handleFormChange(e)}
                disabled={readOnly}
                optionLabel="categoryName"
                placeholder="Select a Category"
                filter
                filterBy="categoryName"
                required
              />
            </div>

            {errors && getFormErrorMessage("selectedCategory")}
          </div>
          <div className="p-field">
            <label htmlFor="description">Sub Category</label>

            <div className="p-inputgroup">
              <Dropdown
                className=" p-jc-center"
                value={form.selectedSubCategory}
                options={form.subCategory}
                name="selectedSubCategory"
                id="selectedSubCategory"
                onChange={(e) => handleFormChange(e)}
                placeholder="Select a subCategory"
                optionLabel="subCategoryName"
                disabled={!form.selectedCategory || readOnly}
                filter
                filterBy="subCategoryName"
              />
            </div>

            {errors && getFormErrorMessage("selectedSubCategory")}
          </div>
          <div className="p-field">
            <label htmlFor="manufacturer">Manufacturer</label>

            <div className="p-inputgroup">
              <Dropdown
                className="keyboardInput"
                options={manufacturers}
                autoComplete="off"
                id="manufacturer"
                placeholder="--Select Manufacturer"
                name="manufacturer"
                value={form.manufacturer}
                onChange={(e) => handleFormChange(e)}
                disabled={readOnly}
              />
            </div>

            {errors && getFormErrorMessage("manufacturer")}
          </div>
          <div className="p-field">
            <label htmlFor="productName">Product Name</label>

            <div className="p-inputgroup">
              <InputText
                className="keyboardInput p-inputgroup"
                autoComplete="off"
                name="productName"
                value={form.productName}
                onChange={(e) => handleFormChange(e)}
                disabled={readOnly}
              />
            </div>

            {errors && getFormErrorMessage("productName")}
          </div>
          <div className="p-field">
            <label htmlFor="brand">Brand</label>

            <div className="p-inputgroup">
              <InputText
                className="keyboardInput"
                autoComplete="off"
                name="brand"
                value={form.brand}
                onChange={(e) => handleFormChange(e)}
                disabled={readOnly}
              />
            </div>

            {errors && getFormErrorMessage("brand")}
          </div>
          <div className="p-field">
            <label htmlFor="model">Model</label>

            <div className="p-inputgroup">
              <Dropdown
                className="keyboardInput"
                autoComplete="off"
                name="model"
                value={form.model}
                options={models}
                placeholder="--Select Model --"
                onChange={(e) => handleFormChange(e)}
                disabled={
                  form.selectedCategory === null ||
                  form.selectedSubCategory === null ||
                  form.manufacturer === "" ||
                  readOnly
                }
              />
            </div>

            {errors && getFormErrorMessage("model")}
          </div>
          <div className="p-field">
            <label htmlFor="tags">Tags</label>

            <div className="p-inputgroup">
              <Chips
                id="tags"
                value={form.tags}
                itemTemplate={customChip}
                allowDuplicate={false}
                disabled={readOnly}
                separator=","
                onChange={(e) =>
                  setForm((prevstate) => ({
                    ...prevstate,
                    tags: e.value,
                  }))
                }
                className="p-inputgroup"
              />
            </div>
            <small className="p-error">Use comma "," to add multiple tag</small>
          </div>
        </div>
      </div>
      {displayAttributes?.length > 0 || nonDisplayAttributes?.length > 0
        ? attributeTemplate
        : null}
      <div className="p-grid">
        <div className={`p-col-12 p-md-${compare ? "12" : "6"}`}>
          <div className="p-d-flex p-ai-center">
            <label htmlFor="varient">Is it a variant product ? </label>

            <div className="p-mx-4">
              {["yes", "no"].map((bool) => (
                <div
                  key={bool}
                  className="p-field-radiobutton p-d-inline p-mx-2"
                >
                  <RadioButton
                    inputId={bool}
                    name="selectedVarient"
                    value={bool}
                    onChange={(e) => handleVarientChange(e)}
                    disabled={readOnly}
                    checked={varient === bool}
                  />
                  <label className="p-text-capitalize" htmlFor={bool}>
                    {bool}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div
          style={{ fontSize: "18px", color: "teal", cursor: "pointer" }}
          className={`p-col-12 p-text-right p-md-${compare ? "12" : "6"}`}
        >
          <i className="fa fa-list p-mx-2"></i>
          <i className="fa fa-th p-mx-2"></i>
        </div> */}
      </div>
      <div className="p-grid">
        {varient === "yes" && optionList ? (
          <>
            {optionList.map((varient, index) => (
              <div className={`p-col-12 p-md-${compare ? "12" : "4"}`}>
                <VarientCard
                  handleUpdateVarientKey={handleUpdateVarientKey}
                  varient={varient}
                  index={index}
                  handleDeleteVarient={handleDeleteVarient}
                  addVarientPair={addVarientPair}
                  handleValuesChange={handleValuesChange}
                  handleKeyChange={handleKeyChange}
                  handleDeleteVarientPair={handleDeleteVarientPair}
                />
              </div>
            ))}
            <div className={`p-col-12 p-md-${compare ? "12" : "4"}`}>
              <div className="p-card p-shadow-2">
                <div
                  onClick={() => addNewVarient()}
                  className="p-card-body p-text-center"
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa fa-plus-square-o fa-3x p-d-block" />
                  <small>Add New Varient</small>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {!readOnly && (
        <div className="p-grid">
          <div className="p-col-12 p-pb-0">
            <div className="p-d-flex p-jc-end">
              <Button
                onClick={() => {
                  edit ? handleUpdate() : handleSave();
                }}
                className="p-button-success p-py-1"
                label={edit ? "Update" : "Save"}
              />
            </div>
          </div>
        </div>
      )}
      <Dialog
        className="ingestion varient"
        header="Select Varient Key"
        focusOnShow={false}
        className="p-p-3"
        visible={varientVisible}
        onHide={() => setVarientVisible(false)}
      >
        <VarientKeySelector
          setVarientVisible={setVarientVisible}
          varient={selectedVarient}
          optionList={optionList || []}
          setOptionList={setOptionList}
        />
      </Dialog>
    </div>
  );
};

export default AddProductConfiguration;

const VarientKeySelector = ({
  varient,
  index,
  handleUpdateVarientKey,
  setVarientVisible,
  setOptionList,
  optionList,
}) => {
  const ingestionPoolService = new IngestionPoolService();

  const handleSelection = (value) => {
    const newKeyVarient = {
      ...varientObject,
      name: value.displayName,
      key: value.key,
      position: optionList.length + 1,
      values: [
        {
          [value.key]: "",
          value: "",
        },
      ],
    };
    if (varient) {
      setOptionList(
        optionList.map((ele) =>
          ele.key === varient.key
            ? { ...newKeyVarient, position: ele.position }
            : ele
        )
      );
    } else {
      setOptionList([...optionList, newKeyVarient]);
    }
    setVarientVisible(false);
  };
  const [selectedKey, setSelectedKey] = useState(null);
  const [filteredAttributes, setFilteredAttributes] = useState(null);

  useEffect(() => {
    if (varient?.key) {
      ingestionPoolService.getIngestionPoolDetails(varient.key).then((res) => {
        setSelectedKey(res.data[0]);
      });
    }
  }, [varient]); // eslint-disable-line react-hooks/exhaustive-deps

  const searchAttributes = (event) => {
    if (event.query.trim().length > 1) {
      setTimeout(() => {
        // let _filteredAttributes;
        ingestionPoolService
          .getIngestionPoolKeys(event.query)
          .then((res) => {
            setFilteredAttributes(
              res.data.filter(
                (ele) => !optionList.some((option) => option.key === ele.key)
              )
            );
          })
          .catch((error) => {
            // alert(error);
          });
      }, 250);
    } else {
      setFilteredAttributes([]);
    }
  };
  return (
    <>
      <div className="p-inputgroup" style={{ width: "250px" }}>
        <span className="p-inputgroup-addon">
          <i className="fa fa-key"></i>
        </span>
        <AutoComplete
          forceSelection
          value={selectedKey}
          suggestions={filteredAttributes}
          field="key"
          onSelect={(e) => handleSelection(e.value)}
          completeMethod={searchAttributes}
          onChange={(e) => setSelectedKey(e.value)}
          placeholder="Search For Key"
        />
      </div>
      {filteredAttributes?.length < 1 && (
        <small className="p-error p-invalid">No Attributes found</small>
      )}
    </>
  );
};
