import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import EditIngestionConfiguration from "./EditIngestionConfiguration";
import AddIngestionConfiguration from "./AddIngestionConfiguration";
import AddDVNProduct from "./AddDVNProduct";
import Table from "./Table";

const IngestionConfiguration = () => {
  const [basePath] = useState("/ingestion/ingestionConfig");
  return (
    <>
      <Switch>
        <Route
          path={`${basePath}/addDVNProductIngestion`}
          component={AddDVNProduct}
        />
        <Route
          path={`${basePath}/edit/:productAttributeKeysId`}
          component={EditIngestionConfiguration}
        />
        <Route
          path={`${basePath}/new`}
          exact
          component={AddIngestionConfiguration}
        />
        <Route exact path={basePath} component={Table} />
      </Switch>
    </>
  );
};

export default IngestionConfiguration;
