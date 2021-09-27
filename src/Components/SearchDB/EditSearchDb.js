import React from "react";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import SearchDBConfig from "./SearchDBConfig";
import { useParams } from "react-router-dom";

const breadcrumbs = [
  {
    label: "Search DB",
    path: "/searchdb",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "Edit",
    path: "/searchdb/edit",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
];
const EditSearchDb = () => {
  const { keyword } = useParams();
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <SearchDBConfig keyword={keyword} edit_={true} />
    </>
  );
};

export default EditSearchDb;
