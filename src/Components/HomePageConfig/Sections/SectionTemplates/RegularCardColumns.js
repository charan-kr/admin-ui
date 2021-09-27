import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { TabPanel, TabView } from "primereact/tabview";
import { confirmPopup } from "primereact/confirmpopup";

import Images from "./Images";

import { logo } from "../../../../utils/ImagePath";
import { HOME_PAGE_SECTION_TYPES } from "../../../../utils/constants";

const intialObject = { text: "", link: "", align: "left" };
const imageObject = {
  url: "",
  width: "",
  height: "",
  header: intialObject,
  footer: intialObject,
};
const availableCategories = [
  {
    categoryKey: "footware",
    categoryValue: "Footware",
    link: "http://www.dolphinskart.com/search?key=global&category=footware",
  },
];
function RegularCardColumns({
  subSection,
  updateSubSection,
  updateImage,
  type,
}) {
  const { header, footer, images } = subSection;
  const [categories] = useState(availableCategories);
  const [editLink, setLink] = useState(subSection.link);
  const [editHeader, setHeader] = useState(subSection.header);
  const [editFooter, setFooter] = useState(subSection.footer);
  const [editText, setText] = useState(subSection.text);
  const [editImages, setImages] = useState(images);
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    setImages(images);
  }, [subSection]); // eslint-disable-line react-hooks/exhaustive-deps
  const addNewImage = () => {
    setImages([...editImages, { ...imageObject, id: uuidv4() }]);
  };
  const accept = (id) => {
    setImages(editImages.filter((ele) => ele.id !== id));
    //  toast.current.show({
    //    severity: "info",
    //    summary: "Confirmed",
    //    detail: "You have accepted",
    //    life: 3000,
    //  });
  };
  const confirmDelete = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(id),
    });
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
    setLink(value?.link || "");
    setSelectedValue(value);
  };
  const handleDialogClose = () => {
    const subSection_ = {
      ...subSection,
      link: editLink,
      text: editText,
      header: editHeader,
      footer: editFooter,
      images: editImages,
    };
    console.log(editImages);
    updateSubSection(subSection_);
    setVisible(false);
  };
  const onRowReorder = (e) => {
    setImages(e.value);
  };
  const imageBodyTemplte = (rowData) => {
    return (
      <div>
        <img
          style={{
            width: "50px",
            height: "50px",
          }}
          src={rowData.url}
          alt={rowData.url}
          onError={(e) => (e.target.src = logo)}
        />
      </div>
    );
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
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          disabled={editImages.length < 2}
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={(e) => confirmDelete(e, rowData.id)}
        />
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <Dialog
        className="homeconfig"
        visible={visible}
        showHeader={false}
        focusOnShow={false}
        style={{ width: "50%", background: "#fff" }}
      >
        <h3 className="p-m-0 p-text-center">
          <u>Sub Section Controller</u>
        </h3>
        <div
          className="p-d-flex p-flex-column p-jc-between"
          style={{ minHeight: "70vh" }}
        >
          <TabView
            className="p-mt-2"
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="Section Type">
              <fieldset className="p-mt-2">
                <legend>Section Type</legend>
                <div className="p-d-flex">
                  <div className="p-d-flex p-ai-center">
                    {["Offer", "Promotion", "Category"].map((type) => (
                      <div
                        key={type}
                        className="p-field-radiobutton p-my-auto p-mr-1"
                      >
                        <RadioButton
                          inputId={type}
                          name="text"
                          value={type}
                          onChange={(e) => setText(e.value)}
                          checked={editText === type}
                        />
                        <label htmlFor={type}>{type}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {editText === "Category" && (
                  <div>
                    <div>
                      <small>Choose category</small>
                      <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-tag"></i>
                        </span>
                        <Dropdown
                          value={selectedValue}
                          options={categories}
                          onChange={(e) => handleSelectionValueChange(e.value)}
                          optionLabel="categoryValue"
                          filter
                          showClear
                          filterBy="categoryValue"
                          placeholder="Select a Category"
                          valueTemplate={selectedCategoryTemplate}
                          itemTemplate={categoryOptionTemplate}
                        />
                      </div>
                      <div></div>
                      <small>URL</small>
                      <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-link"></i>
                        </span>
                        <InputText disabled value={editLink} />
                      </div>
                    </div>
                  </div>
                )}
              </fieldset>
            </TabPanel>
            <TabPanel header="Header">
              <div className="p-grid p-ai-center">
                <div className="p-col-2 p-p-0">
                  <span>Align</span>
                </div>
                <div className="p-col p-p-0">
                  <div className="p-d-flex p-ai-center">
                    {["left", "center", "right"].map((align) => (
                      <div
                        key={align}
                        className="p-field-radiobutton p-my-auto p-mr-1"
                      >
                        <RadioButton
                          className="p-d-none"
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
                </div>
              </div>
              <div className=" p-grid p-ai-center p-py-2">
                <div className="p-col-2 p-p-0">
                  <span>Title</span>
                </div>
                <div className="p-col p-p-0">
                  <div className="p-inputgroup">
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
              </div>
              <div className="p-grid p-ai-center">
                <div className="p-col-2 p-p-0">
                  <span>Link</span>
                </div>
                <div className="p-col p-p-0">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-link"></i>
                    </span>
                    <InputText
                      className="p-p-1"
                      placeholder="link"
                      name="link"
                      autoComplete="off"
                      value={editHeader.link}
                      onChange={(e) => handleHeaderChange(e)}
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel header="Manage Images">
              <div>
                {[
                  HOME_PAGE_SECTION_TYPES.regular,
                  HOME_PAGE_SECTION_TYPES.rotate,
                ].includes(type) && (
                  <div className="p-mb-1">
                    <Button
                      onClick={() => addNewImage()}
                      icon="fa fa-plus-circle"
                      iconPos="right"
                      className="p-py-1 p-button-info"
                      label="Add New Product"
                    />
                  </div>
                )}
                <DataTable
                  emptyMessage="No sections to show"
                  value={editImages}
                  reorderableColumns
                  onRowReorder={onRowReorder}
                  className="p-datatable-sm"
                >
                  <Column rowReorder style={{ width: "3rem" }} />
                  <Column field="header.text" header="Header" />
                  <Column field="footer.text" header="Footer" />
                  <Column body={imageBodyTemplte} header="Image" />
                  <Column
                    className="p-text-center"
                    style={{ width: "3em" }}
                    body={actionBodyTemplate}
                  />
                </DataTable>
              </div>
            </TabPanel>
            <TabPanel header="Footer">
              <div className="p-grid p-ai-center">
                <div className="p-col-2 p-p-0">
                  <span>Align</span>
                </div>
                <div className="p-col p-p-0">
                  <div className="p-d-flex">
                    {["left", "center", "right"].map((align) => (
                      <div
                        key={align + "_footer"}
                        className="p-field-radiobutton p-my-auto p-mr-1"
                      >
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
                </div>
              </div>
              <div className="p-grid p-py-2 p-ai-center">
                <div className="p-col-2 p-p-0">
                  <span>Title</span>
                </div>
                <div className="p-col p-p-0">
                  <div className="p-inputgroup">
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
              </div>
              <div className="p-grid p-ai-center">
                <div className="p-col-2 p-p-0">
                  <span className="p-m-0">Link</span>
                </div>

                <div className="p-col p-p-0">
                  <div className="p-inputgroup">
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
            </TabPanel>
          </TabView>

          <div className="p-jc-between p-d-flex p-mt-2">
            <Button
              className="p-py-1 p-button-secondary"
              label="Cancel"
              onClick={() => setVisible(false)}
            />
            <Button
              className="p-py-1"
              label="Save"
              onClick={() => handleDialogClose()}
            />
          </div>
        </div>
      </Dialog>
      <div className="p-card p-shadow-6" style={{ height: "100%" }}>
        <div className="p-card-body p-px-2 p-py-3" style={{ height: "100%" }}>
          <div className="p-d-flex p-flex-column" style={{ height: "100%" }}>
            <div
              onClick={() => {
                setVisible(true);
                setActiveIndex(1);
              }}
              className={`p-text-${header.align}`}
            >
              <Button className="p-text-left p-pl-1 p-py-0 p-button-secondary p-button-text">
                <h3 className="p-m-0">
                  {header.text ? (
                    header?.text
                  ) : (
                    <span style={{ color: "#ddd" }}>Click to Add Header</span>
                  )}
                </h3>
              </Button>
            </div>
            <div style={{ flex: "1" }}>
              <div
                className={`p-grid`}
                style={{ height: images.length <= 2 ? "330px" : "auto" }}
              >
                <Images type={type} images={images} updateImage={updateImage} />
              </div>
            </div>
            <div
              onClick={() => {
                setVisible(true);
                setActiveIndex(3);
              }}
              className={`p-text-${footer.align}`}
              style={{ marginLeft: "4px" }}
            >
              <Button className="p-p-0 p-button-secondary p-button-text p-text-lowercase">
                {footer.text ? (
                  footer.text
                ) : (
                  <span style={{ color: "#ddd" }}>Click to Add Footer</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RegularCardColumns;
