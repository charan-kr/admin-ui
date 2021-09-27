import React, { useState, useEffect, useRef } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import PromotionsService from "../Service/PromotionsService";
import { InputTextarea } from "primereact/inputtextarea";
import { Tooltip } from "primereact/tooltip";
import { Chip } from "primereact/chip";

export default function UserPromotionsTable() {
  const promotionService = new PromotionsService();
  
  const toast = useRef(null);
  const dt = useRef(null);
  const fuploader = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    getAllPromotions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getAllPromotions = () => {
    promotionService
      .getAllUserPromotions()
      .then((response) => {
        alert(JSON.stringify(response.data))
        setPromotions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of Customer Used Promotions</h3>
     {/*  <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputTextarea
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="p-py-1"
        />
      </span> */}
    </div>
  );
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
          target={`.tooltip-dis-${rowData.customerId}`}
          autoHide={false}
        >
          {convertsData(rowData.promoCode)}
          {rowData.promoCode.length > 6 && (
            <span style={{ color: "#222" }}>more..</span>
          )}
        </Tooltip>

        <Button
          className={`tooltip-dis-${rowData.customerId} p-button-text p-button-info p-py-0`}
          label={rowData.promoCode.length}
        />
      </span>
    );
  };
  return (
    <div>
    <h1>

    </h1>
  </div>);
}
