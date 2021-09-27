import React from "react";

function Footer() {
  return (
    <React.Fragment>
      <div className="p-card p-mt-3 p-shadow-3">
        <div className="p-card-header p-p-3">
          <div className="p-d-flex p-jc-between p-ai-center">
            <div>
              <h3 className="p-m-0">DOLPHINS INDIA</h3>
            </div>
            <div style={{ color: "#999" }}>
              <small>&copy; all rights reserved</small>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
