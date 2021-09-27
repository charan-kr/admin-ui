import React from "react";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import MenuSetup from "./MenuSetup";

const AddMenuSetup = () => {
  const breadcrumbs = [
    {
      label: "Menu Setup",
      path: "/menuSetup",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: "New",
      path: "/menuSetup/new",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <MenuSetup />
      {/* <A /> */}
    </>
  );
};

export default AddMenuSetup;
