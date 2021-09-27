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
  useEffect(() => {
    if (id) {
      const couponService = new CouponService();
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
  }, [id]);
  const breadcrumbs = [
    {
      label: "BankOffers",
      path: "/BankOffersDashboard",
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `New ref(${id})`,
      path: `/BankOffersDashboard/copy/${id}`,
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {loading ? <Loading /> : <NewBankOffers edit={false} data={data} />}
    </>
  );
};

export default CopyBankOffers;
