import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

import ProductImages from "../shared/ProductImages";

import ImagesService from "../../../Service/ImagesService";

import { logo_360 } from "../../../../utils/ImagePath";
import CustomBreadcrumbs from "../../../CustomBreadCrumbs";
import { useToast } from "../../../../hooks/useToast";

const ExistingDvnMedia = (props) => {
  const dvnId = props.match.params.id;
  const toast = useToast(null);
  const [products, setProducts] = useState([]);

  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [editPageDailog, setEditPageDailog] = useState(false);
  const [reviewProductDialog, setReviewProductDialog] = useState(false);

  const dt = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const imagesService = new ImagesService();

  const [image, setImage] = useState([]);

  let originalRows = {};

  const dataTableFuncMap = {
    products: setProducts,
  };

  //featching the data from service to display list of images
  const featchingDataByDvnId = () => {
    imagesService
      .getAddedMediaToDVN(dvnId)
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
  const onEditorValueChange = (productKey, props, value) => {
    let is_Reached_Max = false;
    if (props.field === "order") {
      is_Reached_Max = value <= products.length;
    }
    if (is_Reached_Max) {
      let updatedProducts = [...props.value];
      updatedProducts[props.rowIndex][props.field] = value;
      dataTableFuncMap[`${productKey}`](updatedProducts);
    } else {
      alert(" Reached out of the ORDER NUMBER ");
    }
  };

  const orderEditor = (productKey, props) => {
    console.log(productKey);
    console.log(props);
    return (
      <InputNumber
        name="order"
        value={props.rowData["order"]}
        onValueChange={(e) => onEditorValueChange(productKey, props, e.value)}
      />
    );
  };

  const view360BodyTemplate = (rowData) => {
    return <div>{rowData.view360 === true ? "true" : "false"}</div>;
  };

  const orderBodyTemplate = (rowData) => {
    if (rowData !== undefined) {
      return rowData.order;
    }
  };
  const reOrder = () => {
    console.log(products);
    imagesService
      .updateOrdersOfDvns(dvnId, products)
      .then((response) => {
        toast({
          severity: "success",
          summary: "Success Message",
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
          detail: "Message Content",
          life: 3000,
        });
      });
  };
  //open

  const viewImages = () => {
    setImage(imagesListForView);
  };

  //hiding selected Image
  const hideDialog = () => {
    setProductDialog(false);
  };
  const hideEditDialog = () => {
    setEditPageDailog(false);
  };
  const confirmDeleteSelected = (rowData) => {
    setSelectedProducts(rowData);
    setDeleteProductDialog(true);
  };
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideReviewProductDialog = () => {
    setReviewProductDialog(false);
  };

  const deleteProduct = () => {
    imagesService
      .deleteAddedMediaByOrderAndDvnId(dvnId, selectedProducts.order)
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

  const reviewDVN = () => {
    imagesService
      .deleteFileByOrderAndDvnId(dvnId, selectedProducts.order)
      .then((response) => {
        setReviewProductDialog(false);
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

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link
          className="custom-router-link"
          to={`/ingestion/dvnIngestion/reviewMedia/${dvnId}`}
        >
          <Button
            label="Navigate To Publish"
            icon="pi pi-angle-double-left"
            className="p-button-success p-mr-2"
          />
        </Link>

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
  const reviewFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideReviewProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={reviewDVN}
      />
    </React.Fragment>
  );

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
          label="Re Order Media"
          //icon="pi pi-trash"
          className="p-button-success p-mr-2"
          onClick={reOrder}
          disabled={!products.length}
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
      label: `Exsisting Media ( ${dvnId} )`,
      path: `/ingestion/dvnIngestion/existingDvnMedia/${dvnId}`,
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
                //dataKey={reload}
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

                <Column header=" File Names" field="fileName" sortable />

                <Column
                  header=" content"
                  field="content"
                  sortable
                  body={imageBodyTemplate}
                />
                <Column
                  header=" Order"
                  field="order"
                  sortable
                  body={orderBodyTemplate}
                  editor={(props) => orderEditor("products", props)}
                />
                <Column
                  rowEditor
                  headerStyle={{ width: "7rem" }}
                  bodyStyle={{ textAlign: "center" }}
                  header="Edit"
                  label="edit"
                ></Column>
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
      >
        {/*  <AddDvnImages
          id={dvnId}
          count={products.length}
          productDialog={closeProductDailog}
          callBack={setReload}
        /> */}
      </Dialog>
      <Dialog
        visible={editPageDailog}
        style={{ width: "900px" }}
        header="edit Details"
        modal
        className="p-fluid"
        onHide={hideEditDialog}
      >
        {/*         <EditDvnImageConfig />
         */}{" "}
      </Dialog>
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
      </Dialog>
      <Dialog
        visible={reviewProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={reviewFooter}
        onHide={hideReviewProductDialog}
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
};

export default ExistingDvnMedia;
