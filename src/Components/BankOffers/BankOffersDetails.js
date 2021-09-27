import React, { useEffect, useRef, useState } from "react";
import { MultiSelect } from "primereact/multiselect";

import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";

import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import CouponService from "../Service/CouponService";
import ApplicableTable from "./ApplicableDetails/ApplicableTable";
import { Link, useRouteMatch } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import Form from "./ApplicableDetails/ApplicableDialog";
import Category from "./ApplicableDetails/ApplicableTypes/Category";
import SubCategory from "./ApplicableDetails/ApplicableTypes/SubCategory";
import ProductId from "./ApplicableDetails/ApplicableTypes/ProductId";
import DvnId from "./ApplicableDetails/ApplicableTypes/DvnId";
import DskuId from "./ApplicableDetails/ApplicableTypes/DskuId";
import { InputTextarea } from "primereact/inputtextarea";
import Includes from "./ApplicableDetails/ApplicableTypes/Includes";
import Excludes from "./ApplicableDetails/ApplicableTypes/Excludes";
import BankName from "./PaymentDetails/BankName";
import CardName from "./PaymentDetails/CardName";
import CardType from "./PaymentDetails/CardType";
import CardBins from "./PaymentDetails/CardBins";

function BankOffersDetails({ reset, bankDetails, setBankDetails, paymentOptions, setPaymentOptions }) {
  const { path } = useRouteMatch();
  const couponService = new CouponService();

  // const [couponDetails, setCouponDetails] = useState(couponDetail);
  const [applicables, setApplicables] = useState([]);
  const [applicableDialog, setApplicableDialog] = useState(false);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [selecetdRow, setSelectedRow] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [dvnList, setDVNList] = useState([]);
  const [dskuList, setDskuList] = useState([]);
  const [productGroup, setProductGroup] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    if (reset) {
      setBankDetails(bankDetails)
    }
  }, []);

  const handleApplicableDetails = (e) => {
    const { name, value } = e.target;
    setApplicableDialog(true)
    setBankDetails((prevstate) => ({
      ...prevstate,
      [name]: value,
    }))
  }
  const handlePaymentType = (e) => {
    const { name, value } = e.target;
    setTimeout(() => {
      setPaymentDialog(true)
    }, 2000);
    setBankDetails((prevstate) => ({
      ...prevstate,
      [name]: value,
    }))
  }

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prevstate) => ({ ...prevstate, [name]: value }));
  };
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setBankDetails((prevstate) => ({ ...prevstate, [name]: checked }));
  };

  const applicableLevelOptions = (applicableLevel) => {
    switch (applicableLevel) {
      case 'CATEGORY':
        return (
          <>
            <Includes value={bankDetails.include} onChange={handleBankDetailsChange} />
            <Excludes value={bankDetails.exclude} onChange={handleBankDetailsChange} />
          </>
        )
      case 'SUBCATEGORY':
        return (
          <>
            <Category value={subCategories} onChange={handleBankDetailsChange} />
            <Includes value={bankDetails.include} onChange={handleBankDetailsChange} />
            <Excludes value={bankDetails.exclude} onChange={handleBankDetailsChange} />
          </>
        )
      case 'PRODUCT':
        return (
          <>
            <Category value={subCategories} onChange={handleBankDetailsChange} />
            <SubCategory value={subCategories} onChange={handleBankDetailsChange} />
            <Includes value={bankDetails.include} onChange={handleBankDetailsChange} />
            <Excludes value={bankDetails.exclude} onChange={handleBankDetailsChange} />
          </>
        )
      case 'DVN':
        return (
          <>
            <Category value={subCategories} />
            <SubCategory value={subCategories} />
            <ProductId value={productList} option={productGroup} />
            <Includes value={bankDetails.include} />
            <Excludes value={bankDetails.exclude} />
          </>
        )
      case 'DSKU':
        return (
          <>
            <Category value={subCategories} />
            <SubCategory value={subCategories} />
            <ProductId value={productList} option={productGroup} />
            <DvnId value={dvnList} option={productGroup} />
            <Includes value={bankDetails.include} />
            <Excludes value={bankDetails.exclude} />
          </>
        )
      default:
        break
    }
  }
  const paymentTypeOptions = (paymentType) => {
    const { cardDetails, netBankingDetails } = paymentOptions
    if (paymentType.every(val => val === 'Cards')) {
      return (
        <>
          <BankName value={cardDetails.bankName} />
          <CardName value={cardDetails.cardProviderNames} />
          <CardType value={cardDetails.cardTypes} />
          <CardBins value={cardDetails.bins} />
        </>
      )
    }
    if (paymentType.every(val => val === 'NetBanking')) {
      return (
        <BankName value={netBankingDetails.bankName} />
      )
    }
    if (paymentType.includes('NetBanking', 'Cards')) {
      return (
        <>
          <h2 className='p-text-center p-m-0'>Card Details</h2>
          <Divider />
          <BankName />
          <CardName />
          <CardType />
          <CardBins />
          <h2 className='p-text-center p-m-0'>Net Banking</h2>
          <Divider />
          <BankName />
        </>
      )
    }

  }

  return (
    <React.Fragment>
      <Toast ref={toast}></Toast>
      <div className="p-mx-2 ">
        <div style={{ borderBottom: "4px solid #bbb", color: "#ccc" }}>
          <h3 className="p-m-0 p-text-uppercase p-px-2">Bank Offers Details</h3>
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
                  value={bankDetails.applicableLevel}
                  options={["CATEGORY", "SUBCATEGORY", "PRODUCT", "DVN", "DSKU"]}
                  placeholder="Select Applicable Level"
                  name="applicableLevel"
                  onChange={handleApplicableDetails}
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          {bankDetails.applicableLevel &&
            <Dialog
              header='Applicable On'
              style={{ width: "500px" }}
              visible={applicableDialog}
              onHide={() => setApplicableDialog(false)}
              focusOnShow={false}
            >
              {applicableLevelOptions(bankDetails.applicableLevel)}
              <div className=" p-ai-center p-jc-end p-d-flex">
                <Button
                  className="p-button-success p-py-1"
                  label="Save"
                  icon="pi pi-save"
                />
              </div>
            </Dialog>
          }
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="promoCode">Applicable details Table</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex ">
                <span className="colen">:</span>
                <Link className="custom-router-link" to={`${path}/ApplicableConfig`}>
                  <Button
                    label='View & Edit table'
                    className="p-inputgroup"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="eligiblePaymentType">Eligible payment type</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <MultiSelect value={bankDetails.eligiblePaymentType}
                  name='eligiblePaymentType'
                  options={["Cards", "NetBanking"]} onChange={handlePaymentType}
                  placeholder="Select Payment Type"
                  display="chip" />
              </div>
            </div>
          </div>
          {bankDetails.eligiblePaymentType.length ?
            <Dialog
              header='Payment details'
              style={{ width: "500px" }}
              visible={paymentDialog}
              onHide={() => setPaymentDialog(false)}
              focusOnShow={false}
            >
              {paymentTypeOptions(bankDetails.eligiblePaymentType)}
              <div className=" p-ai-center p-jc-end p-d-flex">
                <Button
                  className="p-button-success p-py-1"
                  label="Save"
                  icon="pi pi-save"
                />
              </div>
            </Dialog>
            : null
          }
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="code">Include with gift cards</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <div className="p-formgroup-inline">
                  <div className="p-field-checkbox">
                    <Checkbox inputId="includedWithGiftCard"
                      name="includedWithGiftCard"
                      checked={bankDetails.includedWithGiftCard}
                      onChange={(e) => handleCheck(e)} />
                    <label htmlFor="includedWithGiftCard">{bankDetails.includedWithGiftCard ? 'Yes' : 'No'}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="code">Used With Gift Cards</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <div className="p-formgroup-inline">
                  <div className="p-field-checkbox">
                    <Checkbox inputId="usedWithGiftCard"
                      name="usedWithGiftCard"
                      checked={bankDetails.usedWithGiftCard}
                      onChange={(e) => handleCheck(e)} />
                    <label htmlFor="usedWithGiftCard">{bankDetails.usedWithGiftCard ? 'Yes' : 'No'}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="code">Applicable With Other Offers</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <div className="p-formgroup-inline">
                  <div className="p-field-checkbox">
                    <Checkbox inputId="applicableWithOtherOffers"
                      name="applicableWithOtherOffers"
                      checked={bankDetails.applicableWithOtherOffers}
                      onChange={(e) => handleCheck(e)} />
                    <label htmlFor="applicableWithOtherOffers">{bankDetails.applicableWithOtherOffers ? 'Yes' : 'No'}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="code">Only FirstTime Transaction By Card</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <div className="p-formgroup-inline">
                  <div className="p-field-checkbox">
                    <Checkbox inputId="onlyFirstTimeTrasactionByCard"
                      name="onlyFirstTimeTrasactionByCard"
                      checked={bankDetails.onlyFirstTimeTrasactionByCard}
                      onChange={(e) => handleCheck(e)} />
                    <label htmlFor="onlyFirstTimeTrasactionByCard">{bankDetails.onlyFirstTimeTrasactionByCard ? 'Yes' : 'No'}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="message">
                Description
              </label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex p-ai-center">
                <span className="colen">:</span>
                <div className="p-inputgroup">
                  <InputTextarea
                    id="message"
                    name="description"
                    rows={3}
                    className="p-mr-2"
                    value={bankDetails.description}
                    onChange={(e) => handleBankDetailsChange(e)}
                    placeholder="10% discount on first time Bank of Baroda Mastercard Debit card, T&C applicable"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="sponser">Sponser</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <Dropdown
                  inputId="sponser"
                  value={bankDetails.sponser}
                  options={["Partner", "Dolphins"]}
                  onChange={handleBankDetailsChange}
                  placeholder="Select sponser"
                  name="sponser"
                  className="p-inputgroup"
                />
              </div>
            </div>
          </div>
          <div className="p-grid p-ai-center p-my-0">
            <div className="p-col-4">
              <label htmlFor="paymentType">Terms and Conditions</label>
            </div>
            <div className="p-col-8">
              <div className="p-d-flex">
                <span className="colen">:</span>
                <InputText
                  placeholder="Terms & Conditions"
                  name="termsAndConditions"
                  onChange={
                    handleBankDetailsChange
                  }
                  value={bankDetails.termsAndConditions}
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

export default BankOffersDetails;
