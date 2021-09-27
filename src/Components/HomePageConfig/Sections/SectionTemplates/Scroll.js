import React, { useEffect, useState } from "react";

import { Galleria } from "primereact/galleria";
import { Dialog } from "primereact/dialog";

import EditImage from "./EditImage";
import ManageSubSection from "./ManageSubSection";

import { logo } from "../../../../utils/ImagePath";
import { HOME_PAGE_SECTION_TYPES } from "../../../../utils/constants";
import { Button } from "primereact/button";

function Scroll({ section, updateImage, updateSubSection, type }) {
  const { subSections } = section;
  const [editImages, setEditImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleSubsection, setVisibleSubSection] = useState(false);

  useEffect(() => {
    console.log(subSections[0]?.images);
    setEditImages(subSections[0]?.images || []);
  }, [subSections]);
  const handleSelectedImage = (image) => {
    setSelectedImage(image);
    setVisible(true);
  };
  const itemTemplate = (item) => {
    return (
      <div style={{ width: "100%", height: "350px", display: "block" }}>
        <img
          onClick={() => handleSelectedImage(item)}
          style={{ width: "100%", height: "100%" }}
          src={item.url}
          alt={item.url}
          onError={(e) => (e.target.src = logo)}
        />
      </div>
    );
  };
  const headerTemplate = (
    <div className="p-text-left">
      <Button
        onClick={() => setVisibleSubSection(true)}
        className="p-py-2 p-pl-0 p-button-secondary p-button-text"
      >
        <h3 className="p-m-0">
          {subSections[0]?.header.text ? (
            subSections[0]?.header.text
          ) : (
            <span style={{ color: "#ddd" }}>Click to Add header</span>
          )}
        </h3>
      </Button>
    </div>
  );
  return (
    <React.Fragment>
      <Dialog
        className="homeconfig"
        style={{ width: "50%" }}
        visible={visible}
        showHeader={false}
        focusOnShow={false}
      >
        <EditImage
          type={HOME_PAGE_SECTION_TYPES.scroll}
          setVisible={setVisible}
          image={selectedImage}
          updateImage={(image) =>
            updateImage(image, subSections[0]?.id, section.id)
          }
        />
      </Dialog>
      <Dialog
        className="homeconfig"
        style={{ width: "50%" }}
        visible={visibleSubsection}
        showHeader={false}
        focusOnShow={false}
      >
        <ManageSubSection
          type={type}
          setVisibleSubSection={setVisibleSubSection}
          subSection={subSections[0]}
          updateSubSection={(subSection) =>
            updateSubSection(subSection, section.id)
          }
        />
      </Dialog>
      <Galleria
        header={headerTemplate}
        value={editImages}
        showIndicators
        showItemNavigators
        showItemNavigatorsOnHover
        circular
        autoPlay
        transitionInterval={3000}
        style={{ width: "100%" }}
        showThumbnails={false}
        // changeItemOnIndicatorHover
        item={itemTemplate}
      />
    </React.Fragment>
  );
}
export default Scroll;
