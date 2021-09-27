import React from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

function OfferDetails(props) {
  const today = new Date();
  const { offerDetails, setOfferDetails } = props;
  console.log(offerDetails.validFrom, offerDetails.validTo);

  const handleOfferDetailsChange = (e) => {
    const { name, value } = e.target;
    setOfferDetails((prevstate) => ({ ...prevstate, [name]: value }));
  };

  const handleInputNumberChange = (name, value) => {
    setOfferDetails((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <div className="p-m-2">
        <div style={{ borderBottom: "4px solid #bbb", color: "#999" }}>
          <h3 className="p-m-0 p-text-uppercase p-px-2">Offer Details</h3>
        </div>
        <div className="offer-details p-ml-2">
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="type">Type</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <InputText
                  inputId="type"
                  name="type"
                  disabled
                  value={offerDetails.type}
                  placeholder="Flat"
                  onChange={(e) => handleOfferDetailsChange(e)}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>

          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="validFrom">Start date</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <Calendar
                  minDate={today}
                  hideOnDateTimeSelect
                  inputId="validFrom"
                  dateFormat="dd-mm-yy"
                  value={offerDetails.validFrom}
                  onChange={(e) => handleOfferDetailsChange(e)}
                  showIcon
                  showTime
                  hourFormat="12"
                  placeholder="Valid From"
                  className="p-inputgroup"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="validTo">End date</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <Calendar
                  minDate={offerDetails.validFrom}
                  hideOnDateTimeSelect
                  inputId="validTo"
                  name="validTo"
                  dateFormat="dd-mm-yy"
                  value={offerDetails.validTo}
                  onChange={(e) => handleOfferDetailsChange(e)}
                  showIcon
                  showTime
                  hourFormat="12"
                  placeholder="Valid To"
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="p-grid p-ai-center p-my-0">
              <div className="p-col-4">
                <label htmlFor="discountAmount">Discount amount</label>
              </div>
              <div className="p-col-8">
                <div className="p-d-flex p-ai-center">
                  <span className="colen">:</span>
                  {/* <span className="p-inputgroup-addon"> &#8377;</span> */}
                  <InputNumber
                    // min={1}
                    placeholder="1000"
                    id="discountAmount"
                    name="discountAmount"
                    mode="currency"
                    currency="INR"
                    currencyDisplay="symbol"
                    locale="en-IN"
                    onChange={(e) =>
                      handleInputNumberChange("discountAmount", e.value)
                    }
                    className="p-inputgroup"
                    value={offerDetails.discountAmount}
                  />
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
                  showButtons
                  min={1}
                  max={10}
                  placeholder="1"
                  id="maxQuantityPerUser"
                  onChange={(e) => handleOfferDetailsChange(e)}
                  value={offerDetails.maxQuantityPerUser}
                  className="p-inputgroup"
                  disabled
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
                  // min={1}
                  showButtons
                  placeholder="1000"
                  id="maxTotalUsage"
                  onChange={(e) =>
                    handleInputNumberChange("maxTotalUsage", e.value)
                  }
                  value={offerDetails.maxTotalUsage}
                  className="p-inputgroup"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default OfferDetails;
