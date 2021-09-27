import React, { useRef, useState } from "react";
import { MultiSelect } from "primereact/multiselect";

import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";

import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import CouponService from "../Service/CouponService";

function CouponDetails(props) {
  const couponService = new CouponService();

  const { setCouponDetails, couponDetails } = props;
  const [applicables, setApplicables] = useState([]);

  const toast = useRef(null);

  const handleSerachValue = (e) => {
    const { value } = e.target;
    couponService
      .findBySearch(value)
      .then((response) => {
        setApplicables(response.data);
      })
      .catch((error) => {
        alert(error);
      });

    setCouponDetails((prevstate) => ({
      ...prevstate,
      applicableLevel: value,
      applicableList: "",
    }));
  };
  const handleCouponDetailsChange = (e) => {
    const { name, value } = e.target;
    setCouponDetails((prevstate) => ({ ...prevstate, [name]: value }));
  };
  return (
    <React.Fragment>
      <Toast ref={toast}></Toast>
      <div className="p-mx-2 ">
        <div style={{ borderBottom: "4px solid #bbb", color: "#ccc" }}>
          <h3 className="p-m-0 p-text-uppercase p-px-2">Coupon Details</h3>
        </div>

        <div className="coupon-details p-ml-2">
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="promoCode">Applicable Level</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <Dropdown
                  inputId="applicableLevel"
                  value={couponDetails.applicableLevel}
                  options={["DVN", "PRODUCT", "CATEGORY", "SUBCATEGORY"]}
                  //options={[{name:"Product",value:"p"}]}

                  placeholder="Select Applicable Level"
                  name="applicableLevel"
                  onChange={handleSerachValue}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="promoCode">Applicable Values</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>

                <MultiSelect
                  options={
                    /* couponDetails?.applicableList
                      ? couponDetails?.applicableList
                      : */ applicables
                  }
                  display="chip"
                  value={couponDetails.applicableList}
                  onChange={(e) => handleCouponDetailsChange(e)}
                  name="applicableList"
                  placeholder="Select a Applicable Values"
                  className="p-inputgroup"
                  disabled={!couponDetails.applicableLevel}
                />
              </div>
            </div>
          </div>{" "}
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="code">Coupon code</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <InputText
                  id="couponCode"
                  name="couponCode"
                  value={couponDetails.couponCode}
                  onChange={(e) => handleCouponDetailsChange(e)}
                  placeholder="SAFETY50"
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="code">Include Other coupon</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <div className="p-formgroup-inline">
                  <div className="p-field-checkbox">
                    <RadioButton
                      inputId="includeWithOtherCoupon"
                      name="includeWithOtherCoupon"
                      value="true"
                      checked={couponDetails.includeWithOtherCoupon === "true"}
                      onChange={(e) => handleCouponDetailsChange(e)}
                    />
                    <label htmlFor="city7">Yes</label>
                  </div>
                  <div className="p-field-checkbox">
                    <RadioButton
                      inputId="includeWithOtherCoupon"
                      name="includeWithOtherCoupon"
                      value="false"
                      //value="Los Angeles"
                      onChange={(e) => handleCouponDetailsChange(e)}
                      checked={couponDetails.includeWithOtherCoupon === "false"}
                    />
                    <label htmlFor="city8">No </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="description">
                Description to be displayed in the website
              </label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <div className="p-inputgroup">
                  <InputTextarea
                    id="message"
                    name="description"
                    rows={3}
                    className="p-mr-2"
                    value={couponDetails.description}
                    onChange={(e) => handleCouponDetailsChange(e)}
                    placeholder="Flat 50% discount on safey shoes."
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </div>
            </div>
            {/* <span style={{ width: "20%", color: "#ccc" }}>
              <strong>
                *description Flat 50% discount on safety shoes. Apply promo code
                SAFTEY50
              </strong>
            </span> */}
          </div>
          {/*  <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="maxQuantityPerUser">Max usage per user</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <InputNumber
                  mode="decimal"
                  showButtons
                  min={1}
                  max={10}
                  placeholder="1"
                  id="maxQuantityPerUser"
                  onChange={(e) =>
                    setCouponDetails((prevstate) => ({
                      ...prevstate,
                      maxQuantityPerUser: e.value,
                    }))
                  }
                  value={couponDetails.maxQuantityPerUser}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          */}{" "}
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="maxTotalUsage">Maximum Total Usage</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <InputNumber
                  mode="decimal"
                  showButtons
                  min={1}
                  placeholder="500"
                  id="maxTotalUsage"
                  onChange={(e) =>
                    setCouponDetails((prevstate) => ({
                      ...prevstate,
                      maxTotalUsage: e.value,
                    }))
                  }
                  value={couponDetails.maxTotalUsage}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          {/*    <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="maxQuantityPerUser">Usage</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                {["General", "Limited"].map((usage) => (
                  <div key={usage} className="p-field-radiobutton p-mr-2 ">
                    <RadioButton
                      inputId={usage}
                      name="usage"
                      value={usage}
                      onChange={(e) =>
                        setCouponDetails((prevstate) => ({
                          ...prevstate,
                          usage: e.value,
                        }))
                      }
                      checked={usage === couponDetails.usage}
                    />
                    <label htmlFor={usage}>{usage}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            {couponDetails.usage === "Limited" && (
              <div>
                <div className="p-grid p-ai-center p-my-0">
                  <div className="p-col-4">
                    <label htmlFor="maxQuantityPerUser">User File</label>
                  </div>
                  <div className="p-col-8">
                    <div className="p-d-flex">
                      <span className="colen">:</span>
                      <div>
                        <input
                          className="p-d-none"
                          ref={fileUploadRef}
                          type="file"
                          id="file"
                          accept=".csv, .xlsx"
                          onChange={handleFileChange}
                        />
                        {selectedFileTemplate()}
                        <Button
                          onClick={() => fileUploadRef.current.click()}
                          className="p-button-info p-py-1 p-d-block"
                          label="Choose File"
                        />
                        {data.length === 0 && (
                          <span className="p-invalid p-error">
                            **Upload csv/xlsx file only
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        */}{" "}
        </div>
      </div>
    </React.Fragment>
  );
}

export default CouponDetails;
