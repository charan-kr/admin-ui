import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { Link } from "react-router-dom";
import IngestionService from "../../Service/IngestionService";
import DVNInfo from "./DVNInfo";
import Loading from "../../Loading";
const Table = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const [visible, setVisible] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);

  const ingestionService = new IngestionService();
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = () => {
    ingestionService
      .getAllDVNIngestion()
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
        toast?.current?.show({
          severity: "success",
          summary: "Retrvied successfully",
          life: 3000,
        });
      })
      .catch((error) => {
        setLoading(false);
        if (error?.message === "Network Error") {
          toast?.current?.show({
            severity: "error",
            summary: error?.message,
          });
        } else if (error.response) {
          toast?.current?.show({
            severity: "error",
            summary: error?.response?.data?.message,
          });
        }
      });
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
    setDeleting(false);
    setProduct(null);
  };
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };
  const deleteProduct = () => {
    setDeleting(true);
    ingestionService
      .deleteDVNIngestionlDetailsById(product.dvnid)
      .then((res) => {
        toast?.current?.show({
          severity: "info",
          summary: res?.data,
        });
        setProducts(products.filter((ele) => ele.dvnid !== product.dvnid));
        hideDeleteProductDialog();
      })
      .catch((error) => {
        toast?.current?.show({
          severity: "error",
          summary: error?.response?.data?.errorMessage,
        });
        hideDeleteProductDialog();
      });
  };

  const handleDVNInfoView = (rowData) => {
    setCompare(false);
    setProduct(rowData);
    setVisible(true);
  };
  const DvnIdTemplate = (rowData) => {
    return (
      <>
        <Button
          onClick={() => handleDVNInfoView(rowData)}
          className="p-button-text p-p-0 p-button-info"
          label={rowData.dvnid}
        />
      </>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="p-d-flex p-ai-center" style={{ gap: "1rem" }}>
          <Button
            className="p-button-primary p-py-1"
            disabled={!selectedProduct}
          >
            <Link
              className="custom-router-link"
              style={{ color: "#fff" }}
              to={`/ingestion/dvnIngestion/stageMedia/${selectedProduct?.dvnid}`}
            >
              <i className="fa fa-plus-circle p-mr-2"></i>
              <span>Stage DVN</span>
            </Link>
          </Button>

          <Button
            className="p-button-primary p-py-1"
            disabled={!selectedProduct}
          >
            <Link
              className="custom-router-link"
              style={{ color: "#fff" }}
              to={`/ingestion/dvnIngestion/existingDvnMedia/${selectedProduct?.dvnid}`}
            >
              <span>View Added DVN Images</span>
            </Link>
          </Button>
          <Button
            className=" p-button-primary p-py-1"
            disabled={!selectedProduct}
          >
            <Link
              className="custom-router-link"
              style={{ color: "#fff" }}
              to={`/ingestion/dvnIngestion/reviewMedia/${selectedProduct?.dvnid}`}
            >
              <span>Added Media</span>
            </Link>
          </Button>
        </div>
      </React.Fragment>
    );
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

  const statusBodyTemplate = (rowData) => {
    return <span className="p-text-uppercase">{rowData.status}</span>;
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Link
          to={`/ingestion/dvnIngestion/edit/${rowData.dvnid}`}
          className="custom-router-link"
        >
          <Button
            icon="pi pi-pencil"
            className="p-button-text p-p-0 p-button-warning"
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
      <h3 className="p-m-0">List of DVN Configuration's</h3>
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
        className="p-button-outlined p-button-danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

  const [compare, setCompare] = useState(false);
  return (
    <div>
      <Dialog
        className="ingestion"
        style={{ width: compare ? "80%" : "40%" }}
        focusOnShow={false}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <DVNInfo
          compare={compare}
          setCompare={setCompare}
          setVisible={setVisible}
          product={product}
        />
      </Dialog>
      <Toast ref={toast} />
      <div>
        <Toolbar
          className="p-mb-1 p-p-2"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={products}
          selection={selectedProduct}
          onSelectionChange={(e) => setSelectedProduct(e.value)}
          loading={loading}
          dataKey="dvnid"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-sm p-datatable-gridlines"
        >
          <Column selectionMode="single" headerStyle={{ width: "2rem" }} />
          <Column
            className="p-text-truncate"
            field="dvnid"
            header="DVN Id"
            body={DvnIdTemplate}
          />
          <Column
            field="productId"
            header="ProductId"
            className="p-text-truncate"
          />
          <Column field="upc" header="UPC" className="p-text-truncate" />
          <Column field="isbn" header="ISBN" className="p-text-truncate" />
          <Column field="ean" header="EAN" className="p-text-truncate" />
          <Column field="mpn" header="MPN" className="p-text-truncate" />
          <Column field="title" header="Title" className="p-text-truncate" />

          <Column field="type" header="Type" />
          <Column header="Status" body={statusBodyTemplate} />

          <Column body={actionBodyTemplate} />
        </DataTable>
      </div>

      <Dialog
        visible={deleteProductDialog}
        header="Confirm"
        modal
        focusOnShow={false}
        closable={false}
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        {product &&
          (deleting ? (
            <Loading value="Deleting" />
          ) : (
            <div className="confirmation-content p-d-flex p-ai-center">
              <i
                style={{ color: "darkorange" }}
                className="fa fa-exclamation-triangle p-mr-3 fa-3x"
              />
              <span>
                Are you sure you want to delete <b>{product.title}</b>?
              </span>
            </div>
          ))}
      </Dialog>
    </div>
  );
};

export default Table;
