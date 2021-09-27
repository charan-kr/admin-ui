import React, { useEffect, useRef, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Link } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";

import CustomBreadcrumbs from "../CustomBreadCrumbs";
import BannerService from "./../Service/BannerService";
import { confirmPopup } from "primereact/confirmpopup";
import { useToast } from "../../hooks/useToast";
import { Dialog } from "primereact/dialog";
import ImageGroup from "./ImageGroup";

const Table = () => {
  const [data, setData] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState("");
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
    const bannerService = new BannerService();
    bannerService.getAllBanners().then((res) => {
      setData(res.data);
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Link to={`/banners/edit/${rowData.id}`} className="custom-router-link">
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
        <Link to={`/banners/new`} className="custom-router-link">
          <Button
            label="Create New Banners List"
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
      <h3 className="p-m-0">List of Banners</h3>
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
  const [banner, setBanner] = useState(null);
  const [visible, setVisible] = useState(false);
  const bannerCodeTemplate = (rowData) => {
    function openDialog() {
      setBanner(rowData);
      setVisible(true);
    }
    return (
      <>
        <Button
          className="p-button-text p-p-0 "
          label={rowData.bannerCode}
          onClick={openDialog}
        />
      </>
    );
  };
  const closeDialog = () => {
    setVisible(false);
    setBanner(null);
  };
  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <Dialog header={banner?.name} visible={visible} onHide={closeDialog}>
        <ImageGroup banner={banner} />
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
          selection={selectedBanner}
          onSelectionChange={(e) => setSelectedBanner(e.value)}
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
            field="bannerCode"
            header="Code"
            sortable
            body={bannerCodeTemplate}
            style={{ width: "12rem" }}
          />
          <Column field="name" header="Banner Name" sortable />
          <Column
            field="imageUrlPaths.length"
            header="No. of Images"
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
