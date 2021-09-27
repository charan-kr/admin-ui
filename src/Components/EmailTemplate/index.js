import React from "react";
import { Route, Switch } from "react-router-dom";
import NewEmailTemplate from "./NewEmailTemplate";
import Table from "./Table";

const index = () => {
  const basePath = "/emailTemplate";

  return (
    <>
      <Switch>
        <Route path={`${basePath}/new`} component={NewEmailTemplate} />
        <Route path={basePath} component={Table} />
      </Switch>
    </>
  );
};

export default index;
