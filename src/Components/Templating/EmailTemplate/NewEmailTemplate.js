import React from "react";
import EmailTemplatePage from "./EmailTemplatePage";
import CustomBreadcrumbs from "../../CustomBreadCrumbs";
const NewEmailTemplate = () => {
  const breadcrumbs = [
    {
      label: "Email Template",
      path: "/templating/emailTemplate",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: "new",
      path: "/templating/emailTemplate/new",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <EmailTemplatePage />
    </>
  );
};

export default NewEmailTemplate;
