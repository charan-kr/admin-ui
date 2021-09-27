import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import { Button } from "primereact/button";

import { logoutUserAction } from "../redux/user/actions";

const Unauthorized = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUserAction());
    setTimeout(() => {
      history.push("/auth/login");
    }, 1000);
  };
  return (
    <div className="p-text-center">
      <h1 style={{ fontSize: "48px" }}>401 !</h1>
      <p>You are not Authorized to view this page</p>
      <Button onClick={logout} label="Logout" className="p-py-1 p-px-3" />
    </div>
  );
};

export default Unauthorized;
