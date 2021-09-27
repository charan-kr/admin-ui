import React from "react";
import CustomBreadcrumbs from "../../CustomBreadCrumbs";
import ApplicableTable from "./ApplicableTable";
import { useParams } from "react-router-dom";
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
  {
    label: "Edit",
    path: "/BankOffersDashboard/new/ApplicableConfig/edit/:keyword",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
];
const EditApplicableDetails = () => {
  const { keyword } = useParams();
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <ApplicableTable keyword={keyword} edit_={true} />
    </>
  );
};

export default EditApplicableDetails;
