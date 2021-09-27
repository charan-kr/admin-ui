import React from "react";
import BannerConfig from "./BannerConfig";
import CustomBreadcrumbs from "../CustomBreadCrumbs";

const NewBanner = () => {
  const breadcrumbs = [
    {
      label: "Banners",
      path: "/banners",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: "New",
      path: "/banners/new",
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

export default NewBanner;
