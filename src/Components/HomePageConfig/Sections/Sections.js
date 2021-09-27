import React, { useState } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

import NewSection from "./NewSection";
import ManageSection from "./ManageSection";
import Regular from "./SectionTemplates/Regular";
import Scroll from "./SectionTemplates/Scroll";
import Rotate from "./SectionTemplates/Rotate";
import ReOrderTemplate from "./ReorderTemplate";
import Badging from "./SectionTemplates/Badging";

import { HOME_PAGE_SECTION_TYPES } from "../../../utils/constants";

function Sections(props) {
  const { handleSave, handleUpdate, edit, passedSections } = props;
  const [addDialog, setAddDialog] = useState(false);
  const [manageSectionDialog, setManageSectionDialog] = useState(false);
  const [reorderSectionDialog, setReorderSectionDialog] = useState(false);

  const [sections, setSections] = useState(passedSections);
  const [selectedSection, setSelectedSection] = useState(null);

  const addSection = (section) => {
    setSections([...sections, section]);
    console.log(section);
    setAddDialog(false);
  };
  const updateSubSection = (subSection, id) => {
    setSections(
      sections.map((section) =>
        section.id === id
          ? {
              ...section,
              subSections: section.subSections.map((ele) =>
                ele.id === subSection.id ? subSection : ele
              ),
            }
          : section
      )
    );
  };

  const updateImage = (image, subSectionId, sectionId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subSections: section.subSections.map((subSection) =>
                subSection.id === subSectionId
                  ? {
                      ...subSection,
                      images: subSection.images.map((ele) =>
                        ele.id === image.id ? image : ele
                      ),
                    }
                  : subSection
              ),
            }
          : section
      )
    );
  };
  const updateSection = (section) => {
    setSections(sections.map((ele) => (ele.id === section.id ? section : ele)));
    setManageSectionDialog(false);
  };
  const reOrderSection = (sections) => {
    setSections(sections);
    setReorderSectionDialog(false);
  };
  const handleSubmit = () => {
    if (edit) {
      handleUpdate(sections);
    } else {
      handleSave(sections);
    }
  };
  const itemTemplate = (section) => {
    switch (section.type) {
      case HOME_PAGE_SECTION_TYPES.regular:
        return (
          <Regular
            section={section}
            updateSubSection={updateSubSection}
            updateImage={updateImage}
          />
        );
      case HOME_PAGE_SECTION_TYPES.scroll:
        return (
          <Scroll
            type={section.type}
            section={section}
            updateImage={updateImage}
            updateSubSection={updateSubSection}
          />
        );
      case HOME_PAGE_SECTION_TYPES.rotate:
        return (
          <Rotate
            type={section.type}
            section={section}
            updateImage={updateImage}
            updateSubSection={updateSubSection}
          />
        );
      case HOME_PAGE_SECTION_TYPES.advertise:
        return (
          <Regular
            section={section}
            updateImage={updateImage}
            updateSubSection={updateSubSection}
          />
        );

      case HOME_PAGE_SECTION_TYPES.personalization:
      case HOME_PAGE_SECTION_TYPES.badging:
        return (
          <Badging
            type={section.type}
            section={section}
            updateImage={updateImage}
            updateSubSection={updateSubSection}
          />
        );

      default:
        return null;
    }
  };
  const manageSection = (section) => {
    setSelectedSection(section);
    setManageSectionDialog(true);
  };
  return (
    <React.Fragment>
      <Dialog
        style={{ width: "50vw" }}
        visible={addDialog}
        // showHeader={false}
        onHide={() => setAddDialog(false)}
      >
        <NewSection addSection={addSection} />
      </Dialog>
      <Dialog
        className="homeconfig"
        style={{ width: "50vw" }}
        visible={manageSectionDialog}
        showHeader={false}
        focusOnShow={false}
        onHide={() => setManageSectionDialog(false)}
      >
        <ManageSection
          setManageSectionDialog={setManageSectionDialog}
          section={selectedSection}
          updateSection={updateSection}
          updateSubSection={updateSubSection}
        />
      </Dialog>
      <Dialog
        className="homeconfig"
        style={{ width: "50vw" }}
        visible={reorderSectionDialog}
        showHeader={false}
        focusOnShow={false}
        onHide={() => setReorderSectionDialog(false)}
      >
        <ReOrderTemplate
          sections={sections}
          reOrderSection={reOrderSection}
          setReorderSectionDialog={setReorderSectionDialog}
        />
      </Dialog>
      {sections.length > 0 && (
        <div className="p-text-right">
          <Button
            onClick={() => setReorderSectionDialog(true)}
            className="p-button-info p-p-1"
            icon="fa fa-cogs"
            label="Sections Settings"
          />
        </div>
      )}
      <div className="homeconfig">
        {sections.map((section) => (
          <fieldset key={section.id} className="p-p-1 p-my-2">
            <legend className="p-mx-1 p-d-flex p-ai-center">
              <Button
                onClick={() => manageSection(section)}
                className="p-button-rounded p-py-1 p-button-info p-button-outlined p-mr-1"
              >
                <h4 className="p-m-0">Manage Section</h4>
              </Button>
              <small>{section.type}</small>
            </legend>
            {itemTemplate(section)}
          </fieldset>
        ))}
      </div>
      <Button
        style={{ width: "100%" }}
        onClick={() => setAddDialog(true)}
        className="p-button-info p-p-1"
        label="Add New Section"
      />
      <Divider />
      <div className="p-text-center p-mt-3">
        <Button
          style={{ width: "25%" }}
          onClick={() => handleSubmit()}
          className={`p-button-${edit ? "help" : "success"} p-button-rounded`}
        >
          <div className="p-text-center" style={{ width: "100%" }}>
            {/* <i className="fa fa-upload p-mx-2" aria-hidden="true"></i> */}
            <span>{edit ? "UPDATE" : "SAVE"}</span>
          </div>
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Sections;
