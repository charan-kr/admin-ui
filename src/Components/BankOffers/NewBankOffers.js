import React, { useState, useEffect } from "react";

import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import BankOffersDetails from "./BankOffersDetails";
import OfferDetails from "./OfferDetails";

import { useHistory } from "react-router";
import CouponService from "../Service/CouponService";
import { useToast } from "../../hooks/useToast";

const initialState = {
  bankDetails: {
    applicableLevel: '',
    eligiblePaymentType: [],
    offerDetails: {},
    include: [],
    exclude: [],
    includedWithGiftCard: false,
    usedWithGiftCard: false,
    applicableWithOtherOffers: false,
    onlyFirstTimeTrasactionByCard: false,
    description: '',
    sponser: '',
    termsAndConditions: '',
  },
  eligiblePayment: {
    cardDetails: {
      allowedOnAllCards: true,
      bankName: '',
      bins: [],
      cardProviderNames: [],
      cardTypes: [],
    },
    netBankingDetails: {
      bankName: ''
    }
  },
  offerDetails: {
    type: '',
    title: '',
    kind: '',
    startDate: '',
    endDate: '',
    flatDiscountAmount: 0,
    maxDiscountAmount: 0,
    minAmountInCart: 0,
    maxUsagePerUser: 0,
    maxUsage: 0,
    percentage: 0,
  },
};
const couponService = new CouponService();

function NewBankOffers({ edit = false, data = null }) {
  const history = useHistory();
  const toast = useToast();
  const [bankDetails, setBankDetails] = useState(
    initialState.bankDetails
  );
  const [paymentType, setPaymentType] = useState(
    initialState.eligiblePayment
  );
  const [offerDetails, setOfferDetails] = useState(initialState.offerDetails);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (data) {
      const couponDetails_ = {
        applicableLevel: data.applicableLevel,
        applicableList: data.applicableList,

        promoCode: data.promoCode,
        couponCode: data.couponCode,
        description: data.description,
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
        maxQuantityPerUser: data.maxQuantityPerUser,
        maxTotalUsage: data.maxTotalUsage,
        minimumAmountOnCart: data.minimumAmountOnCart,
        discountAmount: data.discountAmount,
        price: data.price,
        applicable: data.applicable,
        status: data.status,
        totalUsedPerOrder: data.totalUsedPerOrder,
      };
      setOfferDetails(offerDetails_);
      setBankDetails(couponDetails_);
    }
  }, [data]);

  const accept = () => {
    setBankDetails(initialState.bankDetails);
    setOfferDetails(initialState.offerDetails);
    toast({
      severity: "info",
      summary: "Confirmed",
      detail: "Bank offers fields Cleared",
      life: 3000,
    });
  };

  const reject = () => {
    toast({
      severity: "info",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };
  const clearCouponDetails = () => {
    setReset(true)
    confirmDialog({
      message: "Do you want to reset all fields ?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-warning",
      accept,
      reject,
    });
  };

  const handleSave = () => {
    const { cardDetails, netBankingDetails } = initialState.eligiblePayment
    const body = {
      applicableLevel: bankDetails.applicableLevel,
      eligiblePaymentType: bankDetails.eligiblePaymentType,
      include: bankDetails.include,
      exclude: bankDetails.exclude,
      includedWithGiftCard: bankDetails.includedWithGiftCard,
      conditions: {
        applicableWithOtherOffers: bankDetails.applicableWithOtherOffers,
        onlyFirstTimeTrasactionByCard: bankDetails.onlyFirstTimeTrasactionByCard,
        usedWithGiftCard: bankDetails.usedWithGiftCard,
      },
      offerDetails: {
        cardDetails,
        netBankingDetails
      },
      description: bankDetails.description,
      sponser: bankDetails.sponser,
      termsAndConditions: bankDetails.termsAndConditions,
      ...offerDetails
    };
    console.log(body, 'parent');
    return
    if (edit) {
      body.id = data.id;
      couponService
        .updateCoupon(body, data.id)
        .then(() => {
          toast({
            severity: "success",
            summary: "Updated Coupon Details successfully",
          });
          setTimeout(() => {
            history.push("/BankOffersDashboard");
          }, 2000);
        })
        .catch((error) => {
          console.log(error.response);

          toast({
            severity: "error",
            summary: JSON.stringify(error.response),
          });
        });
    } else {
      couponService
        .createCoupon(body)
        .then(() => {
          toast({
            severity: "success",
            summary: "Created New Coupon Successfully",
          });
          setTimeout(() => {
            history.push("/BankOffersDashboard");
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
      <div className="p-grid">
        <div className="p-col-12 p-md-6 p-mx-auto">
          <BankOffersDetails
            reset={reset}
            bankDetails={bankDetails}
            setBankDetails={setBankDetails}
            paymentOptions={paymentType}
            setPaymentOptions={setPaymentType}
          />
        </div>
        <div className="p-col-12 p-md-6 p-mx-auto">
          <OfferDetails
            offerDetails={offerDetails}
            setOfferDetails={setOfferDetails}
            reset={reset}
          />
        </div>
      </div>
      <div className="p-d-flex p-jc-between">
        <Button
          onClick={() => history.push('/BankOffersDashboard')}
          className="p-button-secondary p-mx-2"
          label="Cancel"
        />
        <div>
          {/* <Button
            onClick={() => clearCouponDetails()}
            className="p-button-help p-mx-2"
            label="Reset"
          /> */}
          <Button
            onClick={() => handleSave()}
            className="p-button-success p-mx-2"
            label="Save"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewBankOffers;
