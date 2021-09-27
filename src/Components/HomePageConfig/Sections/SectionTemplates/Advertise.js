import React from "react";

import { DataView } from "primereact/dataview";

import SimpleCard from "./SimpleCard";

function Advertise(props) {
  const { data } = props;
  const createCard = (section) => {
    const { images } = section;
    const len = data.subSections.length;
    let col = 9;
    switch (len) {
      case 2:
        col = 6;
        break;
      default:
        break;
    }

    return (
      <div
        className={`p-mx-auto p-col-12 p-md-${col} p-px-1 custom-section-${len}`}
      >
        <div className="p-p-1">
          <div className="p-grid">
            {images.map((image, index) => (
              <div
                key={index}
                className={`p-p-1 custom-column-${images.length} custom-column-${images.length}-${index}`}
              >
                <div className="advertise-card">
                  <SimpleCard image={image} />
                </div>
                {
                  <div
                    className=" p-d-flex p-jc-end p-ai-center"
                    style={{ color: "#bbb" }}
                  >
                    <span>Sponsered</span>
                    <span>
                      <i className="fa fa-exclamation-circle p-mx-1" />
                    </span>
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-p-4 regular-card">
      <DataView
        value={data.subSections}
        layout="grid"
        itemTemplate={createCard}
      />
      {/* <div className=" p-d-flex p-jc-end p-ai-center" style={{ color: "#999" }}>
        <span>Sponsered</span>
        <span>
          <i className="fa fa-exclamation-circle p-mx-1" />
        </span>
      </div> */}
    </div>
  );
}

export default Advertise;
