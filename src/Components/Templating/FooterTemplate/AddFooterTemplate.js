import React from "react";
import FooterTemplate from "./FooterTemplate";

import CustomBreadcrumbs from "../../CustomBreadCrumbs";

const AddFooterTemplate = () => {
         const breadcrumbs = [
        {
            label: "FooterTemplateDetails",
            path: "/templating/footerTemplate",
            icon: "fa fa-home",
            onlyIcon: false,
            showIcon: false,
        },
        {
            label: "New",
            path: `/templating/footerTemplate/add`,
            icon: "fa fa-home",
            onlyIcon: false,
            showIcon: false,
        },
    ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <FooterTemplate/>
    </>
  );
}

export default AddFooterTemplate
