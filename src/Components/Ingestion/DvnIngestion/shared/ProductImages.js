import React, { useState, useRef } from "react";

import { DataView } from "primereact/dataview";
import { Toast } from "primereact/toast";

import View360Media from "./View360Media";
import { logo_360 } from "../../../../utils/ImagePath";

function ProductImages({ images }) {
  console.log(JSON.stringify(images.length));
  const [image, setImage] = useState(images[0]);

  const toast = useRef(null);

  const itemTemplate = (img) => {
    return (
      <div className="p-mx-1 p-col-12">
        <img
          //onClick={() => setDisplayBasic(true)}
          //onError={(e) => (e.target.src = Logo)}
          onMouseEnter={() => setImage(img)}
          src={
            !img.view360 ? `data:image/jpeg;base64,${img.content}` : logo_360
          }
          alt={img.fileName}
          className={`product-image ${image === img ? "active" : ""}`}
        />
      </div>
    );
  };
  return (
    <div className="p-grid">
      <Toast ref={toast} />

      <div className="p-col-2">
        <DataView value={images} itemTemplate={itemTemplate} layout="grid" />
      </div>
      <div
        style={{
          width: "100%",
          height: "350px",
        }}
        className="p-text-center p-col"
        //onClick={() => setDisplayBasic(true)}
      >
        {image.view360 === true ? (
          <View360Media
            image={{
              imageUrl: `data:image/jpeg;base64,${image.content}`,
              width: 200 * 4,
              height: 89,
              noOfImage: 4,
            }}
          />
        ) : (
          <img
            src={`data:image/jpeg;base64,${image.content}`}
            alt={image.fileName}
            style={{ width: "auto", height: "100%" }}
            //onError={(e) => (e.target.src = Logo)}
          />
        )}
      </div>
    </div>
  );
}

export default ProductImages;
