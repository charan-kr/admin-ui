import React, { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import CustomBreadcrumbs from "../../CustomBreadCrumbs";

import SkuIngestionService from "../../Service/SkuIngestion";
import { useToast } from "../../../hooks/useToast";
import SkuInfo from "../SkuIngestion/SkuInfo";

const SkuIngestion = () => {
  const skuIngestionService = new SkuIngestionService();
  const toast = useToast();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteDailogBox, setDeleteDialogBox] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(false);
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState(null);
  const [fullView, setFullView] = useState(null)
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = () => {
    setLoading(true);
    skuIngestionService
      .getAllDskus()
      .then((res) => {
        console.log(res.data)
        setData(res.data);
        setLoading(false);
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

  const confirmDelete = (rowData) => {
    setSelectedProduct(rowData);
    setDeleteDialogBox(true);
  };
  const hideDeleteTemplate = () => {
    setDeleteDialogBox(false);
    setSelectedProduct(null);
  };

  const fullViewTemplate = (data) => {
    console.log(data)
    setFullView(data)
    setDisplay(true)
}
  
  const PriceConverter = (rowData) => {
    const {price} = rowData
    return (
      <div className='p-grid'>                                 
          <b>MRP:</b>
          {price?.mrp}                        
          <Button icon='fa fa-info-circle' className='p-button-text p-p-0 p-button-info p-text-end' onClick={() => fullViewTemplate(rowData.price)} />
      </div>       
    );
  };

  const handleProductInfoView = (rowData) => {
    console.log(rowData)
    setCompare(false);
    setInfo(rowData);
    setVisible(true);
  };
  
  const sellerIdTemplate = (rowData) => {
    return (
      <>
        <Button
          onClick={() => handleProductInfoView(rowData)}
          className="p-button-text p-p-0 p-button-info"
          label={rowData.sellerId}
        />
      </>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-text p-p-0"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger p-button-text p-p-0"
          onClick={() => confirmDelete(rowData)}
        />
      </React.Fragment>
    );
  };
  const DeleteSKUattributes = () => {
    skuIngestionService
      .deleteSKUDetailsById(selectedProduct.dskuid)
      .then((response) => {
        setData(data.filter((ele) => ele.dskuid !== selectedProduct.dskuid));
        hideDeleteTemplate();
        toast({
          severity: "info",
          summary: response.data,
          life: 3000,
        });
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

  const DeleteIngestionDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteTemplate}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={DeleteSKUattributes}
      />
    </React.Fragment>
  );

  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of SKU Configuration's</h3>
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

  const breadcrumbs = [
    {
      label: "SKU Ingestion",
      path: "/ingestion/skuIngestion",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];

  const [compare, setCompare] = useState(false);
  return (
    <div>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <Dialog
        className="ingestion"
        style={{ width: compare ? "80%" : "60%" }}
        focusOnShow={false}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <SkuInfo
          compare={compare}
          setCompare={setCompare}
          setVisible={setVisible}
          info={info}
        />
      </Dialog>
      <DataTable
        value={data}
        selection={selectedProduct}
        onSelectionChange={(e) => setSelectedProduct(e.value)}
        loading={loading}
        dataKey="sellerId"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        globalFilter={globalFilter}
        header={header}
        className="p-datatable-sm p-datatable-gridlines p-mt-0"
      >
        <Column selectionMode="single" headerStyle={{ width: "2rem" }} />
        <Column field="sellerId"
          header="Seller ID"
          body={sellerIdTemplate}
          className="p-text-truncate"          
        />
        <Column field="dskuid" header="DSKU ID" className="p-text-truncate" />       
        <Column field="commonName" header="Common Name" className="p-text-truncate" />
        <Column field="stock" header="stock" className="p-text-truncate" />
        <Column field="sellerSKUId" header="Seller SKU ID" className="p-text-truncate" />
        <Column field="price" header="Price" body={PriceConverter} />
        <Column field="status" header="status" />
        <Column
          header="Actions"
          body={actionBodyTemplate}
          style={{ width: "7rem" }}
        />
      </DataTable>
      <Dialog visible={display}
        header='Price details'
        style={{ width: '35vw' }}
        onHide={() => setDisplay(false)}>
        {
          fullView ?           
            (
              <div>
                <p>
          <b>MRP:</b>
          {fullView?.mrp}
        </p>
        <p>
          <b>Compare Price:</b>
          {fullView?.compareAtPrice}
        </p>
        <p>
          <b>Current Code:</b>
          {fullView?.currencyCode}
        </p>
        <p>
          <b>Selling Price:</b>
          {fullView?.sellingPrice}
        </p>
             </div>
           )
            :
            'Empty'
      }  
      
      </Dialog>      
      <Dialog
        visible={deleteDailogBox}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={DeleteIngestionDialogFooter}
        onHide={hideDeleteTemplate}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {selectedProduct && (
            <span>
              Are you sure you want to delete <b>{selectedProduct.dvnid}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default SkuIngestion;
