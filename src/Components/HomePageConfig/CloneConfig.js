import CustomBreadcrumbs from "../CustomBreadCrumbs";
import React, { useEffect, useState } from "react";
import HomePageConfigService from "../Service/HomePageConifgService";
import { useQuery } from "../Utilities/DateAndTimeConverter/useQuery";
import Homeconfig from "./Homeconfig";
const breadcrumbs = [
  {
    label: "Configuration",
    path: "/config",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "HomePage Config",
    path: "/hpconfig",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "New",
    path: "/new",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
];
function CloneConfig() {
  const [id] = useState(useQuery().get("ref"));
  const [config, setConfig] = useState(null);
  useEffect(() => {
    if (id) {
      HomePageConfigService.getHomePageConfigById(id)
        .then((response) => {
          setConfig(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  return (
    <React.Fragment>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <div>
        {config ? <Homeconfig edit={false} config={config} /> : "Loading"}
      </div>
    </React.Fragment>
  );
}

export default CloneConfig;
