import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";

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

import CouponService from "../Service/CouponService";
import { Tooltip } from "primereact/tooltip";
import { Chip } from "primereact/chip";

const breadcrumbs = [
  {
    label: "Coupons",
    path: "/CoupensDashboard",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
];
const CouponTable = () => {
  const { path } = useRouteMatch();
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [selectedCoupons, setSelectedCoupons] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [deleteCouponDialog, setDeleteCouponDialog] = useState(false);
  const [deleteCouponsDialog, setDeleteCouponsDialog] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);
  const couponService = new CouponService();
  useEffect(() => {
    getAllCoupons();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getAllCoupons = () => {
    couponService
      .getAllCoupons()
      .then((response) => {
        setCoupons(response.data);
        setSelectedCoupons(null);
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

  const confirmDeleteProduct = (coupon) => {
    setCoupon(coupon);
    setDeleteCouponDialog(true);
  };

  const deleteCoupon = (coupon) => {
    //if (coupon.status.toUpperCase() === "In") {
    couponService
      .deleteCoupon(coupon.id)
      .then((res) => {
        setCoupons(coupons.filter((ele) => ele.id !== coupon.id));
        handleToast("success", "Deleted!");
        setDeleteCouponDialog(false);
        setCoupon(null);
      })
      .catch((error) => {
        console.log(error.response);
        handleToast("error", "Failed to Delete");
      });
    /*  } else {
      handleToast("warn", "This coupon cannot be deleted");
    } */
  };

  const confirmDeleteSelected = () => {
    setDeleteCouponsDialog(true);
  };

  const deleteSelectedProducts = () => {
    selectedCoupons.forEach((coupon, i) => {
      deleteCoupon(coupon);
    });
    setDeleteCouponsDialog(false);
  };
  const handleToast = (severity, summary) => {
    toast.current.show({
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
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger p-py-1"
          onClick={confirmDeleteSelected}
          disabled={!selectedCoupons || !selectedCoupons.length}
        />
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    function updateStatus() {
      couponService
        .updateCouponStatus(rowData.id, rowData.status)
        .then(() => getAllCoupons())
        .catch((error) => {
          console.log(error.response);
        });
    }
    function statusTemplate(active) {
      var severity = "secondary";
      switch (active) {
        case "Active":
          severity = "success";
          break;
        case "Inactive":
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
          {rowData.applicableList?.length > 6 && (
            <span style={{ color: "#222" }}>more..</span>
          )}
        </Tooltip>

        <Button
          className={`tooltip-dis-${rowData.id} p-button-text p-button-info p-py-0`}
          label={rowData.applicableList?.length}
        />
      </span>
    );
  };
  const validFromBodyTemplate = (rowData) => {
    return <span>{rowData?.validFrom?.slice(0, 10)}</span>;
  };
  const validToBodyTemplate = (rowData) => {
    return <span>{rowData?.validTo?.slice(0, 10)}</span>;
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
      <h3 className="p-m-0">List of Coupons</h3>
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
        onClick={() => deleteCoupon(coupon)}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
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
          // right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={coupons}
          selection={selectedCoupons}
          onSelectionChange={(e) => setSelectedCoupons(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} coupons"
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-sm p-datatable-gridlines"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column filter field="offerName" header="Name" sortable></Column>
          <Column filter field="type" header="Type" sortable></Column>
          <Column
            filter
            header="Applicable Level"
            field="applicableLevel"
            sortable
          ></Column>
          <Column
            filter
            field="percentage"
            header="value"
            body={valueBodyTemplate}
            sortable
          ></Column>
          <Column
            filter
            header="Applicable List"
            body={displayApplicableTemplate}
            sortable
          ></Column>
          <Column filter field="couponCode" header="Code" sortable></Column>

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
            field="totalUsedPerOrder"
            // body={valueBodyTemplate}
            header="Max Total Usage"
            sortable
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
          {coupon && (
            <span>
              Are you sure you want to delete coupon : <b>{coupon.offerName}</b>{" "}
              ?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteCouponsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {selectedCoupons && (
            <span>Are you sure you want to delete the selected coupons?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default CouponTable;
