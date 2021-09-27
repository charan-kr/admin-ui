import React from "react";
import CustomBreadcrumbs from "../../CustomBreadCrumbs";
import Table from "./Table";

const UITemplating = () => {
  const breadcrumbs = [
    {
      label: "UI Template",
      path: "/templating/uiTemplate",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <Table />
    </>
  );
};

export default UITemplating;
