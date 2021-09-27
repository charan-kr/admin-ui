import React from "react";
import IngestionConfiguration from "./IngestionConfiguration";

import CustomBreadcrumbs from "../../CustomBreadCrumbs";

const AddIngestionConfiguration = () => {
  const breadcrumbs = [
    {
      label: "Ingestion Configuration",
      path: "/ingestion/ingestionConfig",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: "New",
      path: "/ingestion/ingestionConfig/new",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />

      <IngestionConfiguration />
    </>
  );
};

export default AddIngestionConfiguration;
