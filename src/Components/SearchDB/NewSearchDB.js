import React from "react";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import SearchDBConfig from "./SearchDBConfig";

const breadcrumbs = [
  {
    label: "Search DB",
    path: "/searchdb",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "New",
    path: "/searchdb/new",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
];
const NewSearchDb = () => {
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <SearchDBConfig />
    </>
  );
};

export default NewSearchDb;
