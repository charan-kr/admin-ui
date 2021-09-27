import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import ProductImages from "../shared/ProductImages";
import ImagesService from "../../../Service/ImagesService";

import { logo_360 } from "../../../../utils/ImagePath";
import CustomBreadcrumbs from "../../../CustomBreadCrumbs";
import { useToast } from "../../../../hooks/useToast";

function ImageServiceReview(props) {
  const dvnId = props.match.params.id;
  const toast = useToast(null);
  const [products, setProducts] = useState([]);
  const [publishMediaDailog, setAddMediaToDVNDailog] = useState(false);

  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [editPageDailog, setEditPageDailog] = useState(false);
  const [reviewProductDialog, setReviewProductDialog] = useState(false);

  const dt = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedDeleteProducts, setSelectedDeleteProducts] = useState(null);

  const imagesService = new ImagesService();

  const [image, setImage] = useState([]);

  let originalRows = {};

  const hideAddToDvnDailog = () => {
    setAddMediaToDVNDailog(false);
  };

  const confirmToAddDVN = (rowData) => {
    setAddMediaToDVNDailog(true);
  };

  //featching the data from service to display list of images
  const featchingDataByDvnId = () => {
    imagesService
      .getFilesByDvnId(dvnId)
      .then((response) => {
        // setProducts(response.data);
        setProducts(response.data);
        toast({
          severity: "success",
          summary: "Success Message",
          detail: "Retrived Sucessfully",
          life: 3000,
        });
      })
      .catch((error) => {
        toast({
          severity: "error",
          summary: "Error Message",
          detail: "Message Content",
          life: 3000,
        });
      });
  };

  useEffect(() => {
    featchingDataByDvnId();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let imagesListForView = [];
  // for view images like preview
  if (products.length > 1) {
    products.sort((a, b) => (a.order > b.order ? 1 : -1));
    products.forEach((element) => {
      imagesListForView.push(element);
    });
  } else {
    imagesListForView.push(products[0]);
  }

  //header
  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Images/Videos</h5>
    </div>
  );
  //editing functions

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...products[event.index] };
  };

  const onRowEditCancel = (event) => {
    let productsData = [...products];
    productsData[event.index] = originalRows[event.index];
    delete originalRows[event.index];

    setProducts(productsData);
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={
          !rowData.view360
            ? `data:image/jpeg;base64,${rowData.content}`
            : logo_360
        }
        className="product-image"
        alt={rowData.fileName}
      />
    );
  };

  const view360BodyTemplate = (rowData) => {
    return <div>{rowData.view360 === true ? "true" : "false"}</div>;
  };

  const viewImages = () => {
    setImage(imagesListForView);
  };

  const hideDialog = () => {
    setProductDialog(false);
  };
  const hideEditDialog = () => {
    setEditPageDailog(false);
  };
  const confirmDeleteSelected = (rowData) => {
    setSelectedDeleteProducts(rowData);
    setDeleteProductDialog(true);
  };
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };
  const hideAddToDvnDialog = () => {
    setAddMediaToDVNDailog(false);
  };

  const deleteProduct = () => {
    imagesService
      .deleteFileByOrderAndDvnId(dvnId, selectedDeleteProducts.fileName)
      .then((response) => {
        setDeleteProductDialog(false);
        toast({
          severity: "success",
          summary: "Successful",
          detail: response.data,
          life: 3000,
        });
        setImage([]);
        setDeleteProductDialog(false);
        featchingDataByDvnId();
      })
      .catch((error) => {
        toast({
          severity: "error",
          summary: "Error Message",
          detail: error.response.data.message,
          life: 3000,
        });
      });
  };

  const addToDVN = () => {
    let finalJson = {
      dvnid: dvnId,
      imageList: selectedProducts,
      uploadedBy: "praneeth",
    };
    imagesService
      .addToDvn(finalJson)
      .then((response) => {
        setReviewProductDialog(false);
        toast({
          severity: "success",
          summary: "Successful",
          detail: response.data,
          life: 3000,
        });
        setImage([]);
        setAddMediaToDVNDailog(false);
        featchingDataByDvnId();
      })
      .catch((error) => {
        toast({
          severity: "error",
          summary: "Error Message",
          detail: error.response.data.message,
          life: 3000,
        });
      });
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="View Media"
          //icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={viewImages}
          disabled={!products.length}
        />
      </React.Fragment>
    );
  };
  //delete entire dvn
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
  const addToDvnFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideAddToDvnDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={addToDVN}
      />
    </React.Fragment>
  );
  const navigateToPublish = () => {
    props.history.push(`/dVNIngestion/existingDvnMedia/${dvnId}`);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          label=" Delete "
          className=" p-button-text	p-button-danger p-mr-2"
          onClick={() => confirmDeleteSelected(rowData)}
        />
      </React.Fragment>
    );
  };
  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label=" ADD to DVN"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={confirmToAddDVN}
          disabled={!products.length && !selectedProducts.length}
        />
        <Link
          className="custom-router-link"
          to={`/ingestion/dvnIngestion/existingDvnMedia/${dvnId}`}
        >
          <Button
            label=" Actual Dvn Files"
            icon="pi pi-angle-double-right"
            className="p-button-success p-mr-2"
            onClick={navigateToPublish}
          />
        </Link>
      </React.Fragment>
    );
  };
  const breadcrumbs = [
    {
      label: "DVN Ingestion",
      path: "/ingestion/dvnIngestion",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
    {
      label: `Review Media ( ${dvnId} )`,
      path: `/ingestion/dvnIngestion/reviewMedia/${dvnId}`,
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <div>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {image.length ? <ProductImages images={image} /> : null}
      <div className="card">
        <Toolbar
          className="p-mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
        <div>
          {products.length ? (
            <div>
              <DataTable
                ref={dt}
                value={products}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                // dataKey="id"
                className="p-datatable-gridlines"
                header={header}
                resizableColumns
                editMode="row"
                onRowEditInit={onRowEditInit}
                onRowEditCancel={onRowEditCancel}
              >
                <Column
                  selectionMode="multiple"
                  headerStyle={{ width: "3em" }}
                ></Column>

                <Column field="type" header="Image/video" sortable></Column>
                <Column
                  field="view360"
                  header="view360"
                  body={view360BodyTemplate}
                ></Column>

                <Column header=" File Names" field="fileName" sortable />

                <Column
                  header=" content"
                  field="content"
                  sortable
                  body={imageBodyTemplate}
                />
                <Column header="Delete" body={actionBodyTemplate}></Column>
              </DataTable>
            </div>
          ) : (
            <div className="p-grid p-justify-center">
              <p>No Data Found</p>
            </div>
          )}
        </div>
      </div>
      <Dialog
        visible={productDialog}
        style={{ width: "700px" }}
        header="Product Details"
        modal
        className="p-fluid"
        onHide={hideDialog}
      ></Dialog>
      <Dialog
        visible={editPageDailog}
        style={{ width: "900px" }}
        header="edit Details"
        modal
        className="p-fluid"
        onHide={hideEditDialog}
      ></Dialog>
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
          {selectedDeleteProducts && (
            <span>
              Are you sure you want to delete{" "}
              <b>{selectedDeleteProducts.fileName}</b>?
            </span>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={reviewProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={addToDvnFooter}
        onHide={hideAddToDvnDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {selectedProducts && (
            <span>
              Are you sure you want to publish &nbps
              <b>{selectedProducts.fileName}</b>?
            </span>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={publishMediaDailog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={addToDvnFooter}
        onHide={hideAddToDvnDailog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {selectedProducts && (
            <span>
              Are you sure you want to add to Actual DVN
              <b>{selectedProducts.fileName}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default ImageServiceReview;
