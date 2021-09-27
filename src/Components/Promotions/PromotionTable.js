import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";

import { useToast } from "../../hooks/useToast";

import { Chip } from "primereact/chip";
import { Tooltip } from "primereact/tooltip";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Tag } from "primereact/tag";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

import CustomBreadcrumbs from "../CustomBreadCrumbs";
import PromotionsService from "../Service/PromotionsService";
import AddPromotionUsers from "./AddPromotionUsers";

const breadcrumbs = [
  {
    label: "Promotions",
    path: "/promotions",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
];
const PromotionTable = () => {
  const { path } = useRouteMatch();
  const [promotions, setPromotions] = useState([]);
  const [promotion, setPromotion] = useState(null);
  const [selectedPromotions, setSelectedPromotions] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [deleteCouponDialog, setDeleteCouponDialog] = useState(false);
  const [deleteCouponsDialog, setDeleteCouponsDialog] = useState(false);

  const toast = useToast();
  const dt = useRef(null);
  const promotionService = new PromotionsService();
  useEffect(() => {
    getAllPromotions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getAllPromotions = () => {
    promotionService
      .getAllPromotions()
      .then((response) => {
        setPromotions(response.data);
        setSelectedPromotions(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hideDeleteProductDialog = () => {
    setDeleteCouponDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteCouponsDialog(false);
  };

  const confirmDeleteProduct = (promotion) => {
    setPromotion(promotion);
    setDeleteCouponDialog(true);
  };

  const deleteCoupon = (promotion) => {
    promotionService
      .deletePromotion(promotion.id)
      .then((res) => {
        setPromotions(promotions.filter((ele) => ele.id !== promotion.id));
        handleToast("success", "Deleted!");
        setDeleteCouponDialog(false);
        setPromotion(null);
      })
      .catch((error) => {
        console.log(error.response);
        handleToast("error", "Failed to Delete");
      });
  };

  const confirmDeleteSelected = () => {
    setDeleteCouponsDialog(true);
  };

  const handleToast = (severity, summary) => {
    toast({
      severity,
      summary,
    });
  };

  const onDateChange = (e) => {
    dt.current.filter(e.value, "date", "custom");
    setSelectedDate(e.value);
  };
  const filterDate = (value, filter) => {
    if (
      filter === undefined ||
      filter === null ||
      (typeof filter === "string" && filter.trim() === "")
    ) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return value === formatDate(filter);
  };

  const formatDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    return date.getFullYear() + "-" + month + "-" + day;
  };
  const dateFilter = (
    <Calendar
      value={selectedDate}
      onChange={onDateChange}
      dateFormat="yy-mm-dd"
      className="p-column-filter"
      placeholder="Date"
    />
  );
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link className="custom-router-link" to={`${path}/new`}>
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success p-mr-2 p-py-1"
          />
        </Link>
        {/*  <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger p-py-1"
          onClick={confirmDeleteSelected}
          disabled={!selectedPromotions || !selectedPromotions.length}
        /> */}
        <Button
          label="Add Users"
          icon="pi pi-plus"
          className="p-button-success p-mr-4 p-py-1"
          onClick={confirmDeleteSelected}
          disabled={
            !selectedPromotions ||
            (!selectedPromotions.length &&
              selectedPromotions.status === "Inactive")
          }
        />
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link className="custom-router-link" to={`${path}/detail`}>
          <Button
            label="Details"
            icon="pi pi-plus"
            className="p-button-success p-mr-2 p-py-1"
          />
        </Link>
      </React.Fragment>
    );
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
          target={`.tooltip-dis-${rowData.id}`}
          autoHide={false}
        >
          {convertsData(rowData.applicableList)}
          {rowData.applicableList.length > 6 && (
            <span style={{ color: "#222" }}>more..</span>
          )}
        </Tooltip>

        <Button
          className={`tooltip-dis-${rowData.id} p-button-text p-button-info p-py-0`}
          label={rowData.applicableList.length}
        />
      </span>
    );
  };
  const statusBodyTemplate = (rowData) => {
    function updateStatus() {
      promotionService
        .updatePromotionStatus(rowData.id, rowData.status)
        .then(() => getAllPromotions())
        .catch((error) => {
          console.log(error.response);
        });
    }

    function statusTemplate(active) {
      var severity = "secondary";
      switch (active.toLowerCase()) {
        case "active":
          severity = "success";
          break;
        case "inactive":
          severity = "danger";
          break;
        case "expired":
          severity = "warning";
          break;
        case "draft":
          severity = "info";
          break;
        default:
      }
      return (
        <div onClick={updateStatus}>
          <Tag
            className="p-text-capitalize"
            severity={severity}
            value={active}
          />
        </div>
      );
    }
    return <span>{statusTemplate(rowData.status)}</span>;
  };

  const validFromBodyTemplate = (rowData) => {
    return <span>{rowData?.validFrom?.slice(0, 10)}</span>;
  };
  const validToBodyTemplate = (rowData) => {
    return <span>{rowData?.validTo?.slice(0, 10)}</span>;
  };
  const usedBodyTemplate = (rowData) => {
    return (
      <span>
        {rowData?.totalUsed} of {rowData?.maxTotalUsage}
      </span>
    );
  };
  const valueBodyTemplate = (rowData) => {
    switch (rowData.type?.toLowerCase()) {
      case "flat":
        return <span>&#8377; {rowData?.discountAmount} off</span>;
      default:
        return <span>{rowData?.percentage}% off</span>;
    }
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="p-text-right">
        <Link className="custom-router-link" to={`${path}/copy/${rowData.id}`}>
          <Button
            icon="pi pi-copy"
            tooltip="clone"
            tooltipOptions={{ position: "bottom" }}
            className="p-button-text p-p-0 p-button-info"
          />
        </Link>
        <Link className="custom-router-link" to={`${path}/edit/${rowData.id}`}>
          <Button
            icon="pi pi-pencil"
            className="p-button-text p-p-0 p-button-warning p-mx-1"
          />
        </Link>
        <Button
          icon="pi pi-trash"
          className="p-button-text p-p-0 p-button-danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of Promotions</h3>
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

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => hideDeleteProductDialog()}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => deleteCoupon(promotion)}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <div>
        <Toolbar
          className="p-mb-1 p-p-1"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={promotions}
          selection={selectedPromotions}
          onSelectionChange={(e) => setSelectedPromotions(e.value)}
          dataKey="promoCode"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} promotions"
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-sm p-datatable-gridlines"
        >
          <Column
            selectionMode="single"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column filter field="offerName" header="Name" sortable></Column>
          <Column
            filter
            header="Applicable Level"
            field="applicableLevel"
            sortable
          ></Column>
          <Column
            filter
            header="Applicable List"
            body={displayApplicableTemplate}
            sortable
          ></Column>

          <Column filter field="type" header="Type" sortable></Column>
          <Column filter field="description" header="Message" sortable></Column>
          <Column filter field="promoCode" header="Code" sortable></Column>
          <Column
            filter
            field="maxQuantityPerUser"
            header="Max Quantity User"
            sortable
          ></Column>

          <Column
            filter
            header="valid From"
            body={validFromBodyTemplate}
            sortField="validFrom"
            sortable
            // filter
            filterElement={dateFilter}
            filterFunction={filterDate}
          ></Column>
          <Column
            header="Valid To"
            body={validToBodyTemplate}
            sortable
            sortField="validTo"
            filter
            filterElement={dateFilter}
            filterFunction={filterDate}
          ></Column>

          <Column
            filter
            body={valueBodyTemplate}
            header="Value"
            sortable
          ></Column>
          <Column
            filter
            sortField="totalUsed"
            body={usedBodyTemplate}
            header="Total Used"
          ></Column>
          <Column
            filter
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
          ></Column>

          <Column
            headerStyle={{ width: "9rem" }}
            body={actionBodyTemplate}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={deleteCouponDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {promotion && (
            <span>
              Are you sure you want to delete promotion :{" "}
              <b>{promotion.offerName}</b> ?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteCouponsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <AddPromotionUsers
            promoCode={selectedPromotions?.promoCode}
            close={setDeleteCouponsDialog}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default PromotionTable;
