import React, { useEffect, useRef, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Editor } from "primereact/editor";
import { Dropdown } from "primereact/dropdown";
import { ListBox } from "primereact/listbox";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Chips } from "primereact/chips";

import IngestionService from "../../Service/IngestionService";
import { useHistory } from "react-router-dom";

const statusValues = ["Created", "Review", "Published", "Inactive"];
const initialErrors = {
  upc: "",
  title: "",
  description: "",
  isbn: "",
  mpn: "",
  ean: "",
  bulletPoints: "",
  dskucount: 0,
  selectedCombination: "",
  type: "",
  isFmcg: true,
  badge: "",
};
const AddDvnIngestion = ({
  compare = false,
  readOnly = false,
  productId = null,
  product = null,
  dvn = null,
  edit = false,
  lang = "en",
}) => {
  const [errors, setErrors] = useState(initialErrors);
  const [form, setForm] = useState({
    keys: [],
    values: [],
    productId: productId,
    upc: "",
    title: "",
    isbn: "",
    mpn: "",
    ean: "",
    bulletPoints: "",
    canAddToCart: false,
    combination: null,
    isDefaultValue: false,
    description: "",
    dskucount: 0,
    isFmcg: false,
    badge: "",
    status: statusValues[0],
    images: [],
    selectedCombination: [],
    type: "",
    webId: "1233",
    tags: [],
  });
  const [displayAttributes, setDisplayAttributes] = useState([]);
  const [nonDisplayAttributes, setNonDisplayAttributes] = useState([]);
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
  const ingestionService = new IngestionService();

  useEffect(() => {
    if (edit) {
      setForm({ ...form, ...dvn });
      setDisplayAttributes(dvn.displayAttributes);
      setNonDisplayAttributes(dvn.nonDisplayAttributes);
    } else {
      if (product?.productType?.toLowerCase() === "regular") {
        getDVNAttributes();
      } else {
        featchCombinationData();
        getDVNAttributes();
      }
    }
  }, [edit, dvn]); // eslint-disable-line react-hooks/exhaustive-deps

  const onStatusHandler = (e) => {
    setForm((prevState) => ({ ...prevState, status: e.value }));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };
  const validateAndCreateBody = () => {
    const {
      title,
      description,
      ean,
      tags,
      bulletPoints,
      mpn,
      upc,
      badge,
      isFmcg,
      isbn,
      type,
      webId,
      status,
      isDefaultValue,
    } = form;
    function validate(data) {
      let errors = {};

      if (!data.title) {
        errors.title = "Name is required.";
      }
      if (!data.description) {
        errors.description = "Description is required.";
      }
      if (!data.ean) {
        errors.ean = "EAN is required.";
      }
      if (!data.tags || data.tags.length < 1) {
        errors.tags = "Tags is required.";
      }
      if (!data.bulletPoints) {
        errors.bulletPoints = "Bullet Points is required.";
      }
      if (!data.mpn) {
        errors.mpn = "MPN is required.";
      }
      if (!data.upc) {
        errors.upc = "UPC is required.";
      }

      if (!data.badge) {
        errors.badge = "Badge is required.";
      }
      if (!data.isbn) {
        errors.isbn = "ISBN is required.";
      }
      if (!data.type) {
        errors.uitemplate = "Type is required.";
      }

      setErrors((prevstate) => ({ ...prevstate, ...errors }));
      return Object.keys(errors).length;
    }
    if (validate(form)) {
      toast?.current?.show({
        severity: "warn",
        summary: "Enter all mandatory fields",
      });
      return null;
    }

    let body = {
      bulletPoints,
      mpn,
      upc,
      productId,
      isDefaultValue,
      isbn,
      title,
      description,
      ean,
      nonDisplayAttributes: nonDisplayAttributes,
      displayAttributes: displayAttributes,
      tags,
      isFmcg,
      badge,
      combination: form.selectedCombination,
      type,
      status,
      webId: parseInt(webId),
      images: form.images || [],
    };

    return body;
  };
  const history = useHistory();
  const handleSave = () => {
    const body = validateAndCreateBody();
    if (!body) return;

    ingestionService
      .addDVNProductIngestion(body)
      .then((response) => {
        toast?.current?.show({
          severity: "success",
          summary: response.data,
        });
        setTimeout(() => {
          history.push("/ingestion/dvnIngestion");
        }, 2000);
      })
      .catch((error) => {
        toast?.current?.show({
          severity: "error",
          summary: "Error Message",
          detail: error?.response?.data?.message,
        });
      });
  };
  const handleUpdate = () => {
    const body = validateAndCreateBody();
    if (!body) return;

    const data = { ...dvn, ...body };

    if (lang === "en") {
      ingestionService
        .updateDVNConfiguration(data.dvnid, data)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: response.data,
            life: 3000,
          });
        })
        .catch((error) => {
          console.log(error.response);
          toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: error.response?.data?.message,
            life: 3000,
          });
        });
    } else {
      ingestionService
        .updateDvnDetailsById(data.dvnid, lang, data)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: response.data,
            life: 3000,
          });
        })
        .catch((error) => {
          console.log(error.response);
          toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: error.response?.data?.message,
            life: 3000,
          });
        });
    }
  };

  const onCombinationSelect = (e) => {
    let d = [...form.selectedCombination];
    d.push(e.value);
    setForm((prevState) => ({ ...prevState, selectedCombination: d }));
  };
  const featchCombinationData = () => {
    ingestionService.getCombinationDetails(productId).then((response) => {
      let v = Object.values(response.data);
      let k = Object.keys(response.data);
      setForm((prevState) => ({ ...prevState, keys: k, values: v }));
    });
  };
  const customChip = (item) => {
    return (
      <div>
        <span>{item}</span>
      </div>
    );
  };
  const getDVNAttributes = () => {
    let displayAttributes = [];
    let nonAttributes = [];

    ingestionService
      .getSearchAttributesForProductIngestion(productId)
      .then((response) => {
        console.log(response);
        response.data.productDisplayAttributes.map((keys, id) => {
          let obj = {
            key: "",
            displayName: "",
          };
          obj.key = keys.key;
          obj.displayName = keys.displayName;
          obj.value = "";

          displayAttributes.push(obj);
          return 1;
        });
        response.data.productNonDisplayAttributes.map((keys, id) => {
          let obj = {
            key: "",
            displayName: "",
          };
          obj.key = keys.key;
          obj.displayName = keys.displayName;
          obj.value = "";

          nonAttributes.push(obj);
          return 1;
        });
        setForm((prevState) => ({
          ...prevState,
          displayAttributes: displayAttributes,
          nonAttributes: nonAttributes,
        }));
        setDisplayAttributes(displayAttributes);
        setNonDisplayAttributes(nonAttributes);
        toast?.current?.show({
          severity: "success",
          summary: "Dvn Attributes Retrived ",
        });
      })
      .catch((error) => {
        console.log(error);
        toast?.current?.show({
          severity: "error",
          summary: "Error Message",
          // detail: error === undefined ? "No data " : error.response.data.message,
        });
      });
  };

  const isFormFieldValid = (name) => !form[name];

  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error p-invalid">{errors[name]}</small>
      )
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
  const handleTagsChange = (e) => {
    if (e.value.length > 0)
      setErrors((prevstate) => ({ ...prevstate, tags: "" }));
    setForm((prevstate) => ({ ...prevstate, tags: e.value }));
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
  const toast = useRef(null);
  return (
    <div>
      <Toast ref={toast} />

      <div className="p-grid">
        <div className={`p-col-12 p-md-${compare ? "12" : "6"}`}>
          <div className="p-field">
            <label>Product Id</label>
            <div className="p-inputgroup">
              <InputText
                autoComplete="off"
                value={form.productId}
                onChange={onChangeHandler}
                disabled
                name="productId"
              />
            </div>
          </div>
          <div className="p-field">
            <div className="p-d-flex p-ai-center">
              <label htmlFor="varient">Use default values </label>

              <div className="p-mx-4">
                {[true, false].map((bool) => (
                  <div
                    key={bool}
                    className="p-field-radiobutton p-d-inline p-mx-2"
                  >
                    <RadioButton
                      inputId={bool}
                      name="isDefaultValue"
                      value={bool}
                      onChange={(e) =>
                        setForm((prevState) => ({
                          ...prevState,
                          isDefaultValue: e.value,
                        }))
                      }
                      disabled={readOnly}
                      checked={form.isDefaultValue === bool}
                    />
                    <label className="p-text-capitalize" htmlFor={bool}>
                      {bool.toString()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-field">
            <label>UPC</label>
            <div className="p-inputgroup">
              <InputText
                autoComplete="off"
                value={form.upc}
                onChange={onChangeHandler}
                name="upc"
              />
            </div>
          </div>
          <div className="p-field">
            <label>ISBN</label>
            <div className="p-inputgroup">
              <InputText
                autoComplete="off"
                name="isbn"
                value={form.isbn}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="p-field">
            <label>EAN</label>
            <div className="p-inputgroup">
              <InputText
                autoComplete="off"
                name="ean"
                value={form.ean}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="p-field">
            <label>Type</label>
            <div className="p-inputgroup">
              <InputText
                autoComplete="off"
                name="type"
                value={form.type}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="p-field">
            <label>MPN</label>
            <div className="p-inputgroup">
              <InputText
                autoComplete="off"
                name="mpn"
                value={form.mpn}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="p-field">
            <div className="p-d-flex p-ai-center">
              <label htmlFor="varient">FMCG</label>

              <div className="p-mx-4">
                {[true, false].map((bool) => (
                  <div
                    key={bool}
                    className="p-field-radiobutton p-d-inline p-mx-2"
                  >
                    <RadioButton
                      inputId={"isFmcg" + bool}
                      name="isFmcg"
                      value={bool}
                      onChange={(e) =>
                        setForm((prevState) => ({
                          ...prevState,
                          isFmcg: e.value,
                        }))
                      }
                      disabled={readOnly}
                      checked={form.isDefaultValue === bool}
                    />
                    <label
                      className="p-text-capitalize"
                      htmlFor={"isFmcg" + bool}
                    >
                      {bool.toString()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {product?.productType?.toLowerCase() !== "regular" && (
            <div className="p-field">
              <label>Combination</label>
              <div>
                {form.keys.map((key, index) => {
                  return (
                    <div className="p-grid">
                      <div className="p-col-2">
                        <label className=" p-pt-2 p-jc-center">
                          <b className="p-mt-4">{key}</b>
                        </label>
                      </div>
                      <div className="p-col-1">:</div>
                      <div className="p-col-7">
                        <Dropdown
                          options={form.values[index]}
                          value={form.selectedCombination[index]}
                          onChange={onCombinationSelect}
                          placeholder="Select a value"
                          className="p-pl-4"
                          style={{ width: "200px" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="p-field">
            <label htmlFor="tags">Tags</label>

            <div className="p-inputgroup">
              <Chips
                id="tags"
                value={form.tags}
                itemTemplate={customChip}
                allowDuplicate={false}
                disabled={readOnly}
                onChange={(e) => handleTagsChange(e)}
                className="p-inputgroup"
              />
            </div>
          </div>

          <div className="p-field">
            <label>Badge</label>
            <div className="p-inputgroup">
              <InputText
                autoComplete="off"
                name="badge"
                value={form.badge}
                disabled={readOnly}
                onChange={onChangeHandler}
              />
            </div>
            {errors && getFormErrorMessage("badge")}
          </div>
        </div>

        <div className={`p-col-12 p-md-${compare ? "12" : "6"}`}>
          <div className="p-field">
            <label>Title</label>
            <div className="p-inputgroup">
              <Editor
                className="keyboardInput"
                name="title"
                value={form.title}
                style={{ height: "80px" }}
                disabled={readOnly}
                onTextChange={(e) => {
                  setForm((prevState) => ({
                    ...prevState,
                    title: e.htmlValue,
                  }));
                }}
              />
            </div>
            {errors && getFormErrorMessage("title")}
          </div>

          <div className="p-field">
            <label>Description</label>

            <div className="p-inputgroup">
              <Editor
                className="keyboardInput"
                name="description"
                value={form.description}
                style={{ height: "225px" }}
                disabled={readOnly}
                onTextChange={(e) => {
                  setForm((prevState) => ({
                    ...prevState,
                    description: e.htmlValue,
                  }));
                }}
              />
            </div>

            {errors && getFormErrorMessage("description")}
          </div>
          <div className="p-field">
            <label>Bullet Points</label>

            <div className="p-inputgroup">
              <Editor
                className="keyboardInput"
                name="bulletPoints"
                value={form.bulletPoints}
                style={{ height: "225px" }}
                disabled={readOnly}
                onTextChange={(e) => {
                  setForm((prevState) => ({
                    ...prevState,
                    bulletPoints: e.htmlValue,
                  }));
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
                onChange={onStatusHandler}
                disabled={readOnly}
                placeholder="Select a Status"
              />
            </div>

            {errors && getFormErrorMessage("status")}
          </div>
        </div>
      </div>

      {displayAttributes?.length > 0 || nonDisplayAttributes?.length > 0
        ? attributeTemplate
        : null}

      {!readOnly && (
        <div className="p-grid">
          <div className="p-col-12 p-pb-0">
            <div className="p-d-flex p-jc-end">
              {/* <Button
                // onClick={() => handleReset()}
                className="p-button-help p-py-1"
                label="Reset"
                icon="fa fa-refresh"
              /> */}
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
    </div>
  );
};

export default AddDvnIngestion;
