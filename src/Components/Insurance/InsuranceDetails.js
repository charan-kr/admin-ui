import React, { useRef, useState } from "react";
import { MultiSelect } from "primereact/multiselect";

import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";

import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Link, useRouteMatch } from "react-router-dom";

function BankOffersDetails(props) {
  const { path } = useRouteMatch();
  const [includes, setApplicables] = useState([]);
  const [benefits, setBenefits] = useState(false);
  const [support, setSupport] = useState(null);
  const [minItemPrice, setminItemPrice] = useState([]);
  const [maxItemPrice, setmaxItemPrice] = useState([]);
  const [serviceType, setserviceType] = useState([]);
  const [numberOfYears, setNumberOfYears] = useState([]);



  const toast = useRef(null);

  const handleSerachValue = (e) => {
    const { value } = e.target;

  };
  const handleCouponDetailsChange = (e) => {
    const { name, value } = e.target;
    ;
  };

  return (
    <React.Fragment>
      <Toast ref={toast}></Toast>
      <div className="p-mx-2 ">
        <div style={{ borderBottom: "4px solid #bbb", color: "#ccc" }}>
          <h3 className="p-m-0 p-text-uppercase p-px-2">Insurance Details</h3>
        </div>

        <div className="coupon-details p-ml-2">
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="promoCode">Includes</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <Dropdown
                  inputId="includes"
                  value={includes}
                  options={['Accidental damage', 'Lost']}
                  //options={[{name:"Product",value:"p"}]}

                  placeholder="Select what includes"
                  name="includes"
                  onChange={handleSerachValue}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="benefits">Benefits</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <Dropdown
                  inputId="benefits"
                  value={benefits}
                  options={["", ""]}
                  placeholder="Choose benefits"
                  name="benefits"
                  onChange={handleSerachValue}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="paymentType">Support</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <Dropdown
                  inputId="support"
                  value={support}
                  options={[""]}
                  placeholder="support"
                  name="support"
                  onChange={handleSerachValue}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="maxTotalUsage">Minimum Qualifying Item Price </label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <InputNumber
                  mode="decimal"
                  showButtons
                  min={500}
                  placeholder="100"
                  id="minItemPrice"
                  value={minItemPrice}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="maxTotalUsage">Maximum Qualifying Item Price</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <InputNumber
                  mode="decimal"
                  showButtons
                  min={500}
                  placeholder="500"
                  id="maXItemPrice"
                  value={maxItemPrice}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="paymentType">Service plan type</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <Dropdown
                  inputId="paymentType"
                  value={serviceType}
                  options={["Online", "Mobile"]}
                  placeholder="choose plan"
                  name="sponser"
                  onChange={handleSerachValue}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="numberOfYears">Number of years protected</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <Dropdown
                  inputId="numberOfYears"
                  value={numberOfYears}
                  options={["1", "2"]}
                  placeholder="choose years"
                  name="sponser"
                  onChange={handleSerachValue}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>

          {" "}
        </div>
      </div>
    </React.Fragment>
  );
}

export default BankOffersDetails;
