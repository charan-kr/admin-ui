import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";

import { logo } from "../../utils/ImagePath";

const AddUsers = (props) => {
  const { coupon } = props;
  const [selectedUser, setSelectedUser] = useState("email");
  const [file, setFile] = useState(null);
  const resumeUploader = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const couponTemplate = () => {
    const { validFrom, validTo } = coupon;
    console.log(coupon);
    const today = new Date();
    let expiry = null;
    let tag = "";
    if (today.getTime() > validFrom.getTime()) {
      expiry = (validTo.getTime() - today.getTime()) / (1000 * 60 * 60);
      expiry = Math.floor(expiry);
      tag = `Expires in ${expiry} hour${expiry > 1 ? "s" : ""}`;
    } else {
      expiry = (validFrom.getTime() - today.getTime()) / (1000 * 60 * 60);
      expiry = Math.floor(expiry);
      tag = `Starts in ${expiry} hour${expiry > 1 ? "s" : ""}`;
    }
    return (
      <div
        className="p-d-flex p-flex-column p-ai-center"
        style={{ height: "100%" }}
      >
        <div style={{ width: "100px", height: "100px" }}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={logo}
            alt="alternative"
            onError={(e) => (e.target.src = logo)}
          />
        </div>
        <div className="p-my-2 " style={{ width: "100%" }}>
          <Button
            name={coupon.code}
            value={coupon.code}
            label={coupon.code || "XX-XX-XXXX"}
            className="p-p-2 p-button-outlined p-button-secondary p-inputgroup"
            style={{
              border: "2px dashed #bbb",
            }}
          />
        </div>
        <div className="p-my-1">
          <h3 className="p-m-0 p-text-center ">
            Limited Offer Exclusive Coupon for you
            <br />
            <Link to="/">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i> Shop
              now
            </Link>
          </h3>
        </div>

        <Button
          style={{
            backgroundColor: "#ffccbb",
            color: "#ff0000",
          }}
          className="p-button-danger p-px-4 p-button-rounded p-inputgroup"
          label={tag}
        />
      </div>
    );
  };
  return (
    <>
      <div className="p-m-2">
        <div style={{ borderBottom: "4px solid #bbb", color: "#999" }}>
          <h3 className="p-m-0 p-text-uppercase p-px-2">User Details</h3>
        </div>

        <div className="p-grid p-mt-2">
          <div className="p-col-12 p-md-12">
            <div className="p-card">
              <div className="p-card-body">
                <div className="p-grid p-ai-center">
                  <div className="p-col-4 p-py-1">
                    <div className="p-field p-mb-0">
                      <label htmlFor="source">Source</label>

                      <div className="p-d-flex" style={{ gap: "2rem" }}>
                        {["phone", "email"].map((type) => (
                          <div key={type} className="p-field-radiobutton">
                            <RadioButton
                              inputId={type}
                              name="user"
                              value={type}
                              onChange={(e) => setSelectedUser(e.value)}
                              checked={selectedUser === type}
                            />
                            <label htmlFor={type}>{type}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-col-8 p-py-1">
                    <div className="p-field p-mb-0">
                      <label htmlFor="userName">Customer email/number</label>
                      <InputText
                        className="p-p-1 p-inputgroup"
                        placeholder="UserName"
                      />
                    </div>
                  </div>
                  <div className="p-col-12 p-py-1">
                    <div className="p-field p-mb-1">
                      <label htmlFor="website">Website Link</label>
                      <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-link"></i>
                        </span>
                        <InputText
                          inputId="website"
                          name="website"
                          // value={offerDetails.website}
                          placeholder="http://ref-website.co"
                          // onChange={(e) => handleOfferDetailsChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-shadow-2" style={{ background: "#eee" }}>
                  <h4 className="p-m-0 p-text-center p-error">
                    Upload snapshot of product either in png/jpg/jpeg file
                    format
                  </h4>
                  <div className="p-card" style={{ background: "#eee" }}>
                    <input
                      className="p-d-none"
                      type="file"
                      id="file"
                      accept=".png,.jpg,.jpeg"
                      ref={resumeUploader}
                      onChange={handleImageChange}
                    />
                    <div
                      onClick={() => resumeUploader.current.click()}
                      className="p-card-body p-text-center"
                      style={{ cursor: "pointer", color: "#999" }}
                    >
                      {file ? (
                        <div className="p-d-flex" style={{ gap: "1rem" }}>
                          <img
                            style={{ width: "150px" }}
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                          />
                          <h3>
                            {file.name}
                            <i
                              onClick={() => setFile(null)}
                              className="fa fa-trash p-mx-2"
                              aria-hidden="true"
                            ></i>
                          </h3>
                        </div>
                      ) : (
                        <>
                          <h3 className="p-m-0">Drop file here</h3>

                          <h3 className="p-m-0">or</h3>

                          <h3 className="p-m-0">Select File</h3>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-d-none p-col-12 p-md-4 p-mx-auto">
            <div
              className="p-card p-shadow-2"
              style={{ boxShadow: "0 2px 8px #999" }}
            >
              <div
                className="p-card-header p-p-1 "
                style={{ background: "#eee", color: "#666" }}
              >
                <h3 className="p-m-0 p-text-center">PREVIEW</h3>
              </div>
              <div className="p-card-body">{couponTemplate()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUsers;
