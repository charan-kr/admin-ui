import React from "react";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import NewBankOffers from "./NewBankOffers";

const AddNewBankOffers = () => {
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
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <NewBankOffers />
    </>
  );
};

export default AddNewBankOffers;
