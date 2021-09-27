import React from "react";
import { Route, Switch } from "react-router";

import NewConfig from "./NewConfig";
import CloneConfig from "./CloneConfig";
import EditConfig from "./EditConfig";
import Table from "./Table";

import "./style.css";

function HomePageConfig() {
  return (
    <React.Fragment>
      <div className="homeconfig">
        <Switch>
          <Route path="/hpconfig/edit" component={EditConfig} />
          <Route path="/hpconfig/copy" component={CloneConfig} />
          <Route path="/hpconfig/new" component={NewConfig} />
          <Route exact path="/hpconfig" component={Table} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default HomePageConfig;
