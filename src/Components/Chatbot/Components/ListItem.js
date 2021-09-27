import React, { useEffect } from "react";

import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Rating } from 'primereact/rating';

import { currencyFormatter } from "../../../utils/currencyFormatter";

const ListItem = ({ previousStep, triggerNextStep }) => {

  useEffect(() => {
    triggerNextStep()
  }, [triggerNextStep])

  const product = previousStep?.value[0]
  return (
    <>
      <div className="p-col-12">
        <div className="p-d-flex p-ai-center p-my -1">
          <div
            className="p-mx-2 p-d-flex"
            style={{
              width: "150px",
              height: "180px",
            }}
          >
            <img
              className="p-my-auto p-mx-5"
              src={product?.dvnWrapper.image.images[0].path}
              alt={product.imageUri}
            />
          </div>
          <div className="p-as-stretch p-mx-1" >
            <div>
              <a href="/p/1234" target='_blank' referrerPolicy='no-referrer'>
                <Button
                  style={{
                    padding: "0",
                    fontSize: "1.25rem",
                    fontWeight: "500",
                  }}
                  label={product?.dvnWrapper?.dvn.title || "product Name"}
                  className="p-button-text p-button-info p-text-left"
                ></Button>
              </a>
              <div className="p-mt-1">
                <Tag value="In Stock" severity="success" />
              </div>
              <div className="p-mt-1">
                <label htmlFor="">Reviews:{product?.reviewsAndRatings?.reviews}</label>
              </div>
              <div className="p-mt-1">
                <label>
                  Ratings:<Rating value={product?.reviewsAndRatings?.overAllRating} readOnly cancel={false} />
                </label>
              </div>
            </div>
            <div className="p-mt-1">
              <small>Sold by :</small>
              <code className="p-text-info p-mx-1">
                <b><small>{previousStep?.itemAttributes?.seller || "Seller"}</small></b>
              </code>
            </div>
          </div>

          <div className="p-as-start p-ml-auto">
            <strong>
              {currencyFormatter({
                currencyAmount: 14999,
                currencyUnit: "INR",
              })}
            </strong>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListItem
