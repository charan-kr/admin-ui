import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { ListBox } from "primereact/listbox";
import { Chip } from "primereact/chip";
import { ScrollPanel } from "primereact/scrollpanel";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";

import IngestionConfigurationService from "../../Service/IngestionConfigurationService";

const Attributes = ({ state }) => {
  const { productAttributeKeysId } = state;
  const [selecetedDisplayAttributes, setSelectedDisplayAttribute] = useState(
    []
  );
  const [
    selecetedNonDisplayAttributes,
    setSelectedNonDisplayAttribute,
  ] = useState([]);
  const ingestionService = new IngestionConfigurationService();
  const toast = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (productAttributeKeysId) {
      setSelectedDisplayAttribute(state.displayTarget);
      setSelectedNonDisplayAttribute(state.nonDisplayTarget);
    }
  }, [productAttributeKeysId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDvnAttributeConfiguration = () => {
    const { parentProductAttributeKeysId } = state;

    if (state.productAttributeKeysId) {
      let finalJson = {
        model: null,
        manufacturer: null,
        type: state.selectedType,
        subCategory: state.selectedSubCategory.subCategoryName,
        subCategoryId: state.selectedSubCategory.subCategoryId,
        categoryId: state.selectedCategory.categoryId,
        category: state.selectedCategory.categoryName,
        productDisplayAttributes: selecetedDisplayAttributes,
        productNonDisplayAttributes: selecetedNonDisplayAttributes,
      };

      ingestionService
        .updateProductConfiguration(state.productAttributeKeysId, finalJson)
        .then((response) => {
          toast?.current?.show({
            severity: "success",
            summary: response.data,
            life: 2000,
          });

          setTimeout(() => {
            history.push("/ingestion/ingestionConfig");
          }, 2000);
        })
        .catch((error) => {
          toast?.current?.show({
            severity: "error",
            summary: "Error Message",
            detail: error.response?.data?.message,
            life: 3000,
          });
        });
      return;
    }

    let finalJson = {
      model: null,
      manufacturer: null,
      type: state.selectedType,
      subCategoryId: parentProductAttributeKeysId.subCategoryId,
      categoryId: parentProductAttributeKeysId.categoryId,
      category: parentProductAttributeKeysId.category,
      subCategory: parentProductAttributeKeysId.subCategory,
      productDisplayAttributes: selecetedDisplayAttributes,
      productNonDisplayAttributes: selecetedNonDisplayAttributes,
      parentProductAttributeKeysId:
        parentProductAttributeKeysId.productAttributeKeysId,
    };

    ingestionService.addIngestionConfiguration(finalJson).then((response) => {
      toast?.current?.show({
        severity: "success",
        summary: response.data,
        life: 2000,
      });

      setTimeout(() => {
        history.push("/ingestion/ingestionConfig");
      }, 2000);
    });
  };

  const handleProductAttributeConfiguration = () => {
    let finalJson = {
      model: state.brand,
      manufacturer: state.manufacturer,
      type: state.selectedType,
      subCategory: state.selectedSubCategory.subCategoryName,
      subCategoryId: state.selectedSubCategory.subCategoryId,
      categoryId: state.selectedCategory.categoryId,
      category: state.selectedCategory.categoryName,
      productDisplayAttributes: selecetedDisplayAttributes,
      productNonDisplayAttributes: selecetedNonDisplayAttributes,
    };
    if (state.productAttributeKeysId) {
      finalJson.productAttributeKeysId = state.productAttributeKeysId;
      ingestionService
        .updateProductConfiguration(state.productAttributeKeysId, finalJson)
        .then((response) => {
          toast?.current?.show({
            severity: "success",
            summary: response.data,
            life: 1000,
          });

          setTimeout(() => {
            history.push("/ingestion/ingestionConfig");
          }, 2000);
        })
        .catch((error) => {
          toast?.current?.show({
            severity: "error",
            summary: "Error Message",
            detail: error?.response?.data?.message,
            life: 3000,
          });
        });
    } else {
      ingestionService
        .addIngestionConfiguration(finalJson)
        .then((response) => {
          toast?.current?.show({
            severity: "success",
            summary: response.data,
            life: 1000,
          });

          setTimeout(() => {
            history.push("/ingestion/ingestionConfig");
          }, 2000);
        })
        .catch((error) => {
          toast?.current?.show({
            severity: "error",
            summary: "Error Message",
            detail: error?.response?.data?.message,
            life: 3000,
          });
        });
    }
  };
  const onSubmitHandler = () => {
    if (state.parentProductAttributeKeysId) {
      handleDvnAttributeConfiguration();
    } else {
      handleProductAttributeConfiguration();
    }
  };
  const nonDisplaychipTemplate = (attribute) => {
    function removeAttribute() {
      setSelectedNonDisplayAttribute(
        selecetedNonDisplayAttributes.filter(
          (ele) => ele.attributeId !== attribute.attributeId
        )
      );
    }
    return (
      <span style={{ position: "relative" }}>
        <Chip label={attribute.displayName} className="p-pr-5 p-m-1" />
        <i
          style={{
            position: "absolute",
            fontSize: "1.25rem",
            right: "10px",
            top: "2px",
            cursor: "pointer",
            color: "#444",
          }}
          className="fa fa-times-circle "
          aria-hidden="true"
          onClick={removeAttribute}
        ></i>
      </span>
    );
  };
  const displaychipTemplate = (attribute) => {
    function removeAttribute() {
      setSelectedDisplayAttribute(
        selecetedDisplayAttributes.filter(
          (ele) => ele.attributeId !== attribute.attributeId
        )
      );
    }
    return (
      <span style={{ position: "relative" }}>
        <Chip label={attribute.displayName} className="p-pr-5 p-m-1" />
        <i
          style={{
            position: "absolute",
            fontSize: "1.25rem",
            right: "10px",
            top: "2px",
            cursor: "pointer",
            color: "#444",
          }}
          className="fa fa-times-circle "
          aria-hidden="true"
          onClick={removeAttribute}
        ></i>
      </span>
    );
  };
  const attributeDisplayTemplate = (option) => {
    let ag = false;
    if (option.groupName) {
      ag = option.attributeList.every((v) =>
        selecetedDisplayAttributes.includes(v)
      );
    }
    return (
      <div>
        {!option.groupName ? (
          <span>{option.displayName}</span>
        ) : (
          <div className="p-d-flex p-ai-center p-jc-between">
            <span>{option.displayName}</span>
            <div>
              <Badge
                severity={ag ? "info" : "warning"}
                value={<small>AG</small>}
              />
            </div>
          </div>
        )}
      </div>
    );
  };
  const handleSelectionChange = (e) => {
    const selectedOption = e.value[e.value.length - 1]?.attributeList;
    if (selectedOption) {
      const ag = selectedOption.every((v) =>
        selecetedDisplayAttributes.includes(v)
      );

      if (ag) {
        setSelectedDisplayAttribute(
          selecetedDisplayAttributes.filter(
            (el) => !selectedOption.includes(el)
          )
        );
      } else {
        const set = new Set([...selecetedDisplayAttributes, ...selectedOption]);
        setSelectedDisplayAttribute(Array.from(set));
      }
      return;
    }
    setSelectedDisplayAttribute(e.value);
  };
  const attributeNonDisplayTemplate = (option) => {
    let ag = false;
    if (option.groupName) {
      ag = option.attributeList.every((v) =>
        selecetedNonDisplayAttributes.includes(v)
      );
    }
    return (
      <div className="p-m-0">
        {!option.groupName ? (
          <span>{option.displayName}</span>
        ) : (
          <div className="p-d-flex p-ai-center p-jc-between">
            <span>{option.displayName}</span>
            <div>
              <Badge
                severity={ag ? "info" : "warning"}
                value={<small>AG</small>}
              />
            </div>
          </div>
        )}
      </div>
    );
  };
  const handleNonSelectionChange = (e) => {
    const selectedOption = e.value[e.value.length - 1]?.attributeList;
    if (selectedOption) {
      const ag = selectedOption.every((v) =>
        selecetedNonDisplayAttributes.includes(v)
      );

      if (ag) {
        setSelectedNonDisplayAttribute(
          selecetedNonDisplayAttributes.filter(
            (el) => !selectedOption.includes(el)
          )
        );
      } else {
        const set = new Set([
          ...selecetedNonDisplayAttributes,
          ...selectedOption,
        ]);
        setSelectedNonDisplayAttribute(Array.from(set));
      }
      return;
    }
    setSelectedNonDisplayAttribute(e.value);
  };
  return (
    <>
      <Toast ref={toast} />
      <div className="p-grid">
        <div className={`p-col-12 p-md-6`}>
          <fieldset>
            <legend>Display Attributes</legend>
            <div className="p-grid">
              <div className="p-col-5">
                <div className="p-inputgroup">
                  <ListBox
                    value={selecetedDisplayAttributes}
                    options={[...state.displaySource, ...state.attributeGroups]}
                    onChange={(e) => {
                      handleSelectionChange(e);
                    }}
                    multiple
                    itemTemplate={attributeDisplayTemplate}
                    optionLabel="displayName"
                    filter
                    listStyle={{ height: "200px" }}
                  />
                </div>
              </div>
              <div className="p-col">
                <ScrollPanel
                  style={{
                    width: "100%",
                    height: "260px",
                  }}
                >
                  {selecetedDisplayAttributes.map((attribute) => (
                    <span>{displaychipTemplate(attribute)}</span>
                  ))}
                </ScrollPanel>
              </div>
            </div>
          </fieldset>
        </div>
        <div className={`p-col-12 p-md-6`}>
          <fieldset>
            <legend>Non Display Attributes</legend>
            <div className="p-grid">
              <div className="p-col-5">
                <div className="p-inputgroup">
                  <ListBox
                    value={selecetedNonDisplayAttributes}
                    options={[
                      ...state.nonDisplaySource,
                      ...state.attributeGroups,
                    ]}
                    onChange={handleNonSelectionChange}
                    multiple
                    itemTemplate={attributeNonDisplayTemplate}
                    optionLabel="displayName"
                    filter
                    listStyle={{ height: "200px" }}
                  />
                </div>
              </div>
              <div className="p-col">
                <ScrollPanel style={{ width: "100%", height: "260px" }}>
                  {selecetedNonDisplayAttributes.map((attribute) => (
                    <span>{nonDisplaychipTemplate(attribute)}</span>
                  ))}
                </ScrollPanel>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div>
        <Button
          className="p-py-1 p-px-3 p-button-success"
          label="Save"
          onClick={onSubmitHandler}
        />
      </div>
    </>
  );
};

export default Attributes;
