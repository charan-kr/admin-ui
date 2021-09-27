import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "primereact/button";
import { BreadCrumb } from "primereact/breadcrumb";

function CustomBreadcrumbs({ breadcrumbs = [] }) {
  const [custom] = useState(false);
  const elementTemplate = (ele, index) => {
    const isEnd = index === breadcrumbs.length - 1;
    return (
      <React.Fragment>
        <Link className="custom-router-link" to={ele.path}>
          <Button
            className={`p-button-text p-button-${
              isEnd ? "secondary" : "info"
            } p-p-0`}
            label={ele.label}
            icon={ele.showIcon ? ele.icon : ""}
            disabled={isEnd}
          />
        </Link>
        {!isEnd && <i className="fa fa-angle-right p-mx-2"></i>}
      </React.Fragment>
    );
  };

  const items = breadcrumbs.map((ele) => ({
    label: ele.label,
    command: () => (window.location.hash = ele.path),
  }));

  const home = {
    icon: "pi pi-home",
    command: () => {
      window.location.hash = "/";
    },
  };

  return (
    <React.Fragment>
      {custom ? (
        <div className="p-d-flex p-ai-center p-mb-3">
          <Link className="custom-router-link" to={"/"}>
            <Button
              className={`p-button-text p-button-info p-p-0`}
              icon="pi pi-home"
            />
          </Link>
          <i className="fa fa-angle-right p-mx-2"></i>
          {breadcrumbs.map((ele, index) => (
            <div key={index}>{elementTemplate(ele, index)}</div>
          ))}
        </div>
      ) : (
        <div className="p-pb-3" style={{ color: "#219ebc" }}>
          <BreadCrumb model={items} home={home} style={{ border: "none" }} />
        </div>
      )}
    </React.Fragment>
  );
}

export default CustomBreadcrumbs;
