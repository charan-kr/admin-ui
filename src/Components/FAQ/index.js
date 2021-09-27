import React from "react";

import Table from "./Table";

import CustomBreadcrumbs from "../CustomBreadCrumbs";

const FAQS = () => {
  const breadcrumbs = [
    {
      label: "FAQ",
      path: "/faq",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <div>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />

      <Table />
    </div>
  );
};
export default FAQS;
