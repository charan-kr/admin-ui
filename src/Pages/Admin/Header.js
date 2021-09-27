import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logo } from "../../utils/ImagePath";
import { logoutUserAction } from "../../redux/user/actions";
import { Button } from "primereact/button";

function Header() {
  let header = {
    backgroundColor: " #2198D0",
    zIndex: 100,
    top: 0,
    height: "80px",
    alignItems: "center",
  };
  const dispatch = useDispatch();
  const logout = () => dispatch(logoutUserAction());
  return (
    <nav>
      <div className="p-grid p-m-0 p-p-0 p-shadow-8" style={header}>
        <div className="p-col-2 p-mt-0 ">
          <div style={{ height: "100%" }}>
            <img alt="logo" width="130px" height="100%" src={logo} />
          </div>
        </div>
        <div className="p-col-8 ">
          <div className="p-grid p-justify-center">
            <h1
              className=" p-text-uppercase"
              style={{ color: "white", letterSpacing: 2 }}
            >
              Admin portal
            </h1>
          </div>
        </div>
        <div className="p-col-2">
          <div
            className="p-grid p-justify-end p-ai-center p-mr-2"
            style={{ color: "white", cursor: "pointer" }}
          >
            <div
              className="p-text-right p-text-wrap p-text-truncate"
              style={{ lineHeight: "1.2" }}
            >
              <strong className="">Admin Name</strong>
              <div onClick={logout}>Logout</div>
            </div>
            <Button
              icon="fa fa-user-cog"
              className="p-button-text p-mx-2"
              style={{ color: "white", fontSize: "22px" }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Header);
