import React, { useState } from "react";

import { Carousel } from "primereact/carousel";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import ManageSubSection from "./ManageSubSection";

import { no_image_available } from "../../../../utils/ImagePath";
import { handleImageError } from "../../../../utils/handleImageError";

function Badging({ section, updateSubSection, type }) {
  const { subSections } = section;
  const [visibleSubsection, setVisibleSubSection] = useState(false);

  const itemTemplate = () => {
    return (
      <div style={{ width: "100%", height: "180px" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={no_image_available}
          alt={"Badging Item"}
          onError={handleImageError}
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
            value={[...Array(20).keys()]}
            numVisible={6}
            numScroll={3}
            indicatorsContentClassName="p-d-none"
            itemTemplate={itemTemplate}
            header={headerTemplate}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
export default Badging;
