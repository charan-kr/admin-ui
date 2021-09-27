import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DateAndTimeConverter } from "../Utilities/DateAndTimeConverter";

const promotionTypes = [
  { value: "priceOff", name: "PriceOff" },
  { value: "shipPrice", name: "Ship Price" },
  { value: "giftCoupon", name: "Gift Coupon" },
  { value: "points", name: "Points" },
  { value: "pricePerCost", name: "Price Per Cost" },
];
const initial = {
  promotionOfferEventName: "",
  promotionOfferType: "",
  promotionOfferValue: "",
  isActive: "Y",
  promotionOfferValidFrom: "",
  promotionOfferValidTo: "",
};
function NewPromotion(props) {
  const { handleSave, initialValues } = props;
  const dateObjectConverter = new DateAndTimeConverter();

  /* validation for all the fields.
	here all the fields are required */
  const validationSchema = Yup.object({
    promotionOfferEventName: Yup.string().required("Required"),
    promotionOfferType: Yup.string().required("Required"),
    promotionOfferValue: Yup.string().required("Required"),
    promotionOfferValidFrom: Yup.string().required("Required"),
    promotionOfferValidTo: Yup.string().required("Required"),
  });

  let today = new Date();
  let range = new Date();
  const formik = useFormik({
    initialValues,

    // form submit with validation
    onSubmit: (values) => {
      if (
        formik.values.promotionOfferValidFrom <=
        formik.values.promotionOfferValidTo
      ) {
        console.log("this is valid");
      } else {
        console.log("this is invalid");
        alert("To Date is invalid");
      }
      let finaljson = values;
      /* 	here  calaneder date converts to ' dd-mm-yyyy hh:mm time period(am/pm)'
       */
      finaljson.promotionOfferValidFrom =
        dateObjectConverter.convertDateAndTime(
          finaljson.promotionOfferValidFrom
        );
      /* 	here  calaneder date converts to ' dd-mm-yyyy hh:mm time period(am/pm)'
       */
      finaljson.promotionOfferValidTo = dateObjectConverter.convertDateAndTime(
        finaljson.promotionOfferValidTo
      );

      handleSave(finaljson);
    },

    validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="p-grid">
          <div className="p-col-12">
            <label>
              <b>Event Name</b>
            </label>
            <div className="p-field">
              <InputText
                name="promotionOfferEventName"
                onChange={formik.handleChange}
                value={formik.values.promotionOfferEventName}
                onBlur={formik.handleBlur}
                placeholder="Event Name"
                className="p-inputgroup"
              />
              <label className="p-d-block p-error p-invalid">
                {formik.touched.promotionOfferEventName &&
                formik.errors.promotionOfferEventName ? (
                  <div>{formik.errors.promotionOfferEventName}</div>
                ) : null}
              </label>
            </div>
          </div>
          <div className="p-col-12 p-md-6">
            <label>
              <b>Promotion Type</b>
            </label>

            <div className="p-field">
              <Dropdown
                id="promotionTypes"
                name="promotionOfferType"
                onChange={formik.handleChange}
                options={promotionTypes}
                optionLabel="name"
                value={formik.values.promotionOfferType}
                onBlur={formik.handleBlur}
                placeholder="Choose Offer Type"
                scrollHeight="160px"
                className="p-inputgroup"
              />
              <label className="p-d-block p-error p-invalid">
                {formik.touched.promotionOfferType &&
                formik.errors.promotionOfferType ? (
                  <div>{formik.errors.promotionOfferType}</div>
                ) : null}
              </label>
            </div>
          </div>

          <div className="p-col-12 p-md-6">
            <label>
              <b>Offer Value</b>
            </label>
            <div className="p-field">
              <InputText
                name="promotionOfferValue"
                onChange={formik.handleChange}
                value={formik.values.promotionOfferValue}
                onBlur={formik.handleBlur}
                placeholder="Enter Promotion value"
                className="p-inputgroup"
              />
              <label className="p-d-block p-error p-invalid">
                {formik.touched.promotionOfferValue &&
                formik.errors.promotionOfferValue ? (
                  <div>{formik.errors.promotionOfferValue}</div>
                ) : null}
              </label>
            </div>
          </div>

          <div className="p-col-12 p-md-6">
            <label>
              <b>Offer Starts From</b>
            </label>

            <div className="p-field">
              <Calendar
                id="time12"
                name="promotionOfferValidFrom"
                onChange={formik.handleChange}
                value={formik.values.promotionOfferValidFrom}
                dateFormat="dd-mm-yy"
                minDate={today}
                select="range"
                onBlur={formik.handleBlur}
                showTime
                placeholder="From date"
                hourFormat="12"
                className="p-inputgroup"
              />
              <label className="p-d-block p-error p-invalid">
                {formik.touched.promotionOfferValidFrom &&
                formik.errors.promotionOfferValidFrom ? (
                  <div>required</div>
                ) : null}
              </label>
            </div>
          </div>
          <div className="p-col-12 p-md-6">
            <label>
              <b>Offer Ends On</b>
            </label>
            <div className="p-field">
              <Calendar
                name="promotionOfferValidTo"
                onChange={formik.handleChange}
                value={formik.values.promotionOfferValidTo}
                select="range"
                dateFormat="dd-mm-yy"
                minDate={range}
                onBlur={formik.handleBlur}
                showTime
                hourFormat="12"
                placeholder="To date"
                className="p-inputgroup"
              />
              <label className="p-d-block p-error p-invalid">
                {formik.touched.promotionOfferValidTo &&
                formik.errors.promotionOfferValidTo ? (
                  <div>required</div>
                ) : null}
                {formik.values.promotionOfferValidFrom <=
                formik.values.promotionOfferValidTo ? (
                  <div></div>
                ) : (
                  <div>To Date is not less than From Date</div>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="p-d-flex p-jc-between">
          <div>
            <Button
              className="p-button-help p-mx-2"
              type="reset"
              onClick={() => formik.setValues(initial)}
              icon="fa fa-refresh"
              label="Reset"
            ></Button>
          </div>
          <div>
            <Button
              className="p-button-success"
              type="submit"
              label="Proceed"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewPromotion;
