import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import IngestionService from "../../Service/IngestionService";
import AddProductConfiguration from "./AddProductConfiguration";
import Language from "./Language";

import CustomBreadcrumbs from "../../CustomBreadCrumbs";

import IND from "../../../static/media/images/IND.png";
import Loading from "../../Loading";
import { InputSwitch } from "primereact/inputswitch";

const EditProductConfiguration = () => {
  const [loading, setLoading] = useState(true);

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [productEnglish, setProductEnglish] = useState(null);
  const ingestionService = new IngestionService();
  let { productId } = useParams();

  const breadcrumbs = [
    {
      label: "Product Ingestion",
      path: "/ingestion/productIngestion",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `Edit (${productId})`,
      path: `/ingestion/productIngestion/edit/${productId}`,
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  const [product, setProduct] = useState(null);
  useEffect(() => {
    var form = {};
    if (productId) {
      setLoading(true);
      op.current.hide();
      ingestionService
        .getProductDetailsById(productId, selectedLanguage)
        .then((res) => {
          const data = res.data;

          form = {
            manufacturer: data.manufacturer,
            model: data.model,
            brand: data.brand,
            description: data.description,
            categoryId: data.categoryId,
            subCategoryId: data.subCategoryId,
            selectedCategory: null,
            selectedSubCategory: null,
            disableSubCategory: false,
            tags: data.tags,
            title: data.title,
            uitemplate: data.uitemplate,
            productType: data.productType,
            productName: data.productName,
            selectedSearchValue: null,
            status: data.status,
            varient: data.productType === "Varient" ? "yes" : "no",
            displayAttributes: data.displayAttributes,
            nonDisplayAttributes: data.nonDisplayAttributes,
            optionsList: data.optionsList,
          };

          return form;
        })
        .then((form) => {
          ingestionService
            .getCategories()
            .then((data) => {
              const selectedCategory = data.find(
                (ele) => ele.categoryId === form.categoryId
              );
              form.category = data;
              form.selectedCategory = selectedCategory;

              return form;
            })
            .then((form) => {
              ingestionService
                .getSubCategories(form.selectedCategory)
                .then((res) => {
                  form.subCategory = res.data;
                  form.selectedSubCategory = res.data.find(
                    (ele) => ele.subCategoryId === form.subCategoryId
                  );
                  if (selectedLanguage === "en") setProductEnglish(form);
                  setProduct({ ...form, productId });
                  setLoading(false);
                });
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        });
    }
  }, [productId, selectedLanguage]); // eslint-disable-line react-hooks/exhaustive-deps
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
                src={IND}
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
            <AddProductConfiguration
              compare={compare}
              lang={selectedLanguage}
              product={product}
              edit={true}
            />
          </div>

          {compare && (
            <div className="p-col-6">
              <AddProductConfiguration
                product={productEnglish}
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

export default EditProductConfiguration;
