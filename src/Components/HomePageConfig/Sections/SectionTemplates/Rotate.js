import React, { useEffect, useState } from "react";

import { Carousel } from "primereact/carousel";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import ManageSubSection from "./ManageSubSection";
import EditImage from "./EditImage";

import { logo } from "../../../../utils/ImagePath";

function Rotate({ section, updateImage, updateSubSection, type }) {
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
      <div style={{ width: "100%", height: "180px" }}>
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
          type={type}
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
      <div className="p-card p-pb-4 p-shadow-4">
        <div className="p-card-body p-p-0">
          <Carousel
            value={editImages}
            numVisible={6}
            numScroll={3}
            // responsiveOptions={responsiveOptions}
            indicatorsContentClassName="p-d-none"
            itemTemplate={itemTemplate}
            header={headerTemplate}
            // footer={footerTemplate}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
export default Rotate;
