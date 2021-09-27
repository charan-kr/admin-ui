import React from "react";

import CustomBreadcrumbs from "../CustomBreadCrumbs";
import SearchFilter from "./SearchFilter";

const AddSearchFilter = () => {
  const breadcrumbs = [
    {
      label: "Search Filters",
      path: "/searchFilters",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: "New",
      path: "/searchFilters/new",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <SearchFilter />
    </>
  );
};

export default AddSearchFilter;
