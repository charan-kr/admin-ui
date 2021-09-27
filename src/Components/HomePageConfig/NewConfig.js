import CustomBreadcrumbs from "../CustomBreadCrumbs";
import React from "react";
import Homeconfig from "./Homeconfig";

const breadcrumbs = [
  {
    label: "HomePage Config",
    path: "/hpconfig",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "New",
    path: "/hpconfig/new",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
];
function NewConfig() {
  return (
    <React.Fragment>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <div>
        <Homeconfig />
      </div>
    </React.Fragment>
  );
}

export default NewConfig;
