import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Loading from "../Loading";
import MenuSetup from "./MenuSetup";
import CustomBreadcrumbs from "../CustomBreadCrumbs";

import { MenuSetupConfigService } from "../Service/MenuSetupConfigService";

const EditMenuSetup = () => {
  const menuSetupConfigService = new MenuSetupConfigService();
  const { menuId } = useParams();

  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (menuId) {
      menuSetupConfigService
        .getMenuSetupConfigDetailsById(menuId)
        .then((res) => {
          setConfig(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [menuId]); // eslint-disable-line react-hooks/exhaustive-deps
  const breadcrumbs = [
    {
      label: "Menu Setup",
      path: "/menuSetup",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `Edit (${menuId})`,
      path: `/menuSetup/edit/${menuId}`,
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];

  const dataNotFoundTemplate = (
    <div>
      <h1>404! Data Not Found</h1>
    </div>
  );
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {loading ? (
        <Loading />
      ) : !config ? (
        dataNotFoundTemplate
      ) : (
        <MenuSetup edit={true} config={config} />
      )}
    </>
  );
};

export default EditMenuSetup;
