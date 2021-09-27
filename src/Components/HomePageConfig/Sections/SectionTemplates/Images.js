import React from "react";
import SimpleCard from "./SimpleCard";

function Images({ images, updateImage, type }) {
  const len = images.length;
  const getLen = (index) => {
    switch (len) {
      case 1:
        return 12;
      case 4:
      case 2:
        return 6;
      case 3:
        if (index === 0) return 12;
        else return 6;
      default:
        break;
    }
  };
  return (
    <React.Fragment>
      {images.map((image, index) => (
        <div
          key={index}
          className={`p-col-${getLen(index)} p-px-1 p-py-1 ${
            images.length <= 2 ? "single-image" : ""
          }`}
          style={{ height: "100%" }}
        >
          <SimpleCard type={type} image={image} updateImage={updateImage} />
        </div>
      ))}
    </React.Fragment>
  );
}

export default Images;
