import CustomBreadcrumbs from "../..//CustomBreadCrumbs";
import React from "react";
import AddProductConfiguration from "./AddProductConfiguration";

const breadcrumbs = [
  {
    label: "Product Ingestion",
    path: "/ingestion/productIngestion",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "New",
    path: "/ingestion/productIngestion/new",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
];
const NewProductConfiguration = () => {
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <AddProductConfiguration />
    </>
  );
};

export default NewProductConfiguration;
