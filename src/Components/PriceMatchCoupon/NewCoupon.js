import React, { useState, useRef, useEffect } from "react";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import OfferDetails from "./OfferDetails";

import "./coupon.css";
import { useHistory } from "react-router";
import CouponService from "../Service/CouponService";
import AddUsers from "./AddUsers";

const initialState = {
  code: "",
  maxQuantityPerUser: 1,
  maxTotalUsage: 1,
  type: "Flat",
  validFrom: "",
  validTo: "",
  discountAmount: 0,
  price: null,
  includeWithOtherCoupon: false,
  applicable: null,
  status: "OPEN",
  usage: null,
  totalUsed: null,
  user: {
    userName: "",
    userId: "",
  },
};
function NewCoupon() {
  const history = useHistory();
  const toast = useRef(null);

  const [loading, setLoading] = useState(true);
  const [offerDetails, setOfferDetails] = useState(initialState);

  const couponService = new CouponService();
  useEffect(() => {
    if (loading) {
      resetForm();
    }
  }, [loading]);

  const resetForm = () => {
    const hour = 3;
    const start = new Date();
    const end = new Date();
    end.setTime(end.getTime() + hour * 60 * 60 * 1000);

    setOfferDetails({
      ...initialState,
      validFrom: start,
      validTo: end,
    });
    setLoading(false);
  };

  const accept = () => {
    setLoading(true);
    // setOfferDetails(initialState);
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "Coupon Details Cleared",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "info",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };
  const clearCouponDetails = () => {
    confirmDialog({
      message: "Do you want to clear this record?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-warning",
      accept,
      reject,
    });
  };

  const handleSave = () => {
    couponService
      .createCoupon(offerDetails)
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: JSON.stringify(response.data),
        });
      })
      .catch((error) => {
        console.log(error.response);

        toast.current.show({
          severity: "error",
          summary: JSON.stringify(error.response),
        });
      });
  };
  return (
    <React.Fragment>
      <Toast ref={toast} />
      {!loading ? (
        <section className="p-mt-4">
          <h2 className="p-m-0 p-text-center">New Price Match Coupon</h2>

          <>
            <div className="p-grid">
              <div className="p-col-12 p-md-5 p-mx-auto">
                <OfferDetails
                  offerDetails={offerDetails}
                  setOfferDetails={setOfferDetails}
                />
              </div>
              <div className="p-col-12 p-md-7 p-mx-auto">
                <AddUsers coupon={offerDetails} />
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
                  onClick={() => clearCouponDetails()}
                  className="p-button-help p-mx-2"
                  label="Reset"
                />
                <Button
                  onClick={() => handleSave()}
                  className="p-button-success p-mx-2"
                  label="Save"
                />
              </div>
            </div>
          </>
        </section>
      ) : (
        <h1>Loading</h1>
      )}
    </React.Fragment>
  );
}

export default NewCoupon;
