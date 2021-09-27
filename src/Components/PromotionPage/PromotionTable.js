import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toolbar } from "primereact/toolbar";
import { Tag } from "primereact/tag";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { PromotionService } from "../Service/PromotionService";
import PromotionSetup from "./PromotionSetup";

import CustomBreadcrumbs from "../CustomBreadCrumbs";
const breadcrumbs = [
  {
    label: "Configuration",
    path: "/config",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "HomePage Config",
    path: "/hpconfig",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
];
const PromotionTable = () => {
  const [promotions, setPromotions] = useState([]);
  const [promotion, setPromotion] = useState(null);
  const [selectedPromotions, setSelectedPromotions] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const [deletePromotionDialog, setDeletePromotionDialog] = useState(false);
  const [deletePromotionsDialog, setDeletePromotionsDialog] = useState(false);
  const [visible, setVisible] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);
  const fuploader = useRef(null);
  const promotionService = new PromotionService();
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
  const savePromotion = (body) => {
    if (promotion.promotionOfferId) {
      promotionService
        .updatePromotionsuration(promotion.promotionOfferId, body)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: response.data,
          });
          getAllPromotions();
          setVisible(false);
        })
        .catch((error) => {
          console.log(error);
          toast.current.show({
            severity: "error",
            summary: JSON.stringify(error.response),
          });
        });
    } else {
      promotionService
        .addPromotionsData(body)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: response.data,
          });
          getAllPromotions();
          setVisible(false);
        })
        .catch((error) => {
          toast.current.show({
            severity: "error",
            summary: JSON.stringify(error.response),
          });
        });
    }
  };
  const handleEdit = (promotion) => {
    setPromotion(promotion);
    setVisible(true);
  };
  const handleClone = (promotion) => {
    const clonepromotion = promotion;
    delete clonepromotion.promotionOfferId;
    handleEdit(clonepromotion);
  };
  const hideDeleteProductDialog = () => {
    setDeletePromotionDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeletePromotionsDialog(false);
  };

  const confirmDeleteProduct = (promotion) => {
    setPromotion(promotion);
    setDeletePromotionDialog(true);
  };

  const deletePromotion = (promotion) => {
    promotionService
      .deletePromotionsDetailsById(promotion.promotionOfferId)
      .then((response) => {
        const updatedProduct = promotions.filter(
          (ele) => ele.promotionOfferId !== promotion.promotionOfferId
        );
        setPromotions(updatedProduct);
        setDeletePromotionDialog(false);
        setPromotion(null);
        toast.current.show({
          severity: "info",
          summary: JSON.stringify(response.data),
        });
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: JSON.stringify(error.response),
        });
      });
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeletePromotionsDialog(true);
  };

  const deleteSelectedProducts = () => {
    selectedPromotions.map((promotion, i) => {
      deletePromotion(promotion);
      return i;
    });
    setDeletePromotionsDialog(false);
  };
  const onHide = () => {
    setVisible(false);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          onClick={() => handleEdit(null)}
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2 p-py-1"
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger p-py-1"
          onClick={confirmDeleteSelected}
          disabled={!selectedPromotions || !selectedPromotions.length}
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

  const statusTemplate = (active) => {
    const status = {
      Y: "Active",
      N: "Inactive",
    };
    var severity = "secondary";
    switch (active) {
      case "Y":
        severity = "success";
        break;
      case "N":
        severity = "danger";
        break;
      default:
        break;
    }
    return (
      <Tag
        severity={severity}
        value={status[active] ? status[active] : "None"}
      />
    );
  };
  const statusBodyTemplate = (rowData) => {
    return <span>{statusTemplate(rowData.isActive)}</span>;
  };
  const validFromBodyTemplate = (rowData) => {
    return <span>{rowData?.promotionOfferValidFrom?.slice(0, 10)}</span>;
  };
  const validToBodyTemplate = (rowData) => {
    return <span>{rowData?.promotionOfferValidTo?.slice(0, 10)}</span>;
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="p-text-right">
        <Button
          onClick={() => handleClone(rowData)}
          icon="pi pi-copy"
          tooltip="clone"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-info"
        />

        <Button
          onClick={() => handleEdit(rowData)}
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mx-1"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">Promotions</h3>
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
        onClick={() => deletePromotion(promotion)}
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
    <div className="p-mt-4">
      <Dialog
        style={{ width: "40vw", minHeight: "60vh" }}
        visible={visible}
        onHide={() => onHide()}
      >
        <div style={{ height: "100%" }}>
          <PromotionSetup promotion={promotion} savePromotion={savePromotion} />
        </div>
      </Dialog>

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
          dataKey="promotionOfferId"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} promotions"
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-sm"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="promotionOfferEventName"
            header="Event Name"
            sortable
          ></Column>
          <Column
            field="promotionOfferType"
            header="Event Type"
            sortable
          ></Column>
          <Column
            field="promotionOfferValidFrom"
            header="Valid From"
            body={validFromBodyTemplate}
            sortable
          ></Column>
          <Column
            field="promotionOfferValidTo"
            header="Valid to"
            body={validToBodyTemplate}
            sortable
          ></Column>
          <Column
            field="promotionOfferValue"
            header="Offer Value"
            sortable
          ></Column>
          <Column
            headerStyle={{ width: "7rem" }}
            field="isActive"
            header="Active"
            body={statusBodyTemplate}
            sortable
          ></Column>

          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      <Dialog
        visible={deletePromotionDialog}
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
              Are you sure you want to delete event :{" "}
              <b>{promotion.promotionOfferEventName}</b> ?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deletePromotionsDialog}
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
          {selectedPromotions && (
            <span>
              Are you sure you want to delete the selected promotions?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default PromotionTable;
