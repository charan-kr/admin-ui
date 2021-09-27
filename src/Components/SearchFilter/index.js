import React from "react";
import { Switch, Route } from "react-router";
import AddSearchFilter from "./AddSearchFilter";
import EditSearchFilter from "./EditSearchFilter";

import Table from "./Table";

const index = () => {
  const basePath = "/searchFilters";
  return (
    <>
      <Switch>
        <Route path={`${basePath}/edit/:id`} component={EditSearchFilter} />
        <Route path={`${basePath}/new`} component={AddSearchFilter} />
        <Route path={basePath} component={Table} />
      </Switch>
    </>
  );
};

export default index;
