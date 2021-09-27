import React, { useState, useRef, useEffect } from "react";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import CouponDetails from "./CouponDetails";
import OfferDetails from "./OfferDetails";

import { useHistory } from "react-router";
import CouponService from "../Service/CouponService";
import AddUsers from "./AddUsers";

const initialState = {
  couponDetails: {
    applicableLevel: null,
    applicableList: null,

    couponCode: "",
    description: "",
    maxQuantityPerUser: 0,
    maxTotalUsage: 0,
    usage: "General",
    includeWithOtherCoupon: "false",
    createdBy: "praneeth",
    owner: "Dolphins",
  },
  offerDetails: {
    offerName: "",
    type: "Flat",
    method: "Coupon",
    validFrom: "",
    validTo: "",
    percentage: null,
    allowedMaximumDiscount: 0,
    discountAmount: 0,
    minimumAmountOnCart: 0,
    price: null,
    applicable: null,
    status: "Inactive",
    totalUsedPerOrder: 0,
  },
};
const couponService = new CouponService();

function NewCoupon({ edit = false, data = null }) {
  const history = useHistory();
  const toast = useRef(null);
  const [couponDetails, setCouponDetails] = useState(
    initialState.couponDetails
  );
  const [offerDetails, setOfferDetails] = useState(initialState.offerDetails);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [proceed, setProceed] = useState(false);

  useEffect(() => {
    if (data) {
      const couponDetails_ = {
        applicableLevel: data.applicableLevel,
        applicableList: data.applicableList,

        promoCode: data.promoCode,
        couponCode: data.couponCode,
        description: data.description,
        maxQuantityPerUser: data.maxQuantityPerUser,
        maxTotalUsage: data.maxTotalUsage,
        createdBy: data.createdBy,
        usage: data.usage,
        owner: "Dolphins",
        includeWithOtherCoupon: data.includeWithOtherCoupon ? "true" : "false",
      };
      const offerDetails_ = {
        offerName: data.offerName,
        type: data.type,
        method: data.method,
        validFrom: data.validFrom,
        validTo: data.validTo,
        percentage: data.percentage,
        allowedMaximumDiscount: data.offerDetails,
        discountAmount: data.discountAmount,
        minimumAmountOnCart: data.minimumAmountOnCart,
        price: data.price,
        applicable: data.applicable,
        status: data.status,
        totalUsedPerOrder: data.totalUsedPerOrder,
      };
      setOfferDetails(offerDetails_);
      setCouponDetails(couponDetails_);
    }
  }, [data]);

  const accept = () => {
    setCouponDetails(initialState.couponDetails);
    setOfferDetails(initialState.offerDetails);
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
      description: "Do you want to clear this record?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-warning",
      accept,
      reject,
    });
  };

  const handleSave = () => {
    const body = { ...offerDetails, ...couponDetails, users: selectedUsers };

    if (edit) {
      body.id = data.id;
      couponService
        .updateCoupon(body, data.id)
        .then(() => {
          toast.current.show({
            severity: "success",
            summary: "Updated Coupon Details successfully",
          });
          setTimeout(() => {
            history.push("/CoupensDashboard");
          }, 2000);
        })
        .catch((error) => {
          console.log(error.response);

          toast.current.show({
            severity: "error",
            summary: JSON.stringify(error.response),
          });
        });
    } else {
      couponService
        .createCoupon(body)
        .then(() => {
          toast.current.show({
            severity: "success",
            summary: "Created New Coupon Successfully",
          });
          setTimeout(() => {
            history.push("/CoupensDashboard");
          }, 2000);
        })
        .catch((error) => {
          console.log(error.response);

          toast.current.show({
            severity: "error",
            summary: JSON.stringify(error.response),
          });
        });
    }
  };
  return (
    <React.Fragment>
      <Toast ref={toast} />
      <div>
        {proceed ? (
          <>
            <AddUsers
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              coupon={{ ...couponDetails, ...offerDetails }}
            />
            <div className="p-d-flex p-jc-between">
              <Button
                onClick={() => setProceed(false)}
                className="p-button-secondary p-mx-2"
                label="Previous"
              />
              <div>
                <Button
                  onClick={() => setSelectedUsers([])}
                  className="p-button-help p-mx-2"
                  icon="fa fa-refresh"
                  label="Reset Users"
                />
                <Button
                  onClick={() => handleSave()}
                  className="p-button-success p-mx-2"
                  label="Save"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="p-grid">
              <div className="p-col-12 p-md-6 p-mx-auto">
                <CouponDetails
                  couponDetails={couponDetails}
                  setCouponDetails={setCouponDetails}
                />
              </div>
              <div className="p-col-12 p-md-6 p-mx-auto">
                <OfferDetails
                  offerDetails={offerDetails}
                  setOfferDetails={setOfferDetails}
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
        )}
      </div>
    </React.Fragment>
  );
}

export default NewCoupon;
