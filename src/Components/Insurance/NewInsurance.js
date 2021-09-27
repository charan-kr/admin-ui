import React, { useState, useEffect } from "react";

import { Button } from "primereact/button";
import InsuranceDetails from "./InsuranceDetails";

import { useHistory } from "react-router";
import { useToast } from "../../hooks/useToast";

const initialState = {
  insuranceDetails: {
    includes: '',
    benefits: '',
    support: '',
    minItemPrice: '',
    maxItemPrice: '',
    serviceType: '',
    numberOfYears: '',
  },

};

function NewInsurance({ edit = false, data = null }) {
  const history = useHistory();
  const toast = useToast();
  const [insuranceDetails, setinsuranceDetails] = useState(
    initialState.insuranceDetails
  );


  return (
    <React.Fragment>
      <div>
        <div className="p-grid">
          <div className="p-col-12 p-md-6">
            <InsuranceDetails
              insuranceDetails={insuranceDetails}
              setinsuranceDetails={setinsuranceDetails}
            />
          </div>
        </div>
        <div className="p-d-flex p-jc-between">
          <Button
            onClick={() => history.goBack()}
            className="p-button-secondary p-mx-2"
            label="Cancel"
          />
          <div>
            <Button
              className="p-button-success p-mx-2"
              label="Save"
            />
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}

export default NewInsurance;
