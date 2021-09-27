import React from "react";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import NewCoupon from "./NewPromotion";

const AddNewPromotion = () => {
  const breadcrumbs = [
    {
      label: "Promotions",
      path: "/promotions",
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: "New",
      path: "/promotions/new",
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

export default AddNewPromotion;
