import React from "react";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import NewCoupon from "./NewCoupon";

const AddNewCoupon = () => {
  const breadcrumbs = [
    {
      label: "Coupons",
      path: "/CoupensDashboard",
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: "New",
      path: "/CoupensDashboard/new",
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <NewCoupon />
    </>
  );
};

export default AddNewCoupon;
