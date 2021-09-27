import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import ProductInfo from "./ProductInfo";
import Loading from "../../Loading";

import ProductIngestionService from "../../Service/ProductIngestionService";

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

  const productIngestionService = new ProductIngestionService();
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = () => {
    productIngestionService
      .getProductIngestionDetails()
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
        toast.current.show({
          severity: "success",
          summary: "Retrieved Data",
        });
      })
      .catch((error) => {
        setLoading(false);
        if (error.message === "Network Error") {
          // this.setState({
          //   offLine: true,
          // });
          toast.current.show({
            severity: "error",
            summary: "Network Error",
          });
        } else if (error.response) {
          toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: error?.response?.data?.message,
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
    productIngestionService
      .deleteIngestionProductConfigurationById(product.productId)
      .then((res) => {
        toast?.current?.show({
          severity: "info",
          summary: res?.data,
        });
        setProducts(
          products.filter((ele) => ele.productId !== product.productId)
        );
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

  const handleProductInfoView = (rowData) => {
    setCompare(false);
    setProduct(rowData);
    setVisible(true);
  };
  const productIdTemplate = (rowData) => {
    return (
      <>
        <Button
          onClick={() => handleProductInfoView(rowData)}
          className="p-button-text p-p-0 p-button-info"
          label={rowData.productId}
        />
      </>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        {!selectedProduct ? (
          <Link
            className="custom-router-link"
            to={`/ingestion/productIngestion/new`}
          >
            <Button
              className="p-button-info p-py-1"
              label="New Product Configuration"
              icon="fa fa-plus-circle"
            />
          </Link>
        ) : (
          <Link
            to={`/ingestion/dvnIngestion/new/${selectedProduct.productId}`}
            className="custom-router-link"
          >
            <Button
              label="Add DVN"
              icon="pi pi-plus"
              className="p-button-info p-py-1"
            />
          </Link>
        )}
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
          to={`/ingestion/productIngestion/edit/${rowData.productId}`}
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
      <h3 className="p-m-0">List of Product Configuration's</h3>
      <span className="p-input-icon-left">
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
        <ProductInfo
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
          dataKey="productId"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-sm p-datatable-gridlines p-mt-0"
        >
          <Column selectionMode="single" headerStyle={{ width: "2rem" }} />
          <Column
            body={productIdTemplate}
            field="productId"
            header="Product Id"
            headerStyle={{ width: "10rem" }}
          />
          {/* <Column field="title" header="Title" /> */}
          <Column field="productName" header="Product Name" />
          <Column field="category" header="Category" />

          <Column field="subCategory" header="Sub Category" />
          <Column field="brand" header="Brand" />
          <Column field="model" header="Model" />
          <Column field="manufacturer" header="Manufacturer" />
          <Column field="productType" header="Product Type" />
          <Column field="status" header="Status" body={statusBodyTemplate} />
          {/* <Column field="tags" header="tags" body={tagsBodyTemplate} /> */}
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
                Are you sure you want to delete <b>{product.productName}</b>?
              </span>
            </div>
          ))}
      </Dialog>
    </div>
  );
};

export default Table;
