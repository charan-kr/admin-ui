import React, { useState, useRef, useEffect } from "react";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import PromotionDetails from "./PromotionDetails";
import OfferDetails from "./OfferDetails";

import { useHistory } from "react-router";
import PromotionsService from "../Service/PromotionsService";
import AddUsers from "./AddUsers";

const initialState = {
  promotionDetails: {
    applicableLevel: null,
    applicableList: null,

    promoCode: "",
    message: "",
    maxQuantityPerUser: 0,
    maxTotalUsage: 0,
    description: "",
    usage: "General",
    includeWithOtherCoupon: "false",
    owner: "Dolphins",
    createdBy: "praneeth",
  },
  offerDetails: {
    offerName: "",
    type: "Flat",
    method: "Promotion",
    validFrom: "",
    validTo: "",
    percentage: null,
    allowedMaximumDiscount: 0,
    discountAmount: 0,
    minimumAmountOnCart: 0,
    price: null,
    applicable: null,
    status: "Inactive",
    totalUsed: 0,
  },
};
function NewPromotion({ edit = false, data = null }) {
  const history = useHistory();
  const toast = useRef(null);
  const [promotionDetails, setPromotionDetails] = useState(
    initialState.promotionDetails
  );
  const [offerDetails, setOfferDetails] = useState(initialState.offerDetails);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [proceed, setProceed] = useState(false);
  useEffect(() => {
    if (data) {
      const promotionDetails_ = {
        applicableLevel: data.applicableLevel,
        applicableList: data.applicableList,

        promoCode: data.promoCode,
        message: data.message,
        maxQuantityPerUser: data.maxQuantityPerUser,
        maxTotalUsage: data.maxTotalUsage,
        description: data.description,
        usage: data.usage,
        owner: data.owner,
        createdBy: data.createdBy,
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
        totalUsed: data.totalUsed,
      };
      setOfferDetails(offerDetails_);
      setPromotionDetails(promotionDetails_);
    }
  }, [data]);
  const promotionService = new PromotionsService();

  const accept = () => {
    setPromotionDetails(initialState.promotionDetails);
    setOfferDetails(initialState.offerDetails);
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "Promotion Details Cleared",
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
  const clearPromotionDetails = () => {
    confirmDialog({
      message: "Do you want to clear this record?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-warning",
      accept,
      reject,
    });
  };

  const handleSave = () => {
    const body = {
      ...offerDetails,

      ...promotionDetails,
      users: selectedUsers,
    };

    if (edit) {
      body.id = data.id;
      promotionService
        .updatePromotion(body)
        .then(() => {
          toast.current.show({
            severity: "success",
            summary: "Updated Promotion Details successfully",
          });
          setTimeout(() => {
            history.push("/promotions");
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
      alert(JSON.stringify(body));
      promotionService
        .createPromotion(body)
        .then(() => {
          toast.current.show({
            severity: "success",
            summary: "Created New Promotion Successfully",
          });
          setTimeout(() => {
            history.push("/promotions");
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
              coupon={{ ...promotionDetails, ...offerDetails }}
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
                <PromotionDetails
                  promotionDetails={promotionDetails}
                  setPromotionDetails={setPromotionDetails}
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
                  onClick={() => clearPromotionDetails()}
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

export default NewPromotion;
