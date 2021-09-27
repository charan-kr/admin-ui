import React, { useEffect, useState } from "react";

import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";

import { logo } from "../../../../utils/ImagePath";
import { HOME_PAGE_SECTION_TYPES } from "./../../../../utils/constants";
import AdvertiseService from "./../../../Service/AdvertiseService";

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
function SimpleCard({ image, updateImage, type }) {
  const { header, footer, url, product } = image;

  const [products] = useState(availableProduct);

  const [editUrl, setUrl] = useState(url);
  const [editHeader, setHeader] = useState(header);
  const [editFooter, setFooter] = useState(footer);
  const [editProduct, setProduct] = useState(product);
  const [manualUrl, setManualUrl] = useState(false);
  const [selectedAdvertise, setSelectedAdvertise] = useState(null);
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    setUrl(url);
    setHeader(header);
    setFooter(footer);
  }, [image]); // eslint-disable-line react-hooks/exhaustive-deps
  const [selectedValue, setSelectedValue] = useState("");

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible) {
      const advertiseService = new AdvertiseService();
      advertiseService
        .getAllActiveAdvertisement()
        .then((res) => setAdvertisements(res.data));
    }
  }, [visible]);

  const handleClose = () => {
    const image_ = {
      ...image,
      footer: editFooter,
      header: editHeader,
      url: editUrl,
      product: editProduct,
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
    setProduct(value?.categoryKey);
    setSelectedValue(value);
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
  const onAdvertiseChange = (e) => {
    const value = e.value;
    setSelectedAdvertise(value);
    setUrl(value.imageUrlPath);
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
            {type === HOME_PAGE_SECTION_TYPES.advertise ? (
              <div>
                <label>
                  <small>Select Advertisement </small>
                </label>
                <div className="p-fluid">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-tags"></i>
                    </span>
                    <Dropdown
                      options={advertisements}
                      optionLabel="name"
                      value={selectedAdvertise}
                      onChange={onAdvertiseChange}
                      filter
                      filterBy="name"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: "14px" }} className="p-mb-2">
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={(e) => {
                      setManualUrl(e.target.checked);
                      setSelectedValue(null);
                      setUrl("");
                    }}
                    checked={manualUrl}
                  />
                  <label htmlFor="checkbox">
                    Check here to enter URL manually
                  </label>
                </div>
                {!manualUrl && (
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
              </>
            )}
            <div>
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

  return (
    <React.Fragment>
      <Dialog
        className="homeconfig"
        style={{ width: "50%" }}
        visible={visible}
        showHeader={false}
        focusOnShow={false}
      >
        {editBodyTemplte()}
      </Dialog>

      <div
        onClick={() => {
          console.log(image);
          setVisible(true);
        }}
        style={{ height: "100%" }}
      >
        <div className="image-div" style={{ height: "150px" }}>
          <img
            style={{
              width: "100%",
              height: "100%",
              cursor: "pointer",
              border: "2px solid #ddd",
            }}
            src={image.url}
            alt={image.url}
            onError={(e) => (e.target.src = logo)}
          />
        </div>
        <div style={{ marginTop: "-0.25rem" }}>
          <small>
            {footer.text ? (
              footer.text
            ) : (
              <span style={{ color: "#bbb" }}>
                {url ? "Add Image Footer" : "Add Image"}
              </span>
            )}
          </small>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SimpleCard;
