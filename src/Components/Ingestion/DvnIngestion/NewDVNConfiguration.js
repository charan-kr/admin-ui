import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import CustomBreadcrumbs from "../../CustomBreadCrumbs";
import Loading from "../../Loading";
import DVNCongifuration from "./DVNCongifuration";

import IngestionService from "../../Service/IngestionService";

const NewDVNConfiguration = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const ingestionService = new IngestionService();
  useEffect(() => {
    ingestionService
      .getProductDetailsById(productId, "en")
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }, [productId]); // eslint-disable-line react-hooks/exhaustive-deps

  const breadcrumbs = [
    {
      label: "DVN Ingestion",
      path: "/ingestion/dvnIngestion",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: "New",
      path: `/ingestion/dvnIngestion/new/${productId}`,
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {loading ? (
        <Loading />
      ) : !product ? (
        "Error Loading Product From Server"
      ) : (
        <DVNCongifuration product={product} productId={product.productId} />
      )}
    </>
  );
};

export default NewDVNConfiguration;
