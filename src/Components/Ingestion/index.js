import React, { useState } from "react";
import { Route, Switch } from "react-router";
import IngestionPool from "./IngestionPool";
import DVNIngestion from "./DvnIngestion";
import DVNLanguageConfigurtion from "./DVNLanguageConfigurtion";
import ProductIngestion from "./ProductIngestion";
import ProductLanguageConfigurtion from "./ProductLanguageConfiguration";
import IngestionConfiguration from "./IngestionConfiguration";
import SkuIngestion from "./SkuIngestion";

const Ingestion = () => {
  const [basePath] = useState("/ingestion");
  return (
    <div className="ingestion" style={{ height: "100%" }}>
      <Switch>
        <Route path={`${basePath}/ingestionPool`} component={IngestionPool} />
        <Route
          path={`${basePath}/ingestionConfig`}
          component={IngestionConfiguration}
        />
        <Route
          path={`${basePath}/productIngestion`}
          component={ProductIngestion}
        />
        <Route path={`${basePath}/dvnIngestion`} component={DVNIngestion} />
        <Route
          path={`${basePath}/skuIngestion`}
          exact
          component={SkuIngestion}
        />

        <Route
          path={`${basePath}/productLanguageConfiguration`}
          component={ProductLanguageConfigurtion}
        />
        <Route
          path={`${basePath}/dvnLanguageConfiguration`}
          component={DVNLanguageConfigurtion}
        />
      </Switch>
    </div>
  );
};

export default Ingestion;
