import React from "react";
import CustomBreadcrumbs from "../../CustomBreadCrumbs";
import ApplicableTable from "./ApplicableTable";

const breadcrumbs = [
  {
    label: "BankOffers",
    path: "/BankOffersDashboard",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "New",
    path: "/BankOffersDashboard/new",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "ApplicableDetailsConfig",
    path: "/BankOffersDashboard/new/ApplicableConfig",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
];
const NewSearchDb = () => {
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <ApplicableTable />
    </>
  );
};

export default NewSearchDb;
