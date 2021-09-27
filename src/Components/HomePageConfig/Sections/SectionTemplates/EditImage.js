import React, { useEffect, useState } from "react";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";

import { logo } from "../../../../utils/ImagePath";
import { HOME_PAGE_SECTION_TYPES } from "../../../../utils/constants";
import ProductSelector from "./ProductSelector";
const availableProduct = [
  {
    categoryKey: "puma",
    categoryValue: "Puma Men Shoes",
    link: "https://media.istockphoto.com/photos/internet-shopping-with-laptop-picture-id1215812761",
  },
  {
    categoryKey: "nike",
    categoryValue: "Nike Running Shoes",
    link: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG19/Furniture/MSO/WFH_758x608._SY608_CB430182042_.jpg",
  },
  {
    categoryKey: "woodland",
    categoryValue: "WoodLand",
    link: "https://images-eu.ssl-images-amazon.com/images/G/31/img20/Fashion/EVENT/WRS_Dec/GW/BTF/Mask_QC/PC/3._SY232_CB413645366_.jpg",
  },
  {
    categoryKey: "lunar",
    categoryValue: "Lunar walkmate",
    link: "https://m.media-amazon.com/images/I/412xwkkxTsL._AC_SY200_.jpg",
  },
  {
    categoryKey: "bata",
    categoryValue: "Bata Shoes",
    link: "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/SingleTitle/Coolie/launch/WP/3000x1200_Hero-Tall_WP._CB412534930_.jpg",
  },
];
function EditImage({ image, updateImage, setVisible, type }) {
  const { header, footer, url, item } = image;

  const [products] = useState(availableProduct);

  const [editUrl, setUrl] = useState(url);
  const [editHeader, setHeader] = useState(header);
  const [editFooter, setFooter] = useState(footer);
  const [editItem, setItem] = useState(item);
  const [manualUrl, setManualUrl] = useState(false);
  useEffect(() => {
    setUrl(url);
    setHeader(header);
    setFooter(footer);
    setItem(item);
  }, [image]); // eslint-disable-line react-hooks/exhaustive-deps
  const [selectedValue, setSelectedValue] = useState("");

  const handleClose = () => {
    const image_ = {
      ...image,
      footer: editFooter,
      header: editHeader,
      url: editUrl,
      item: editItem,
    };
    updateImage(image_);
    setVisible(false);
  };
  const handleHeaderChange = (event) => {
    const { name, value } = event.target;
    setHeader((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFooterChange = (event) => {
    const { name, value } = event.target;
    setFooter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSelectionValueChange = (value) => {
    setUrl(value?.link || "");
    setSelectedValue(value);
  };
  const handleItemSelection = (item) => {
    setUrl("");
    setItem(item);
  };
  const categoryOptionTemplate = (option) => {
    return (
      <div className="p-d-flex p-ai-center">
        <p className="p-m-0 p-text-capitalize">{option?.categoryValue}</p>
      </div>
    );
  };
  const selectedCategoryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="p-d-flex p-ai-center">
          <p className="p-m-0 p-text-capitalize">{option?.categoryValue}</p>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const editBodyTemplte = () => {
    return (
      <React.Fragment>
        <fieldset className="p-mt-2">
          <legend>Header</legend>

          <div className="p-grid p-pt-2 p-ai-center">
            <div className="p-col p-p-0">
              <div className="p-d-flex">
                <div className="p-d-flex p-ai-center">
                  {["left", "center", "right"].map((align) => (
                    <div key={align} className="p-my-auto p-mr-3">
                      <RadioButton
                        className="p-d-none p-p-0"
                        inputId={align}
                        name="align"
                        value={align}
                        onChange={(e) => handleHeaderChange(e)}
                        checked={editHeader.align === align}
                      />
                      <label
                        className={`p-my-auto header-footer-align ${
                          editHeader.align === align ? "selected" : ""
                        }`}
                        htmlFor={align}
                      >
                        <i className={`fa fa-align-${align}`}></i>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="p-inputgroup p-ml-2">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-star"></i>
                  </span>
                  <InputText
                    className="p-p-1"
                    placeholder="Title"
                    name="text"
                    value={editHeader.text}
                    autoComplete="off"
                    onChange={(e) => handleHeaderChange(e)}
                  />
                </div>
              </div>
              <div className="p-inputgroup p-mt-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-link"></i>
                </span>
                <InputText
                  className="p-py-1"
                  placeholder="link"
                  name="link"
                  autoComplete="off"
                  value={editHeader.link}
                  onChange={(e) => handleHeaderChange(e)}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <div className="p-grid p-pt-2">
          <div className="p-col-6 p-py-0 p-pl-0">
            <div style={{ height: "150px", width: "100%" }}>
              <img
                style={{
                  maxWidth: "100%",
                  height: "100%",
                  cursor: "pointer",
                  padding: "2px",
                  border: "2px solid #999",
                }}
                src={editUrl}
                alt={editUrl}
                onError={(e) => (e.target.src = logo)}
              />
            </div>
          </div>
          <div className="p-col-6 p-p-0">
            <div style={{ fontSize: "14px" }} className="p-mb-2 p-d-none">
              <input
                type="checkbox"
                id="checkbox"
                onChange={(e) => {
                  setManualUrl(e.target.checked);
                  setSelectedValue(null);
                  setUrl("");
                }}
                disabled={type === HOME_PAGE_SECTION_TYPES.scroll}
                checked={manualUrl}
              />
              <label htmlFor="checkbox">Check here to enter URL manually</label>
            </div>
            {!manualUrl &&
              ![
                HOME_PAGE_SECTION_TYPES.scroll,
                HOME_PAGE_SECTION_TYPES.rotate,
              ].includes(type) && (
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
                        value={selectedValue}
                        options={products}
                        onChange={(e) => handleSelectionValueChange(e.value)}
                        optionLabel="categoryValue"
                        filter
                        showClear
                        filterBy="categoryValue"
                        placeholder="Select a Product"
                        valueTemplate={selectedCategoryTemplate}
                        itemTemplate={categoryOptionTemplate}
                      />
                    </div>
                  </div>
                </div>
              )}
            {type === HOME_PAGE_SECTION_TYPES.rotate && (
              <ProductSelector handleItemSelection={handleItemSelection} />
            )}
            <div className="p-d-none">
              <div>
                <small>URL</small>
              </div>
              <div>
                <div className="p-inputgroup ">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-link"></i>
                  </span>
                  <InputText
                    onChange={(e) => setUrl(e.target.value)}
                    name="url"
                    disabled={!manualUrl}
                    value={editUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <fieldset>
          <legend>Footer</legend>
          <div className="p-grid p-ai-center">
            <div className="p-col">
              <div className="p-d-flex">
                <div className="p-d-flex p-ai-center">
                  {["left", "center", "right"].map((align) => (
                    <div key={align + "_footer"} className="p-my-auto p-mr-3">
                      <RadioButton
                        className="p-d-none"
                        inputId={align + "_footer"}
                        name="align"
                        value={align}
                        onChange={(e) => handleFooterChange(e)}
                        checked={editFooter.align === align}
                      />
                      <label
                        className={`p-my-auto header-footer-align ${
                          editFooter.align === align ? "selected" : ""
                        }`}
                        htmlFor={align + "_footer"}
                      >
                        <i className={`fa fa-align-${align}`}></i>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="p-inputgroup p-ml-2">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-star"></i>
                  </span>
                  <InputText
                    className="p-p-1"
                    placeholder="Title"
                    name="text"
                    value={editFooter.text}
                    autoComplete="off"
                    onChange={(e) => handleFooterChange(e)}
                  />
                </div>
              </div>
              <div className="p-inputgroup p-mt-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-link"></i>
                </span>
                <InputText
                  className="p-p-1"
                  placeholder="link"
                  name="link"
                  autoComplete="off"
                  value={editFooter.link}
                  onChange={(e) => handleFooterChange(e)}
                />
              </div>
            </div>
          </div>
        </fieldset>
        <div className="p-jc-between p-d-flex p-mt-2">
          <Button
            className="p-py-1 p-button-secondary"
            label="Cancel"
            onClick={() => setVisible(false)}
          />
          <Button
            className="p-py-1"
            label="Save"
            onClick={() => handleClose()}
          />
        </div>
      </React.Fragment>
    );
  };

  return <React.Fragment>{editBodyTemplte()}</React.Fragment>;
}

export default EditImage;
