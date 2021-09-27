import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CustomBreadcrumbs from "../CustomBreadCrumbs";
import NewCoupon from "./NewCoupon";
import Loading from "../Loading";

import CouponService from "../Service/CouponService";

const CopyCoupon = () => {
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
      path: "/CoupensDashboard",
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `Edit (${id})`,
      path: `/CoupensDashboard/edit/${id}`,
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {loading ? <Loading /> : <NewCoupon edit={true} data={data} />}
    </>
  );
};

export default CopyCoupon;
