import React, { useState, useEffect, useRef } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import AddDvnImages from "./AddDvnImages";
import ProductImages from "../shared/ProductImages";

import ImagesStageService from "../../../Service/ImagesStageService";

import { logo_360 } from "../../../../utils/ImagePath";
import CustomBreadcrumbs from "../../../CustomBreadCrumbs";
import { useToast } from "../../../../hooks/useToast";

function StageMedia(props) {
  const dvnId = props.match.params.id;
  const toast = useToast(null);
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [editPageDailog, setEditPageDailog] = useState(false);
  const [publishMediaDailog, setPublishMediaDailog] = useState(false);

  const dt = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const imagesStageService = new ImagesStageService();

  const [image, setImage] = useState([]);
  const statusDropdown = ["Published", "Not Published"];

  let originalRows = {};

  const dataTableFuncMap = {
    products: setProducts,
  };

  //featching the data from service to display list of images
  const featchingDataByDvnId = () => {
    imagesStageService
      .getStageMediaByDvnId(dvnId)
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

  //add file popup
  const closeProductDailog = (productDialog) => {
    setProductDialog(productDialog);
    featchingDataByDvnId();
    setImage([]);
  };

  let imagesListForView = [];
  // for view images like preview
  if (products.length > 1) {
    products.sort((a, b) => (a.view360 ? 1 : -1));
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

  const getStatusLabel = (status) => {
    if (status === "Published") {
      return "Published";
    } else {
      return "Not Published";
    }
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

  const onEditorValueChange = (productKey, props, value) => {
    let is_Reached_Max = false;

    if (props.field === "order") {
      is_Reached_Max = value <= products.length;

      if (props.field === "order" && is_Reached_Max) {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        dataTableFuncMap[`${productKey}`](updatedProducts);
      } else {
        alert("Reached out of the order ");
      }
    }
    if (props.field === "status") {
      let updatedProducts = [...props.value];
      updatedProducts[props.rowIndex][props.field] = value;
      dataTableFuncMap[`${productKey}`](updatedProducts);
    }
  };
  const publishMedia = () => {
    imagesStageService
      .updatePublishMedia(
        dvnId,
        selectedProducts.fileName,
        selectedProducts.status
      )
      .then((response) => {
        setPublishMediaDailog(false);
        toast({
          severity: "success",
          summary: "Successful",
          detail: response.data,
          life: 3000,
        });
        // setImage([]);
        // setTimeout(() => {
        //   history.push(`/ingestion/dvnIngestion/existingDvnMedia/${dvnId}`);
        // }, 2000);
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

  const hidepublishMediaDailog = () => {
    setPublishMediaDailog(false);
  };

  const reviewFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hidepublishMediaDailog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={publishMedia}
      />
    </React.Fragment>
  );

  const statusEditor = (productKey, props) => {
    return (
      <Dropdown
        value={props.rowData["status"]}
        options={statusDropdown}
        onChange={(e) => onEditorValueChange(productKey, props, e.value)}
        style={{ width: "100%" }}
        placeholder="Select a Status"
      />
    );
  };

  const view360BodyTemplate = (rowData) => {
    return (
      <div>
        {rowData !== undefined && rowData.view360 === true ? "true" : "false"}
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    if (rowData !== undefined) {
      return getStatusLabel(rowData.status);
    }
  };

  //open
  const openNew = () => {
    setProductDialog(true);
  };

  const viewImages = () => {
    setImage(products);
  };

  const hideDialog = () => {
    setProductDialog(false);
  };
  const hideEditDialog = () => {
    setEditPageDailog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deleteProduct = () => {
    imagesStageService
      .deleteStageMediaByFileNameAndDvnId(selectedProducts.fileName, dvnId)
      .then((response) => {
        setDeleteProductDialog(false);
        toast({
          severity: "success",
          summary: "Successful",
          detail: response.data,
          life: 3000,
        });
        setImage([]);

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

  const confirmPublish = (rowData) => {
    setSelectedProducts(rowData);
    setPublishMediaDailog(true);
  };
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Add Media"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
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

  const publishBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon=" pi pi-check-square"
          label=" Publish"
          className=" p-button-text	 p-button-success p-mr-2"
          onClick={() => confirmPublish(rowData)}
        />
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
      label: `Staging Media ( ${dvnId} )`,
      path: `/ingestion/dvnIngestion/stageMedia/${dvnId}`,
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <div>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      {image.length ? <ProductImages images={image} /> : null}
      <div className=" p-p-0 p-card">
        <Toolbar
          className="p-mb-4"
          left={leftToolbarTemplate}
          //right={rightToolbarTemplate}
        ></Toolbar>

        <div className="p-card">
          {products?.length ? (
            <div className="p-card">
              <DataTable
                ref={dt}
                value={products}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey={reload}
                className="p-datatable-gridlines"
                header={header}
                resizableColumns
                editMode="row"
                onRowEditInit={onRowEditInit}
                onRowEditCancel={onRowEditCancel}
              >
                {/*  <Column
            selectionMode="single"
            headerStyle={{ width: "3rem" }}
          ></Column> */}
                <Column
                  field="type"
                  header="Image/video"
                  sortable
                  /*   body={typeBodyTemplate}
            editor={(props) => typeEditor("products", props)} */
                ></Column>
                <Column
                  field="view360"
                  header="view360"
                  body={view360BodyTemplate}
                  //editor={(props) => view360Editor("products", props)}
                ></Column>

                <Column
                  header=" content"
                  field="content"
                  sortable
                  body={imageBodyTemplate}
                />
                <Column header=" File Name" field="fileName" sortable />

                <Column
                  header=" Status"
                  field="status"
                  sortable
                  body={statusBodyTemplate}
                  editor={(props) => statusEditor("products", props)}
                />
                <Column
                  rowEditor
                  headerStyle={{ width: "7rem" }}
                  bodyStyle={{ textAlign: "center" }}
                  header="Edit"
                  label="edit"
                ></Column>
                <Column header="Publish" body={publishBodyTemplate}></Column>
              </DataTable>
              {/* 
                                <Column header="Delete" body={actionBodyTemplate}></Column> */}
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
      >
        <AddDvnImages
          id={dvnId}
          count={products.length}
          productDialog={closeProductDailog}
          callBack={setReload}
        />
      </Dialog>
      <Dialog
        visible={editPageDailog}
        style={{ width: "900px" }}
        header="edit Details"
        modal
        className="p-fluid"
        onHide={hideEditDialog}
      ></Dialog>
      {/*  <Dialog
        visible={selectedImageDailog}
        style={{ width: "900px" }}
        modal
        className="p-fluid"
        onHide={hideDialogSelectedImage}
        footer={productDialogFooter}
      >
        <div
          style={{
            width: "100%",
            height: "350px",
          }}
          className="p-text-center p-col"
        >
          <img
            src={selectedImage}
            style={{ width: "100%" }}
            //onError={(e) => (e.target.src = Logo)}
          />
        </div>
      </Dialog>
      */}{" "}
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
          {selectedProducts && (
            <span>
              Are you sure you want to delete <b>{selectedProducts.fileName}</b>
              ?
            </span>
          )}
        </div>
      </Dialog>{" "}
      <Dialog
        visible={publishMediaDailog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={reviewFooter}
        onHide={hidepublishMediaDailog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {selectedProducts && (
            <span>
              Are you sure you want to publish{" "}
              <b>{selectedProducts.fileName}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default StageMedia;
