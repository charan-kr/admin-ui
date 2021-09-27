import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";

import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import PromotionsService from "../Service/PromotionsService";

function PromotionDetails(props) {
  const { setPromotionDetails, promotionDetails } = props;
  const promotionService = new PromotionsService();
  const [applicables, setApplicables] = useState([]);

  const handleSerachValue = (e) => {
    const { value } = e.target;
    promotionService
      .findBySearch(value)
      .then((response) => {
        setApplicables(response.data);
      })
      .catch((error) => {
        alert(error);
      });

    setPromotionDetails((prevstate) => ({
      ...prevstate,
      applicableLevel: value,
      applicableList: null,
    }));
  };
  const handlepPromotionDetailsChange = (e) => {
    const { name, value } = e.target;
    setPromotionDetails((prevstate) => ({ ...prevstate, [name]: value }));
  };
  return (
    <React.Fragment>
      <div className="p-mx-2 ">
        <div style={{ borderBottom: "4px solid #bbb", color: "#ccc" }}>
          <h3 className="p-m-0 p-text-uppercase p-px-2">Promotion Details</h3>
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
                  value={promotionDetails.applicableLevel}
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
                    promotionDetails?.applicableList
                      ? promotionDetails.applicableList
                      : applicables
                  }
                  value={promotionDetails.applicableList}
                  onChange={(e) => handlepPromotionDetailsChange(e)}
                  name="applicableList"
                  placeholder="Select a Applicable Values"
                  className="p-inputgroup"
                  disabled={!promotionDetails.applicableLevel}
                />
              </div>
            </div>
          </div>

          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="promoCode">Promo Code</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <InputText
                  id="promoCode"
                  name="promoCode"
                  value={promotionDetails.promoCode}
                  onChange={(e) => handlepPromotionDetailsChange(e)}
                  placeholder="SAFETY50"
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>

          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="message">
                Description to be displayed in the website
              </label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <div className="p-inputgroup">
                  <InputTextarea
                    id="description"
                    name="description"
                    rows={3}
                    className="p-mr-2"
                    value={promotionDetails.description}
                    onChange={(e) => handlepPromotionDetailsChange(e)}
                    placeholder="Description"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
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
                      onChange={(e) =>
                        setPromotionDetails((prevstate) => ({
                          ...prevstate,
                          includeWithOtherCoupon: e.value,
                        }))
                      }
                      checked={
                        promotionDetails.includeWithOtherCoupon === "true"
                      }
                    />
                    <label htmlFor="city7">Yes</label>
                  </div>
                  <div className="p-field-checkbox">
                    <RadioButton
                      inputId="includeWithOtherCoupon"
                      name="includeWithOtherCoupon"
                      value="false"
                      onChange={(e) =>
                        setPromotionDetails((prevstate) => ({
                          ...prevstate,
                          includeWithOtherCoupon: e.value,
                        }))
                      }
                      checked={
                        promotionDetails.includeWithOtherCoupon === "false"
                      }
                    />
                    <label htmlFor="city8">No </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-grid p-ai-center p-my-0">
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
                    setPromotionDetails((prevstate) => ({
                      ...prevstate,
                      maxQuantityPerUser: e.value,
                    }))
                  }
                  value={promotionDetails.maxQuantityPerUser}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
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
                    setPromotionDetails((prevstate) => ({
                      ...prevstate,
                      maxTotalUsage: e.value,
                    }))
                  }
                  value={promotionDetails.maxTotalUsage}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PromotionDetails;
