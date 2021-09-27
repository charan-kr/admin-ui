import React, { useEffect, useState } from "react";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import Loading from "../Loading";
import BannerConfig from "./BannerConfig";
import { useParams } from "react-router-dom";

const EditBanner = () => {
  const { bannerCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    setLoading(true);
    setConfig({});
  }, []);
  const breadcrumbs = [
    {
      label: "Banners",
      path: "/banners",
      icon: "fa fa-images",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `Edit (${bannerCode})`,
      path: `/banners/edit/${bannerCode}`,
      icon: "fa fa-edit",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {loading ? <Loading /> : <BannerConfig edit={true} config={config} />}
    </>
  );
};

export default EditBanner;
