import React from "react";
import RegularCardColumns from "./RegularCardColumns";

function Regular(props) {
  const { section, updateSubSection, updateImage } = props;
  const getLen = () => {
    const len = section.subSections.length;
    switch (len) {
      case 4:
        return 3;

      case 3:
        return 4;

      case 2:
        return 6;

      default:
        return 12;
    }
  };
  const createCard = (subSection) => {
    return (
      <div key={subSection.id} className={`p-col-12 p-md-${getLen()} p-p-1`}>
        <RegularCardColumns
          type={section.type}
          subSection={subSection}
          updateSubSection={(subSection) =>
            updateSubSection(subSection, section.id)
          }
          updateImage={(image) => updateImage(image, subSection.id, section.id)}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="p-grid">
        {section.subSections.map((section) => createCard(section))}
      </div>
    </React.Fragment>
  );
}

export default Regular;
