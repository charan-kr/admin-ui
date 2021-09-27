import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CustomBreadcrumbs from "../CustomBreadCrumbs";
import NewCoupon from "./NewPromotion";
import Loading from "../Loading";

import PromotionsService from "../Service/PromotionsService";

const CopyPromotion = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) {
      const promotionService = new PromotionsService();
      promotionService
        .getPromotionById(id)
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
      label: "Promotions",
      path: "/promotions",
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `New ref(${id})`,
      path: `/promotions/copy/${id}`,
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

export default CopyPromotion;
