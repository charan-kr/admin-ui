import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../Loading";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import SearchFilter from "./SearchFilter";
import SearchFilterService from "../Service/SearchFilterService";

const EditSearchFilter = () => {
  const { id } = useParams();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchFilterService = new SearchFilterService();
  useEffect(() => {
    if (id) {
      searchFilterService
        .getSearchFilterById(id)
        .then((res) => {
          setConfig(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const breadcrumbs = [
    {
      label: "Search Filters",
      path: "/searchFilters",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `Edit (${id})`,
      path: `/searchFilters/edit/${id}`,
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {loading ? <Loading /> : <SearchFilter edit={true} config={config} />}
    </>
  );
};
export default EditSearchFilter;
