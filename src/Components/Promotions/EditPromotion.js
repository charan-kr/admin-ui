import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CustomBreadcrumbs from "../CustomBreadCrumbs";
import NewPromotion from "./NewPromotion";
import Loading from "../Loading";

import PromotionsService from "../Service/PromotionsService";

const EditPromotion = () => {
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
  }, [id]); //eslint-disable-line

  const breadcrumbs = [
    {
      label: "Promotions",
      path: "/promotions",
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `Edit (${id})`,
      path: `/promotions/edit/${id}`,
      icon: "",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {loading ? <Loading /> : <NewPromotion edit={true} data={data} />}
    </>
  );
};

export default EditPromotion;
