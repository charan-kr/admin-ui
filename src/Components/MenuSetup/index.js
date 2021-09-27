import React from "react";
import { Route, Switch } from "react-router-dom";
import AddMenuSetup from "./AddMenuSetup";
import EditMenuSetup from "./EditMenuSetup";
import Table from "./Table";

const index = () => {
  const basePath = "/menuSetup";
  return (
    <>
      <Switch>
        <Route path={`${basePath}/new`} component={AddMenuSetup} />
        <Route path={`${basePath}/edit/:menuId`} component={EditMenuSetup} />
        <Route path={basePath} component={Table} />
      </Switch>
    </>
  );
};

export default index;
