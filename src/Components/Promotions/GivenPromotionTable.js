import React from "react";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import UserPromotionsTable from "./UserPromotionsTable";

const GivenPromotionTable = () => {
  const breadcrumbs = [
    {
      label: "Promotions",
      path: "/promotions",
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <UserPromotionsTable />
    </>
  );
};

export default GivenPromotionTable;
