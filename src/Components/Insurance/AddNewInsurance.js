import React from "react";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import NewInsurance from "./NewInsurance";

const AddNewInsurance = () => {
  const breadcrumbs = [
    {
      label: "InsuranceDetails",
      path: "/InsuranceDashboard",
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: "New",
      path: "/InsuranceDashboard/new",
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <NewInsurance />
    </>
  );
};

export default AddNewInsurance;
