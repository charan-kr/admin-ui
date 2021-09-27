import React from "react";
import { Route, Switch } from "react-router-dom";
import PersonalizationConfiguration from "../Personalization/PersonalizationConfiguration";
import AddPersonalization from "../Personalization/AddPersonalization";

export default function Personalization() {
    
    return (
      <div
        className="p-shadow-4"
        style={{ backgroundColor: "white", margin: "15px" }}
      >
        <Switch>
        <Route exact path='/personalization/personalizationConfiguration' component={PersonalizationConfiguration} />
        <Route exact path='/personalization/personalizationConfiguration/addNew' component={AddPersonalization} />
        </Switch>
      </div>
    );
  }