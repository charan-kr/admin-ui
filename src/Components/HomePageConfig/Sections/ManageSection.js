import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

import { v4 as uuidv4 } from "uuid";
import { TabPanel, TabView } from "primereact/tabview";
import { confirmPopup } from "primereact/confirmpopup";
import { InputNumber } from "primereact/inputnumber";
import { HOME_PAGE_SECTION_TYPES } from "../../../utils/constants";

const intialObject = { text: "", link: "", align: "left" };
const subSectionObject = {
  link: "",
  header: intialObject,
  footer: intialObject,
  text: null,
  images: [],
};
const imageObject = {
  url: "",
  width: "",
  height: "",
  header: intialObject,
  footer: intialObject,
};
function ManageSection({
  section,
  setManageSectionDialog,
  updateSection,
  tabindex = 0,
}) {
  const { type, header, footer, subSections } = section;
  const sectionTypes = [
    HOME_PAGE_SECTION_TYPES.regular,
    HOME_PAGE_SECTION_TYPES.scroll,
    HOME_PAGE_SECTION_TYPES.rotate,
    HOME_PAGE_SECTION_TYPES.advertise,
    HOME_PAGE_SECTION_TYPES.badging,
    HOME_PAGE_SECTION_TYPES.personalization,
  ];
  const [editType] = useState(type);
  const [editHeader, setHeader] = useState(header);
  const [editFooter, setFooter] = useState(footer);
  const [editSubSections, setSubSections] = useState(subSections);
  const [imageLen, setImageLen] = useState(1);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(tabindex);
  useEffect(() => {
    setSubSections(subSections);
    setHeader(header);
    setFooter(footer);
  }, [section]); // eslint-disable-line react-hooks/exhaustive-deps
  const updatesectionImages = () => {
    const images = [...Array(imageLen || 1).keys()].map(() => ({
      ...imageObject,
      id: uuidv4(),
    }));
    const imageList = [...subSections[0]?.images, ...images].slice(
      0,
      imageLen || 1
    );
    setSubSections(subSections.map((ele) => ({ ...ele, images: imageList })));
    setVisible(false);
  };
  const addNewSubSection = () => {
    const newSubSection = {
      ...subSectionObject,
      images: [...Array(imageLen).keys()].map(() => ({
        ...imageObject,
        id: uuidv4(),
      })),
    };
    setSubSections([...editSubSections, { ...newSubSection, id: uuidv4() }]);
    setVisible(false);
  };
  const accept = (id) => {
    setSubSections(editSubSections.filter((ele) => ele.id !== id));
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

  const handleDialogClose = () => {
    const section_ = {
      ...section,
      type: editType,
      header: editHeader,
      footer: editFooter,
      subSections: editSubSections,
    };
    updateSection(section_);
  };
  const onRowReorder = (e) => {
    setSubSections(e.value);
  };
  const handleAddNewSubSection = () => {
    setVisible(true);
    setImageLen(1);
  };
  const subSectionBodyTemplate = (rowData) => {
    return <span>{rowData?.images?.length}</span>;
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          disabled={editSubSections.length <= 2}
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={(e) => confirmDelete(e, rowData.id)}
        />
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <h3 className="p-m-0 p-text-center">
        <u>Section Controller</u>
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
          <TabPanel header="Type">
            <div>
              {sectionTypes.map((type) => (
                <div key={type} className="p-field-radiobutton p-my-2">
                  <RadioButton
                    inputId={type}
                    name="type"
                    disabled
                    value={type}
                    // onChange={(e) => setType(e.value)}
                    checked={editType === type}
                  />
                  <label disabled htmlFor={type}>
                    {type}
                  </label>
                </div>
              ))}
            </div>
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
          <TabPanel header="Manage SubSections">
            <div>
              {[
                HOME_PAGE_SECTION_TYPES.regular,
                HOME_PAGE_SECTION_TYPES.advertise,
              ].includes(editType) &&
                editSubSections.length < 4 && (
                  <div className="p-mb-1">
                    <Button
                      onClick={() => handleAddNewSubSection()}
                      icon="fa fa-plus-circle"
                      iconPos="right"
                      className="p-py-1 p-button-info"
                      label="Add New SubSection"
                    />
                  </div>
                )}
              <DataTable
                emptyMessage="No Sub Sections to show"
                value={editSubSections}
                reorderableColumns
                onRowReorder={onRowReorder}
                className="p-datatable-sm"
              >
                <Column rowReorder style={{ width: "3rem" }} />
                <Column field="header.text" header="Header" />
                <Column field="footer.text" header="Footer" />
                <Column
                  body={subSectionBodyTemplate}
                  header="No. of Product(s)"
                />
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
            onClick={() => setManageSectionDialog(false)}
          />
          <Button
            className="p-py-1"
            label="Save"
            onClick={() => handleDialogClose()}
          />
        </div>
      </div>
      <Dialog visible={visible} onHide={() => setVisible(false)}>
        <label>Select No. of Image Required</label>
        <div>
          {[HOME_PAGE_SECTION_TYPES.regular].includes(editType) ? (
            <Dropdown
              className="p-inputgroup p-mb-2"
              placeholder="Choose Images Len"
              options={[1, 2, 3, 4]}
              value={imageLen}
              onChange={(e) => setImageLen(e.value)}
            />
          ) : [HOME_PAGE_SECTION_TYPES.advertise].includes(editType) ? null : (
            <InputNumber
              min={1}
              value={imageLen}
              onChange={(e) => setImageLen(e.value)}
            />
          )}
        </div>
        <div>
          {[
            HOME_PAGE_SECTION_TYPES.regular,
            HOME_PAGE_SECTION_TYPES.advertise,
          ].includes(editType) ? (
            <Button
              onClick={() => addNewSubSection()}
              className="p-button-info p-py-1"
              style={{ width: "100%" }}
              label="Create Section"
            />
          ) : (
            <Button
              onClick={() => updatesectionImages()}
              className="p-button-info p-py-1"
              style={{ width: "100%" }}
              label="Update Products"
            />
          )}
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export default ManageSection;
