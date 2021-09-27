import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./Login";
import Register from "./Register";
import PasswordAssistance from "../../Components/PasswordChange/PasswordAssistance";
import PasswordAuthentication from "../../Components/PasswordChange/PasswordAuthentication";
import PasswordChange from "../../Components/PasswordChange/PasswordChange";
import NoMatch from "../404Page/404Page";

const Auth = () => {
  const isLoggedIn = useSelector((state) => state?.user?.loggedIn);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) history.push("/");
  }, [isLoggedIn, history]);
  const basePath = "/auth";
  return (
    <>
      <Switch>
        <Route path={`${basePath}/login`} component={Login} />
        <Route path={`${basePath}/register`} component={Register} />
        <Route path={`${basePath}/forgetPassword`} component={PasswordAssistance} />
        <Route path={`${basePath}/validateotp`} component={PasswordAuthentication} />        
        <Route path={`${basePath}/resetPassword`} component={PasswordChange} />     
        <Route component={NoMatch} />
      </Switch>
    </>
  );
};

export default Auth;
