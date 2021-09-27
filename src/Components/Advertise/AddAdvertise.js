import React from "react";
import BannerConfig from "./AdvertiseConfig";
import CustomBreadcrumbs from "../CustomBreadCrumbs";

const NewAdvertise = () => {
  const breadcrumbs = [
    {
      label: "Advertise",
      path: "/advertise",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: "New",
      path: "/advertise/new",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <BannerConfig />
    </>
  );
};

export default NewAdvertise;
