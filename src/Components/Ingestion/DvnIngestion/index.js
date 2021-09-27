import React, { useState } from "react";
import { Route, Switch } from "react-router";

import Table from "./Table";
import EditDVNConfiguration from "./EditDVNConfiguartion";
import NewDVNConfiguration from "./NewDVNConfiguration";
import CustomBreadcrumbs from "../../CustomBreadCrumbs";
import StageMedia from "./StageMedia";
import ExistingDvnMedia from "./ExsistingDvnMedia";
import ImageServiceReview from "./ImageServiceReview/ImageServiceReview";

const breadcrumbs = [
  {
    label: "DVN Ingestion",
    path: "/ingestion/dvnIngestion",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
];
const ProductIngestion = () => {
  const [basePath] = useState("/ingestion/dvnIngestion");

  return (
    <div className="dvn-ingestion" style={{ height: "inherit" }}>
      <Switch>
        <Route path={`${basePath}/stageMedia/:id`} component={StageMedia} />
        <Route
          path={`${basePath}/existingDvnMedia/:id`}
          component={ExistingDvnMedia}
        />
        <Route
          path={`${basePath}/reviewMedia/:id`}
          component={ImageServiceReview}
        />

        <Route
          path={`${basePath}/edit/:dvnId`}
          component={EditDVNConfiguration}
        />
        <Route
          path={`${basePath}/new/:productId`}
          component={NewDVNConfiguration}
        />
        <Route path={basePath}>
          <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
          <Table />
        </Route>
      </Switch>
    </div>
  );
};

export default ProductIngestion;
