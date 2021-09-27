import React, { useEffect, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { convertDateToString } from "../../utils/convertDateToString";
import { convertStringToDate } from "../../utils/convertStringToDate";
function OfferDetails({ offerDetails, setOfferDetails, reset }) {
  const today = new Date();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (offerDetails.startDate)
      setStartDate(
        convertStringToDate(offerDetails.startDate, "dd-mm-yyyy HH:MM A")
      );

    if (offerDetails.endDate)
      setEndDate(
        convertStringToDate(offerDetails.endDate, "dd-mm-yyyy HH:MM A")
      );
    if (reset) {
      setOfferDetails(offerDetails)
    }
  }, [offerDetails, reset]);

  const handleOfferDetailsChange = (name, value) => {
    setOfferDetails((prevstate) => ({ ...prevstate, [name]: value }));
  };

  const handleDateTimeChange = (value, name) => {
    setOfferDetails((prevstate) => ({
      ...prevstate,
      [name]: convertDateToString(value, "dd-mm-yyyy HH:MM A"),
    }));
    if (name === "startDate") {
      setStartDate(value);
    }
    else {
      setEndDate(value);
    }
  };
  const handleInputNumberChange = (name, value) => {
    setOfferDetails((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };
  const handleTypeChange = (e) => {
    const { name, value } = e.target
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
              <label htmlFor="offerName">Type</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <Dropdown
                  name="type"
                  value={offerDetails.type}
                  options={["Bank", "Partner"]}
                  placeholder="Select Type"
                  onChange={(e) => handleTypeChange(e)}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="kind">Kind</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <Dropdown
                  name="kind"
                  value={offerDetails.kind}
                  options={["Flat", "Percentage"]}
                  placeholder="Select the kind"
                  onChange={(e) => handleTypeChange(e)}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="paymentType">Title</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <InputText
                  placeholder="Title"
                  name="title"
                  onChange={(e) => handleOfferDetailsChange('title', e.target.value)}
                  value={offerDetails.title}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="startDate">Start date</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <Calendar
                  minDate={today}
                  hideOnDateTimeSelect
                  inputId="startDate"
                  dateFormat="dd-mm-yy"
                  value={startDate}
                  onChange={(e) => handleDateTimeChange(e.value, "startDate")}
                  showIcon
                  showTime
                  hourFormat="12"
                  placeholder="Start From"
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="endDate">End date</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <Calendar
                  minDate={startDate}
                  hideOnDateTimeSelect
                  inputId="endDate"
                  dateFormat="dd-mm-yy"
                  value={endDate}
                  onChange={(e) => handleDateTimeChange(e.value, "endDate")}
                  showIcon
                  showTime
                  hourFormat="12"
                  placeholder="End At"
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          {offerDetails.kind.toUpperCase() === "PERCENTAGE" ? (
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
                          name="percentage"
                          onChange={(e) =>
                            handleInputNumberChange('percentage', e.value)
                          }
                          value={offerDetails.percentage}
                        />
                        <span className="p-inputgroup-addon">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="p-grid p-ai-center p-my-0">
                <div className="p-col-4">
                  <label htmlFor="flatDiscountAmount">Discount amount</label>
                </div>
                <div className="p-col-8">
                  <div className="p-d-flex p-ai-center">
                    <span className="colen">:</span>
                    <InputNumber
                      placeholder="1000"
                      name="flatDiscountAmount"
                      onChange={(e) =>
                        handleInputNumberChange('flatDiscountAmount', e.value)
                      }
                      value={offerDetails.flatDiscountAmount}
                      className="p-inputgroup"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="maxUsagePerUser">Max usage per user</label>
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
                  name="maxUsagePerUser"
                  onChange={(e) => handleOfferDetailsChange('maxUsagePerUser', e.value)}
                  value={offerDetails.maxUsagePerUser}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          {" "}
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="maxUsage">Maximum Total Usage</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <InputNumber
                  mode="decimal"
                  showButtons
                  min={1}
                  max={1000}
                  placeholder="1000"
                  id="maxUsage"
                  onChange={(e) => handleOfferDetailsChange('maxUsage', e.value)}
                  value={offerDetails.maxUsage}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="maxDiscountAmount">Maximum Amount</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <InputNumber
                  mode="decimal"
                  showButtons
                  min={1}
                  max={300}
                  placeholder="300"
                  id="maxDiscountAmount"
                  onChange={(e) => handleOfferDetailsChange('maxDiscountAmount', e.value)}
                  value={offerDetails.maxDiscountAmount}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="minAmountInCart">Minimum amount in cart</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <InputNumber
                  mode="decimal"
                  showButtons
                  min={500}
                  placeholder="500"
                  id="minAmountInCart"
                  onChange={(e) => handleOfferDetailsChange('minAmountInCart', e.value)}
                  value={offerDetails.minAmountInCart}
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
