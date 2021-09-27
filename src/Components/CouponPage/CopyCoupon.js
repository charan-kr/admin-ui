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
      label: "Coupons",
      path: "/CoupensDashboard",
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `New ref(${id})`,
      path: `/CoupensDashboard/copy/${id}`,
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {loading ? <Loading /> : <NewCoupon edit={false} data={data} />}
    </>
  );
};

export default CopyCoupon;
