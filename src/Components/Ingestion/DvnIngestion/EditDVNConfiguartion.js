import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputSwitch } from "primereact/inputswitch";

import DVNCongifuration from "./DVNCongifuration";
import CustomBreadcrumbs from "../../CustomBreadCrumbs";
import Loading from "../../Loading";
import Language from "../../Language";

import IngestionService from "../../Service/IngestionService";

import { Ind_flag } from "../../../utils/ImagePath";

const EditDVNConfiguration = () => {
  const [loading, setLoading] = useState(true);

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const ingestionService = new IngestionService();
  let { dvnId } = useParams();

  const breadcrumbs = [
    {
      label: "Home",
      path: "/",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: "DVN Ingestion",
      path: "/ingestion/dvnIngestion",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `Edit (${dvnId})`,
      path: `/ingestion/dvnIngestion/edit/${dvnId}`,
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  const [product, setProduct] = useState(null);

  const [productEnglish, setProductEnglish] = useState(null);

  useEffect(() => {
    if (dvnId) {
      setLoading(true);
      op.current.hide();
      ingestionService
        .getDvnDetailsById(dvnId, selectedLanguage)
        .then((res) => {
          const data = res.data;
          console.log(data);
          if (selectedLanguage === "en") setProductEnglish(data);

          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
          setLoading(false);
        });
    }
  }, [dvnId, selectedLanguage]); // eslint-disable-line react-hooks/exhaustive-deps
  const op = useRef(null);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
  };
  const [compare, setCompare] = useState(false);

  return (
    <>
      <OverlayPanel ref={op} className="p-pr-3" style={{ width: "16rem" }}>
        <Language
          op={op}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={handleLanguageChange}
        />
      </OverlayPanel>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <div
        className="p-d-flex p-jc-end p-ai-center"
        style={{ width: "100%", marginTop: "-2rem" }}
      >
        {selectedLanguage !== "en" && (
          <div className="p-ai-center p-d-flex">
            <small>COMPARE</small>
            <InputSwitch
              className="p-mr-4 p-ml-1"
              checked={compare}
              onChange={(e) => setCompare(e.value)}
            />
          </div>
        )}
        <div>
          <span style={{ color: "#999" }}>{selectedLanguage}</span>
          <Button
            disabled={loading}
            className="p-button-text p-p-0 p-mr-2"
            onClick={(e) => op.current.toggle(e)}
            onMouseEnter={(e) => op.current.toggle(e)}
          >
            <div className="p-p-0 p-d-flex p-ai-end">
              <img
                style={{ width: "30px" }}
                className="flag-img"
                src={Ind_flag}
                alt={"flag"}
              />
              <i
                style={{ color: "#ddd" }}
                className="fa fa-caret-down p-mr-auto"
              />
            </div>
          </Button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : product ? (
        <div className="p-grid">
          <div className="p-col">
            <DVNCongifuration
              compare={compare}
              lang={selectedLanguage}
              productId={product.productId}
              dvn={product}
              edit={true}
            />
          </div>

          {compare && (
            <div className="p-col-6">
              <DVNCongifuration
                dvn={productEnglish}
                productId={product.productId}
                edit={true}
                compare={compare}
                readOnly={true}
              />
            </div>
          )}
        </div>
      ) : (
        "Loading Failed"
      )}
    </>
  );
};

export default EditDVNConfiguration;
