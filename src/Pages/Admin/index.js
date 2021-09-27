import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import Content from "./Content";
import SideNav from "./SideNav";

const Admin = () => {
  return (
    <React.Fragment>
      <div>
        <div style={{ position: "fixed", top: "0", left: "0", zIndex: "9999" }}>
          <SideNav />
        </div>
      </div>

      <div
        className="p-grid dashboard"
        style={{
          height: "100vh",
          paddingLeft: "4rem",
        }}
      >
        <div className="p-col-12 p-p-0 p-d-flex p-flex-column">
          <div
            className="p-card"
            style={{ position: "sticky", top: "0", zIndex: "2" }}
          >
            <div className="p-card-header p-px-3-0">
              <Header />
            </div>
          </div>
          <div className="p-p-2" style={{ flex: "1" }}>
            <Content />
          </div>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;
