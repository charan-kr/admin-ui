import React from "react";
import { Route, Switch } from "react-router-dom";
import Table from "./Table";
import NewSearchDb from "./NewSearchDB";
import EditSearchDb from "./EditSearchDb";

const SearchDB = () => {
  const basePath = "/searchdb";
  return (
    <div>
      <Switch>
        <Route path={`${basePath}/new`} component={NewSearchDb} />
        <Route path={`${basePath}/edit/:keyword`} component={EditSearchDb} />
        <Route path={`${basePath}`} component={Table} />
      </Switch>
    </div>
  );
};

export default SearchDB;
