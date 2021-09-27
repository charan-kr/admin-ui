import React, { useEffect, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { convertDateToString } from "../../utils/convertDateToString";
import { convertStringToDate } from "../../utils/convertStringToDate";
function OfferDetails(props) {
  const today = new Date();

  const { offerDetails, setOfferDetails } = props;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (offerDetails.validFrom)
      setStartDate(
        convertStringToDate(offerDetails.validFrom, "dd-mm-yyyy HH:MM A")
      );

    if (offerDetails.validTo)
      setEndDate(
        convertStringToDate(offerDetails.validTo, "dd-mm-yyyy HH:MM A")
      );
  }, [offerDetails]);

  const handleOfferDetailsChange = (e) => {
    const { name, value } = e.target;
    setOfferDetails((prevstate) => ({ ...prevstate, [name]: value }));
  };

  const handleDateTimeChange = (value, name) => {
    setOfferDetails((prevstate) => ({
      ...prevstate,
      [name]: convertDateToString(value, "dd-mm-yyyy HH:MM A"),
    }));
    if (name === "validFrom") setStartDate(value);
    else setEndDate(value);
  };
  const handleInputNumberChange = (name, value) => {
    setOfferDetails((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };
  const handleTypeChange = (name, value) => {
    if (value === "Flat") {
      setOfferDetails((prevstate) => ({
        ...prevstate,
        [name]: value,
        percentage: 0,
        allowedMaximumDiscount: 0,
      }));
    } else {
      setOfferDetails((prevstate) => ({
        ...prevstate,
        [name]: value,
        discountAmount: 0,
      }));
    }
  };
  return (
    <React.Fragment>
      <div className="p-mx-2">
        <div style={{ borderBottom: "4px solid #bbb", color: "#ccc" }}>
          <h3 className="p-m-0 p-text-uppercase p-px-2">Offer Details</h3>
        </div>
        <div className="offer-details p-ml-2">
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="offerName">Offer Name</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>

                <InputText
                  id="offerName"
                  value={offerDetails.offerName}
                  name="offerName"
                  onChange={(e) => handleOfferDetailsChange(e)}
                  placeholder="DIWALI OFFER"
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="type">Type</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <Dropdown
                  inputId="type"
                  value={offerDetails.type}
                  options={["Flat", "Percentage"]}
                  placeholder="Flat"
                  onChange={(e) => handleTypeChange("type", e.value)}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="method">Method</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <Dropdown
                  inputId="method"
                  value={offerDetails.method}
                  options={["Voucher", "Promotion"]}
                  placeholder="Voucher"
                  onChange={(e) => handleInputNumberChange("method", e.value)}
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
                  value={startDate}
                  onChange={(e) => handleDateTimeChange(e.value, "validFrom")}
                  showIcon
                  showTime
                  hourFormat="12"
                  placeholder="Valid From"
                  className="p-inputgroup"
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
                  minDate={startDate}
                  hideOnDateTimeSelect
                  inputId="validTo"
                  dateFormat="dd-mm-yy"
                  value={endDate}
                  onChange={(e) => handleDateTimeChange(e.value, "validTo")}
                  showIcon
                  showTime
                  hourFormat="12"
                  placeholder="Valid To"
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          {offerDetails.type.toUpperCase() === "PERCENTAGE" ? (
            <div>
              <div className="p-grid p-ai-center p-my-0">
                <div className="p-col-4">
                  <label htmlFor="percentage">Percentage</label>
                </div>
                <div className="p-col-8">
                  <div className="p-d-flex p-ai-center">
                    <span className="colen">:</span>
                    <div>
                      <div className="p-inputgroup">
                        <InputNumber
                          max={100}
                          min={0}
                          placeholder="25"
                          style={{ width: "50px" }}
                          id="percentage"
                          onChange={(e) =>
                            handleInputNumberChange("percentage", e.value)
                          }
                          value={offerDetails.percentage}
                        />
                        <span className="p-inputgroup-addon">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-grid p-ai-center p-my-0">
                <div className="p-col-4">
                  <label htmlFor="allowedMaximumDiscount">
                    Allowed Maximum Discount
                  </label>
                </div>
                <div className="p-col-8">
                  <div className="p-d-flex p-ai-center">
                    <span className="colen">:</span>
                    <InputNumber
                      placeholder="1000"
                      id="allowedMaximumDiscount"
                      onChange={(e) =>
                        handleInputNumberChange(
                          "allowedMaximumDiscount",
                          e.value
                        )
                      }
                      value={offerDetails.allowedMaximumDiscount}
                      className="p-inputgroup"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="p-grid p-ai-center p-my-0">
                <div className="p-col-4">
                  <label htmlFor="discountAmount">Discount amount</label>
                </div>
                <div className="p-col-8">
                  <div className="p-d-flex p-ai-center">
                    <span className="colen">:</span>
                    <InputNumber
                      placeholder="1000"
                      id="discountAmount"
                      onChange={(e) =>
                        handleInputNumberChange("discountAmount", e.value)
                      }
                      value={offerDetails.discountAmount}
                      className="p-inputgroup"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="minimumAmountOnCart">
                Minimum amount in cart
              </label>{" "}
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <InputNumber
                  placeholder="1000"
                  id="minimumAmountOnCart"
                  onChange={(e) =>
                    handleInputNumberChange("minimumAmountOnCart", e.value)
                  }
                  value={offerDetails.minimumAmountOnCart}
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
export default OfferDetails;
