import React from "react";
import { Route, Switch } from "react-router-dom";
import EmailTemplate from "./EmailTemplate";
import FooterTemplate from "./FooterTemplate";
import UITemplate from "./UITemplating";

const Templating = () => {
  const baseUrl = "/templating";
  return (
    <>
      <Switch>
        <Route path={`${baseUrl}/emailTemplate`} component={EmailTemplate} />
        <Route path={`${baseUrl}/uiTemplate`} component={UITemplate} />
        <Route path={`${baseUrl}/footerTemplate`} component={FooterTemplate} />
      </Switch>
    </>
  );
};

export default Templating;
