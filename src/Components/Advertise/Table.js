import React, { useEffect, useRef, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Link } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";

import CustomBreadcrumbs from "../CustomBreadCrumbs";
import BannerService from "../Service/BannerService";
import { confirmPopup } from "primereact/confirmpopup";
import { useToast } from "../../hooks/useToast";
import { Dialog } from "primereact/dialog";
import AdvertiseService from "../Service/AdvertiseService";

const Table = () => {
  const [data, setData] = useState([]);
  const [selectedAdvertise, setSelectedAdvertise] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const toast = useToast(null);
  const dt = useRef(null);

  /* 
===============================================================	
OnSearchHandler functionality for retriving  data based on the search and values.
and get the data from api and then representing in the data table
================================================================
 */

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = () => {
    const advertiseService = new AdvertiseService();
    advertiseService.getAllAdvertisement().then((res) => {
      setData(res.data);
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Link
          to={`/advertise/edit/${rowData.id}`}
          className="custom-router-link"
        >
          <Button
            icon="pi pi-pencil"
            className="p-button-text p-button-warning p-p-0"
          />
        </Link>
        <Button
          icon="pi pi-trash"
          className="p-button-text p-button-danger p-p-0"
          onClick={() => confirmDeleteHomeTemplate(rowData)}
        />
      </React.Fragment>
    );
  };

  /* 
==============================================================	
Ask the confirmation to delete the data.
==============================================================
 */

  const confirmDeleteHomeTemplate = (rowData) => {};

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link to={`/advertise/new`} className="custom-router-link">
          <Button
            label="Add New Advertise"
            icon="pi pi-plus"
            className="p-button-info p-py-1"
          />
        </Link>
      </React.Fragment>
    );
  };
  function confirmStatusUpdate(bannerCode) {
    const bannerService = new BannerService();
    bannerService
      .deleteBannerCode(bannerCode)
      .then(() => {
        fetchData();
        toast({
          severity: "success",
          summary: "Updated Active Flag",
        });
      })
      .catch(() => {
        toast({
          severity: "error",
          summary: "Update Failed",
        });
      });
  }
  const confirm = (event, bannerCode) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to Update active status?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => confirmStatusUpdate(bannerCode),
    });
  };
  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          onClick={() => fetchData()}
          className="p-button-text p-button-info p-p-0"
          icon="fa fa-refresh"
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of Advertise</h3>
      <span className="p-input-icon-left p-d-none">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter}
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="p-py-1"
        />
      </span>
    </div>
  );
  const activeBodyTemplate = (row) => {
    const isActive = row.isActive === "Y";

    return (
      <Button
        onClick={(e) => confirm(e, row.bannerCode)}
        className={`p-button-text p-p-0 p-button-${
          !isActive ? "danger" : "success"
        }`}
        icon={!isActive ? "pi pi-times" : "pi pi-check-circle"}
      />
    );
  };
  const breadcrumbs = [
    {
      label: "Banners",
      path: "/banners",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  const advertiseCodeTemplate = (rowData) => {
    function openDialog() {
      setImage(rowData);
      setVisible(true);
    }
    return (
      <>
        <Button
          className="p-button-text p-p-0 "
          label={rowData.advertisementCode}
          onClick={openDialog}
        />
      </>
    );
  };
  const closeDialog = () => {
    setVisible(false);
    setImage(null);
  };

  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const advertiseImageBody = (rowData) => {
    return (
      <>
        <div style={{ width: "100px", height: "100px" }}>
          <img
            src={rowData.imageUrlPath}
            alt="poster of advertise"
            style={{ maxWidth: "100%", height: "100%" }}
          />
        </div>
      </>
    );
  };
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <Dialog header={image?.name} visible={visible} onHide={closeDialog}>
        {image && (
          <>
            <div>
              <img src={image.imageUrlPath} alt="advertised poster" />
            </div>
          </>
        )}
      </Dialog>
      <Toolbar
        className="p-p-2"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      {
        <DataTable
          value={data}
          ref={dt}
          selection={selectedAdvertise}
          onSelectionChange={(e) => setSelectedAdvertise(e.value)}
          header={header}
          globalFilter={globalFilter}
          dataKey="id"
          paginator
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Search Filters"
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50]}
          className="p-datatable-gridlines p-datatable-sm p-mt-1"
        >
          <Column
            field="advertisementCode"
            header="Code"
            sortable
            body={advertiseCodeTemplate}
            style={{ width: "12rem" }}
          />
          <Column field="name" header="Banner Name" sortable />
          <Column
            field="imageUrlPath"
            header="Advertise Image"
            body={advertiseImageBody}
            style={{ width: "10rem" }}
            sortable
          />
          <Column
            field="isActive"
            header="Is Active"
            sortable
            body={activeBodyTemplate}
            style={{ width: "7rem" }}
          />

          <Column body={actionBodyTemplate} style={{ width: "7rem" }} />
        </DataTable>
      }
    </>
  );
};

export default Table;
