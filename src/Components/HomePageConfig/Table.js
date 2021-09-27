import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toolbar } from "primereact/toolbar";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { Link } from "react-router-dom";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import HomePageConfigService from "../Service/HomePageConifgService";
import { confirmPopup } from "primereact/confirmpopup";

const breadcrumbs = [
  {
    label: "HomePage Config",
    path: "/hpconfig",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
];
const Table = () => {
  const [products, setProducts] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const fuploader = useRef(null);

  useEffect(() => {
    getAllHomePageConfig();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getAllHomePageConfig = () => {
    HomePageConfigService.getAllHomePageConfig().then((response) => {
      setProducts(response.data);
    });
  };
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    HomePageConfigService.deleteHomePageConfigById(product.paletterId)
      .then((response) => {
        const updatedProduct = products.filter(
          (ele) => ele.paletterId !== product.paletterId
        );
        setProducts(updatedProduct);
        setDeleteProductDialog(false);
        setProduct(null);
        toast.current.show({
          severity: "info",
          summary: "Successful",
          detail: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.current.show({
          severity: "error",
          summary: error,
        });
      });
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));
    console.log(_products);
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Home Page Configuration's Deleted",
    });
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link to="/hpconfig/new" className="custom-router-link">
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
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          ref={fuploader}
          mode="basic"
          accept="images/*"
          maxFileSize={1000000}
          label="Import"
          chooseLabel="Import"
          className="p-mr-2 p-d-inline-block p-py-1"
        />
        <Button
          label="Import"
          icon="pi pi-plus"
          className="p-button-success p-py-1 p-d-none"
          onClick={() => fuploader.current.click()}
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help p-py-1"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  function confirmStatusUpdate(rowData) {
    HomePageConfigService.updateHomePageConfigStatus(
      rowData.paletterId,
      !rowData.isActive
    ).then(() => {
      getAllHomePageConfig();
      toast?.current?.show({
        severity: "success",
        summary: "Updated Active Flag",
      });
    });
  }
  function confirmDefaultUpdate(rowData) {
    HomePageConfigService.changeHomePageConfigDefault(
      rowData.paletterId,
      !rowData.isDefault
    ).then(() => {
      getAllHomePageConfig();
      toast?.current?.show({
        severity: "success",
        summary: "Updated Active Flag",
      });
    });
  }
  const confirmStatus = (event, rowData) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to Update active status?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => confirmStatusUpdate(rowData),
    });
  };
  const confirmDefault = (event, rowData) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to Update default?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => confirmDefaultUpdate(rowData),
    });
  };
  const statusBodyTemplate = (rowData) => {
    const active = rowData.isActive;
    const isDefault = rowData.isDefault;
    return (
      <span className="p-text-uppercase">
        <Button
          disabled={isDefault}
          onClick={(e) => confirmStatus(e, rowData)}
          className={`p-button-text p-p-0 p-button-${
            !active ? "danger" : "success"
          }`}
          icon={`pi pi-${!active ? "times" : "check-circle"}`}
        />
      </span>
    );
  };
  const defaultBodyTemplate = (rowData) => {
    const isDefault = rowData.isDefault;
    return (
      <span className="p-text-uppercase">
        <Button
          onClick={(e) => confirmDefault(e, rowData)}
          className={`p-button-text p-p-0 p-button-${
            !isDefault ? "danger" : "success"
          }`}
          icon={`pi pi-${!isDefault ? "times" : "check-circle"}`}
        />
      </span>
    );
  };
  const modifiedBodyTemplate = (rowData) => {
    return <span>{rowData?.modifiedOn?.slice(0, 10)}</span>;
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="p-text-right">
        <Link
          to={`/hpconfig/copy?ref=${rowData.paletterId}`}
          className="custom-router-link"
        >
          <Button
            icon="pi pi-copy"
            tooltip="clone"
            tooltipOptions={{ position: "bottom" }}
            className="p-button-text p-p-0 p-button-info"
          />
        </Link>

        <Link
          to={`/hpconfig/edit?ref=${rowData.paletterId}`}
          className="custom-router-link"
        >
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
      <h3 className="p-m-0">Home Page Configuration's</h3>
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
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
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
    <div className="datatable-crud-demo">
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
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="paletterId"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-sm"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "2.5rem" }}
          ></Column>
          <Column field="eventName" header="Name" sortable></Column>
          <Column field="configName" header="Config Name" sortable></Column>
          <Column field="createdBy" header="Created By" sortable></Column>
          <Column field="modifiedBy" header="Modified By" sortable></Column>
          <Column
            field="modifiedOn"
            header="Modified On"
            body={modifiedBodyTemplate}
            sortable
          ></Column>

          <Column
            headerStyle={{ width: "4rem" }}
            field="isActive"
            header="Active"
            body={statusBodyTemplate}
            bodyClassName="p-text-center"
          ></Column>
          <Column
            headerStyle={{ width: "4rem" }}
            field="isDefault"
            header="Default"
            body={defaultBodyTemplate}
            bodyClassName="p-text-center"
          ></Column>
          <Column
            body={actionBodyTemplate}
            headerStyle={{ width: "10rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={deleteProductDialog}
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
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
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
          {selectedProducts && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Table;
