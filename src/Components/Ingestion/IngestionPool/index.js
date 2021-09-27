import React from "react";
import { Route, Switch } from "react-router-dom";
import AddIngestionPool from "./AddIngestionPool";
import Table from "./Table";

const IngestionPool = () => {
  const basePath = "/ingestion/ingestionPool";
  return (
    <div>
      <Switch>
        <Route path={`${basePath}/new`} component={AddIngestionPool} />
        <Route path={basePath} component={Table} />
      </Switch>
    </div>
  );
};

export default IngestionPool;
