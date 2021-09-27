import { Galleria } from "primereact/galleria";
import React from "react";

const ImageGroup = ({ banner }) => {
  const itemTemplate = (imageUrl) => {
    return (
      <>
        <div style={{ width: "80%", height: "100%" }}>
          <img
            src={imageUrl}
            alt="banners"
            style={{ maxWidth: "100%", height: "100%" }}
          />
        </div>
      </>
    );
  };
  return (
    <>
      {banner && (
        <>
          <div className="p-d-flex p-ai-center ">
            <label>Banner Code : </label>
            <h3 className="p-m-0 p-pl-2">{banner?.bannerCode}</h3>
          </div>
          <div>
            <Galleria
              className="h-100"
              value={banner.imageUrlPaths}
              showItemNavigators
              // responsiveOptions={this.responsiveOptions}
              numVisible={5}
              showIndicators
              item={itemTemplate}
              showThumbnails={false}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ImageGroup;
