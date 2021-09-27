import React from "react";
import { Switch, Route } from "react-router-dom";

import NoMatch from "./Pages/404Page/404Page";
import Admin from "./Pages/Admin";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import Auth from "./Pages/Auth/index";
import Unauthorized from "./Pages/Unauthorized";
import Offline from "./Pages/Offline";
import ToastMessage from "./Components/ToastMessage";

import "./App.css";

const App = (props) => {
  return (
    <>
      <ToastMessage />
      {navigator.onLine ? (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/unauthorized" component={Unauthorized} />
          <Route path="/">
            <ProtectedRoutes Component={Admin} allowedRole={["ROLE_ADMIN"]} />
          </Route>
          <Route path="*" component={NoMatch} />
        </Switch>
      ) : (
        <Offline />
      )}
    </>
  );
};

export default App;
