import React, { useEffect, useState } from "react";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import Loading from "../Loading";
import BannerConfig from "./AdvertiseConfig";
import { useParams } from "react-router-dom";

const EditAdvertise = () => {
  const { advertiseCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    setLoading(true);
    setConfig({});
  }, []);
  const breadcrumbs = [
    {
      label: "Advertise",
      path: "/advertise",
      icon: "fa fa-images",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `Edit (${advertiseCode})`,
      path: `/advertise/edit/${advertiseCode}`,
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

export default EditAdvertise;
