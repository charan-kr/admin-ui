import React, { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import IngestionService from "../../Service/IngestionService";
import { Divider } from "primereact/divider";
import { OverlayPanel } from "primereact/overlaypanel";
import Language from "./Language";
import { Button } from "primereact/button";
import IND from "../../../static/media/images/IND.png";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import Loading from "../../Loading";
import { InputSwitch } from "primereact/inputswitch";

const ProductInfo = ({ product, setVisible, compare, setCompare }) => {
  const [productDetails, setproductDetails] = useState(product);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const ingestionService = new IngestionService();
  const [keys, setKeys] = useState([]);
  const [loadingValue, setLoadingValue] = useState("loading");

  const op = useRef(null);
  const [confirmTranslationDialog, setConfirmTranslationDialog] =
    useState(false);

  useEffect(() => {
    const keys = [...Object.keys(productDetails)].filter(
      (key) =>
        typeof productDetails[key] !== "object" &&
        !["title", "description"].some((ele) => ele === key)
    );
    setKeys(keys);
  }, [productDetails]);

  const languageChange = (lan) => {
    setLoadingValue("loading");

    setLoading(true);
    op.current.hide();
    setSelectedLanguage(lan);

    ingestionService
      .getProductDetailsById(productDetails.productId, lan)
      .then((res) => {
        setproductDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };

  const translateProductDetails = () => {
    setLoadingValue("translating");
    setLoading(true);
    setConfirmTranslationDialog(false);
    ingestionService
      .getProductDetailsById(productDetails.productId, "en")
      .then((res) => {
        const productDetails = res.data;
        return productDetails;
      })
      .then((productDetails) => {
        ingestionService
          .getProductLanguageConfig()
          .then((res) => {
            const languageSettings = res.data;
            return languageSettings;
          })
          .then((languageSettings) => {
            const url =
              "http://localhost:5000/api/v1/cloudtranslate/productingestion";
            const data = {
              languageSettings: languageSettings,
              productData: productDetails,
              languages: [selectedLanguage],
            };
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            axios
              .post(url, data, config)
              .then((res) => {
                const body = res.data[selectedLanguage];

                ingestionService
                  .updateProductDetailsById(
                    product.productId,
                    selectedLanguage,
                    body
                  )
                  .then((res) => {
                    setLoading(false);
                    languageChange(selectedLanguage);
                    setConfirmTranslationDialog(false);
                  });
              })
              .catch((error) => {
                setLoading(false);
                console.log(error);
              });
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
      });
  };

  const dialogFooter = (
    <div className="p-d-flex p-ai-center p-jc-center" style={{ gap: "1rem" }}>
      <Button
        onClick={() => translateProductDetails()}
        className="p-button-primary p-py-1 p-px-3"
        label="Agree"
      />
      <Button
        onClick={() => setConfirmTranslationDialog(false)}
        className="p-button-secondary p-py-1 p-px-3"
        label="Cancel"
      />
    </div>
  );
  return (
    <>
      <Dialog
        position="top"
        footer={dialogFooter}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
        visible={confirmTranslationDialog}
        onHide={() => setConfirmTranslationDialog(false)}
        showHeader={false}
        focusOnShow={false}
      >
        <h3 className="p-text-center">
          Translate Product Language to {selectedLanguage}!
        </h3>
        <div className="p-text-center">
          <i className="fa fa-language fa-3x " style={{ color: "blue" }} />
        </div>
        <p className="p-mb-0 " style={{ lineHeight: 1.25, textIndent: "2rem" }}>
          Note that by clicking on <b>Agree</b> you will lose all the previous
          modification made with this language, and reset to{" "}
          <em>Google Cloud Api </em>
          translated copy
        </p>
      </Dialog>
      <OverlayPanel ref={op} className="p-pr-3" style={{ width: "16rem" }}>
        <Language
          op={op}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={languageChange}
        />
      </OverlayPanel>

      <div
        className="p-dialog-header p-px-0 p-pt-2"
        style={{ position: "sticky", top: "0", left: "0" }}
      >
        <div
          className="p-d-flex p-jc-between p-ai-center"
          style={{ width: "100%" }}
        >
          <div>
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
            <small style={{ color: "#999" }}>
              {selectedLanguage}
              <br />
              (Product Id: {productDetails.productId})
            </small>
          </div>
          <div className="p-d-flex p-ai-center p-jc-end">
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
            <i
              style={{ cursor: "pointer" }}
              onClick={() => setVisible(false)}
              className="pi pi-times fa-3x"
            ></i>
          </div>
        </div>
      </div>
      {loading ? (
        <Loading value={loadingValue} />
      ) : (
        <div className="p-grid">
          <div className="p-col">
            <div className="product-info">
              <div className="p-px-2">
                <div className="p-grid">
                  <div className="p-col p-p-0">
                    <div className="p-field">
                      <label htmlFor="title">Title</label>
                      <div className="p-inputgroup">
                        <span>{parse(productDetails.title + "")}</span>
                      </div>
                    </div>
                  </div>
                  {compare && (
                    <div className="p-col-6 p-p-0">
                      <div className="p-field">
                        <label htmlFor="title">Title</label>
                        <div className="p-inputgroup">
                          <span>{parse(product.title + "")}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-grid">
                  <div className="p-col p-p-0">
                    <div className="p-field">
                      <label htmlFor="description">Description</label>

                      <div className="p-inputgroup">
                        <span>{parse(productDetails.description + "")}</span>
                      </div>
                    </div>
                  </div>
                  {compare && (
                    <div className="p-col-6 p-p-0">
                      <div className="p-field">
                        <label htmlFor="description">Description</label>

                        <div className="p-inputgroup p-ml-2">
                          <span>{parse(product.description + "")}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>{" "}
                {keys.map((key) => (
                  <div key={key} className="p-grid">
                    <div className="p-col p-p-0">
                      <div className="p-grid">
                        <div className="p-col-4">
                          <label className="p-text-capitalize p-text-truncate">
                            {key === "manufacturerProductDescription"
                              ? "Manufacturer Description"
                              : key}
                          </label>
                        </div>
                        <div className="p-col-1">:</div>
                        <div className="p-col">
                          {key === "manufacturerProductDescription" ? (
                            <span>
                              {parse(
                                decodeURIComponent(
                                  escape(window.atob(productDetails[key]))
                                )
                              )}
                            </span>
                          ) : (
                            <span>
                              {parse(
                                productDetails[key]?.toString() || "Not Defined"
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {compare && (
                      <div className="p-col-6 p-p-0">
                        <div className="p-grid">
                          <div className="p-col-4">
                            <label className="p-text-capitalize">{key}</label>
                          </div>
                          <div className="p-col-1">:</div>
                          <div className="p-col">
                            <span>
                              {parse(product[key]?.toString() || "Not Defined")}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="">
                <div className="p-col p-p-0">
                  <div className="p-grid">
                    <div className="p-col-4">
                      <label className="p-text-capitalize">Tags</label>
                    </div>
                    <div className="p-col-1">:</div>
                    <div className="p-col">
                      <span>
                        {productDetails.tags?.map((tag) => (
                          <Tag
                            className="p-tag-rounded p-mb-1 p-mr-1 p-px-3"
                            severity="info"
                            value={tag}
                          />
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-grid">
                  <div className="p-col p-p-0">
                    <div className="p-grid">
                      <div className="p-col-4">
                        <label className="p-text-capitalize">
                          Display Attributes
                        </label>
                      </div>
                      <div className="p-col-1">:</div>
                      <div className="p-col">
                        <div>
                          {productDetails.displayAttributes?.map(
                            (attribute) => {
                              return (
                                <div className="p-field">
                                  <label>{attribute.displayName} </label>
                                  <p
                                    style={{ textIndent: "1.5rem" }}
                                    className="p-m-0"
                                  >
                                    {attribute.value}
                                  </p>
                                  <Divider className="p-mx-0 p-my-1" />
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {compare && (
                    <div className="p-col-6 p-p-0">
                      <div className="p-grid">
                        <div className="p-col-4">
                          <label className="p-text-capitalize">
                            Display Attributes
                          </label>
                        </div>
                        <div className="p-col-1">:</div>
                        <div className="p-col">
                          <div>
                            {product.displayAttributes?.map((attribute) => {
                              return (
                                <div className="p-field">
                                  <label>{attribute.displayName} </label>
                                  <p
                                    style={{ textIndent: "1.5rem" }}
                                    className="p-m-0"
                                  >
                                    {attribute.value}
                                  </p>
                                  <Divider className="p-mx-0 p-my-1" />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {compare && (
                  <div className="p-col-6 p-p-0">
                    <div className="p-grid">
                      <div className="p-col-4">
                        <label className="p-text-capitalize">Tags</label>
                      </div>
                      <div className="p-col-1">:</div>
                      <div className="p-col">
                        <span>
                          {product.tags?.map((tag) => (
                            <Tag
                              className="p-tag-rounded p-mb-1 p-mr-1 p-px-3"
                              severity="info"
                              value={tag}
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-grid">
                <div className="p-col p-p-0">
                  <div className="p-grid">
                    <div className="p-col-4">
                      <label className="p-text-capitalize">
                        Display Attributes
                      </label>
                    </div>
                    <div className="p-col-1">:</div>
                    <div className="p-col">
                      <div>
                        {productDetails.displayAttributes?.map((attribute) => {
                          return (
                            <div className="p-field">
                              <label>{attribute.displayName} </label>
                              <p
                                style={{ textIndent: "1.5rem" }}
                                className="p-m-0"
                              >
                                {attribute.value}
                              </p>
                              <Divider className="p-mx-0 p-my-1" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                {compare && (
                  <div className="p-col-6 p-p-0">
                    <div className="p-grid">
                      <div className="p-col-4">
                        <label className="p-text-capitalize">
                          Display Attributes
                        </label>
                      </div>
                      <div className="p-col-1">:</div>
                      <div className="p-col">
                        <div>
                          {product.displayAttributes?.map((attribute) => {
                            return (
                              <div className="p-field">
                                <label>{attribute.displayName} </label>
                                <p
                                  style={{ textIndent: "1.5rem" }}
                                  className="p-m-0"
                                >
                                  {attribute.value}
                                </p>
                                <Divider className="p-mx-0 p-my-1" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-grid">
                <div className="p-col p-p-0">
                  <div className="p-grid">
                    <div className="p-col-4">
                      <label className="p-text-capitalize">
                        Non Display Attributes
                      </label>
                    </div>
                    <div className="p-col-1">:</div>
                    <div className="p-col">
                      <div>
                        {productDetails.nonDisplayAttributes?.map(
                          (attribute) => {
                            return (
                              <div className="p-field">
                                <label>{attribute.displayName} </label>
                                <p
                                  style={{ textIndent: "1.5rem" }}
                                  className="p-m-0"
                                >
                                  {attribute.value}
                                </p>
                                <Divider className="p-mx-0 p-my-1" />
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {compare && (
                  <div className="p-col-6 p-p-0">
                    <div className="p-grid">
                      <div className="p-col-4">
                        <label className="p-text-capitalize">
                          Non Display Attributes
                        </label>
                      </div>
                      <div className="p-col-1">:</div>
                      <div className="p-col">
                        <div>
                          {product.nonDisplayAttributes?.map((attribute) => {
                            return (
                              <div className="p-field">
                                <label>{attribute.displayName} </label>
                                <p
                                  style={{ textIndent: "1.5rem" }}
                                  className="p-m-0"
                                >
                                  {attribute.value}
                                </p>
                                <Divider className="p-mx-0 p-my-1" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {selectedLanguage !== "en" && (
              <div
                className="p-d-flex p-jc-center p-ai-center"
                style={{ gap: "1rem" }}
              >
                <Button
                  className="p-button-info p-py-1 p-px-3"
                  label="Translate"
                  onClick={() => setConfirmTranslationDialog(true)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
