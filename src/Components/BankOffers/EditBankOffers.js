import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CustomBreadcrumbs from "../CustomBreadCrumbs";
import NewBankOffers from "./NewBankOffers";
import Loading from "../Loading";

import CouponService from "../Service/CouponService";

const CopyBankOffers = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const couponService = new CouponService();
  useEffect(() => {
    if (id) {
      couponService
        .getCouponById(id)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
        });
    }
  }, [id]); // eslint-disable-line
  const breadcrumbs = [
    {
      label: "Coupons",
      path: "/BankOffersDashboard",
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `Edit (${id})`,
      path: `/BankOffersDashboard/edit/${id}`,
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {loading ? <Loading /> : <NewBankOffers edit={true} data={data} />}
    </>
  );
};

export default CopyBankOffers;
