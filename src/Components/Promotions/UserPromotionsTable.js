import React, { useState, useEffect } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import { Tooltip } from "primereact/tooltip";
import { Chip } from "primereact/chip";

import PromotionsService from "../Service/PromotionsService";

export default function UserPromotionsTable() {
  const promotionService = new PromotionsService();

  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    getAllPromotions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getAllPromotions = () => {
    promotionService
      .getAllUserPromotions()
      .then((response) => {
        setPromotions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const convertsData = (attributes) => {
    //alert(tag);
    return (
      <div>
        {attributes !== null ? (
          attributes.map((data) => {
            return <Chip label={data} className="p-m-1" />;
          })
        ) : (
          <span> NO ATTRIBUTES</span>
        )}
      </div>
    );
  };

  const displayApplicableTemplate = (rowData) => {
    return (
      <span>
        <Tooltip
          id="config"
          position="bottom"
          target={`.tooltip-dis-${rowData.userPromoId}`}
          autoHide={false}
        >
          {convertsData(rowData.promoCode)}
          {rowData.promoCode.length > 6 && (
            <span style={{ color: "#222" }}>more..</span>
          )}
        </Tooltip>

        <Button
          className={`tooltip-dis-${rowData.userPromoId} p-button-text p-button-info p-py-0`}
          label={rowData.promoCode.length}
        />
      </span>
    );
  };
  return (
    <div>
      <div>
        <DataTable value={promotions}>
          <Column
            field="customerId"
            filter
            sortable
            header="Customer Id"
          ></Column>
          <Column
            field="userPromoId"
            filter
            sortable
            header="User Promo Id"
          ></Column>
          <Column
            filter
            header="Coupons List"
            sortable
            body={displayApplicableTemplate}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
