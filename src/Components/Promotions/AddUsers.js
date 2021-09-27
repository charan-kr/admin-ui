import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";
import { convertStringToDate } from "../Utilities/DateAndTimeConverter/convertDateFormat";
import Logo from "../../static/media/images/title_image.png";
const AddUsers = (props) => {
  const { selectedUsers, coupon } = props;

  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);

  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of Users</h3>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="p-py-1"
        />
      </span>
    </div>
  );
  const promotionTemplate = () => {
    const validFrom = new Date(
      convertStringToDate(coupon.validFrom, "dd-MM-yyyy hh:mm a")
    );
    const validTo = new Date(
      convertStringToDate(coupon.validTo, "dd-MM-yyyy hh:mm a")
    );
    const today = new Date();
    console.log(coupon.validFrom, coupon.validTo, today);

    let expiry = null;
    let tag = "";
    if (today.getTime() > validFrom.getTime()) {
      expiry = (validTo.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      expiry = Math.floor(expiry);
      tag = `Expires in ${expiry} day${expiry > 1 ? "s" : ""}`;
    } else {
      expiry = (validFrom.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      expiry = Math.floor(expiry);
      tag = `Starts in ${expiry} day${expiry > 1 ? "s" : ""}`;
    }
    return (
      <div
        className="p-d-flex p-flex-column p-ai-center"
        style={{ height: "100%" }}
      >
        <div style={{ width: "150px", height: "150px" }}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={Logo}
            alt="alternative"
            onError={(e) => (e.target.src = Logo)}
          />
        </div>
        <div className="p-my-2 " style={{ width: "100%" }}>
          <Button
            // onClick={(e) => handleButtonClick(coupon)}
            // onClick={() => {
            //   handleCopyToClipBoard(coupon.code);
            // }}
            tooltip={"click to copy to clipboard"}
            tooltipOptions={{ position: "bottom" }}
            // disabled={isUsed}
            name={coupon.code}
            value={coupon.code}
            label={coupon.code}
            className="p-p-2 p-button-outlined p-button-secondary p-inputgroup"
            style={{
              border: "2px dashed #bbb",
            }}
          />
        </div>
        <div className="p-my-1">
          <p className="p-m-0 ">{coupon.message}</p>
        </div>

        <Button
          //   onClick={() => handleButtonClick(coupon)}
          //   disabled={isUsed}
          className={`p-button-success p-px-4 p-mb-1 p-mt-auto p-button-rounded p-inputgroup`}
          label="Use this coupon"
        />

        <Button
          style={{
            backgroundColor: "#ffccbb",
            color: "#ff0000",
          }}
          className="p-button-danger p-px-4 p-button-rounded p-inputgroup"
          label={tag}
        />
      </div>
    );
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="p-text-right">
        <Button
          style={{ width: "1rem", height: "1rem" }}
          icon="pi pi-trash p-p-0"
          className="p-button-text p-button-danger"
          //    onClick={() => confirmDeleteProduct(rowData)}
        />
      </div>
    );
  };
  return (
    <>
      <div className="p-grid" style={{ position: "relative" }}>
        <div
          className="p-col-4 p-md-3"
          style={{ position: "sticky", top: "6rem", height: "100%" }}
        >
          <h3 className="p-m-0">Preview</h3>
          <div
            className="p-card p-shadow-2"
            style={{ boxShadow: "0 2px 8px #999" }}
          >
            <div className="p-card-body">{promotionTemplate()}</div>
          </div>
        </div>
        <div className="p-col-8 p-mx-auto">
          <div className="p-card">
            <div className="p-card-body">
              <div className="p-field">
                <label className="p-d-block">Search User</label>
                <InputText
                  style={{ minWidth: "50%" }}
                  className="p-p-1 p-mr-2"
                  placeholder="UserName"
                />
                <Button className="p-py-1 p-px-4" label="Search" />
              </div>
            </div>
          </div>
          <div>
            <DataTable
              ref={dt}
              value={selectedUsers}
              //   selection={selectedCoupons}
              //   onSelectionChange={(e) => setSelectedCoupons(e.value)}
              //   dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
              globalFilter={globalFilter}
              header={header}
              className="p-datatable-sm"
            >
              <Column field="userName" header="Username" sortable />
              <Column field="customerSince" header="Customer Since" sortable />

              <Column style={{ width: "2rem" }} body={actionBodyTemplate} />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUsers;
