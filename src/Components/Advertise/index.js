import React from "react";
import { Switch, Route } from "react-router-dom";

import Table from "./Table";
import EditAdvertise from "./EditAdvertise";
import NewAdvertise from "./AddAdvertise";

const Advertise = () => {
  const basepath = "/advertise";
  return (
    <>
      <Switch>
        <Route
          path={`${basepath}/edit/:advertiseCode`}
          component={EditAdvertise}
        />
        <Route path={`${basepath}/new`} component={NewAdvertise} />
        <Route path={basepath} component={Table} />
      </Switch>
    </>
  );
};

export default Advertise;
