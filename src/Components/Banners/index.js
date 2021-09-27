import React from "react";
import { Switch, Route } from "react-router-dom";

import EditBanner from "./EditBanner";
import NewBanner from "./AddBanner";
import Table from "./Table";

const Banners = () => {
  const basepath = "/banners";
  return (
    <>
      <Switch>
        <Route path={`${basepath}/edit/:bannerCode`} component={EditBanner} />
        <Route path={`${basepath}/new`} component={NewBanner} />
        <Route path={basepath} component={Table} />
      </Switch>
    </>
  );
};

export default Banners;
