import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Chip } from "primereact/chip";
import { Tooltip } from "primereact/tooltip";

import CustomBreadcrumbs from "../../CustomBreadCrumbs";

import IngestionConfigurationService from "../../Service/IngestionConfigurationService";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.toast = React.createRef();

    this.state = {
      data: [],
      ingestionRowData: null,
      deleteDailogBox: false,
      selectedProduct: null,
      offLine: false,
      globalFilter: null,
      loading: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.IngestionConfigurationService = new IngestionConfigurationService();
    this.editAdminIngestion = this.editAdminIngestion.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

    this.DeleteIngestionAttributes = this.DeleteIngestionAttributes.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.addDvnAttributes = this.addDvnAttributes.bind(this);
  }
  handleClick() {
    this.props.history.push("/ingestion/ingestionConfig/new");
  }
  handleProductClick() {
    this.props.history.push(
      `/ingestion/ingestionConfig/addDVNProductIngestion/${this.state.selectedProduct}`
    );
  }
  addDvnAttributes() {
    this.props.history.push(
      `/ingestion/ingestionConfig/addDVNProductIngestion${this.state.selectedProduct}`
    );
  }
  editAdminIngestion(data) {
    this.props.history.push(
      `/ingestion/ingestionConfig/edit/${data.productAttributeKeysId}`
    );
  }
  fetchData() {
    this.IngestionConfigurationService.getAllIngestionConfiguration()
      .then((response) => {
        this.setState({
          data: response.data,
          loading: false,
        });
        this.toast.show({
          severity: "success",
          summary: "Retrvied successfully",
          life: 3000,
        });
      })
      .catch((error) => {
        this.setState((prevstate) => ({
          ...prevstate,
          loading: false,
        }));
      });
  }
  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.fetchData();
  }
  confirmDelete = (rowData) => {
    this.setState({
      ingestionRowData: rowData,
      deleteDailogBox: true,
    });
  };
  hideDeleteTemplate() {
    this.setState({ deleteDailogBox: false });
  }
  convertsData = (attributes) => {
    //alert(tag);
    return (
      <div>
        {attributes !== null ? (
          attributes.map((data) => {
            return <Chip label={data.key} className="p-m-1" />;
          })
        ) : (
          <span> NO ATTRIBUTES</span>
        )}
      </div>
    );
  };

  displayAttributeTemplate = (rowData) => {
    return (
      <span>
        <Tooltip
          id="config"
          position="bottom"
          target={`.tooltip-dis-${rowData.productAttributeKeysId}`}
          autoHide={false}
        >
          {this.convertsData(rowData.productDisplayAttributes.slice(0, 6))}
          {rowData.productDisplayAttributes.length > 6 && (
            <span style={{ color: "#222" }}>more..</span>
          )}
        </Tooltip>

        <Button
          className={`tooltip-dis-${rowData.productAttributeKeysId} p-button-text p-button-info p-py-0`}
          label={rowData.productDisplayAttributes.length}
        />
      </span>
    );
  };
  nonDisplayattributeTemplate = (rowData) => {
    return (
      <span>
        <Tooltip
          id="config"
          position="bottom"
          target={`.tooltip-${rowData.productAttributeKeysId}`}
          autoHide={false}
        >
          {this.convertsData(rowData.productNonDisplayAttributes?.slice(0, 6))}
          {rowData.productNonDisplayAttributes.length > 6 && (
            <span style={{ color: "#222" }}>more..</span>
          )}
        </Tooltip>

        <Button
          className={`tooltip-${rowData.productAttributeKeysId} p-button-text p-button-info p-py-0`}
          label={rowData.productNonDisplayAttributes.length}
        />
      </span>
    );
  };
  actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-text p-button-warning p-p-0"
          onClick={() => this.editAdminIngestion(rowData)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-danger p-button-text p-p-0"
          onClick={() => this.confirmDelete(rowData)}
        />
      </React.Fragment>
    );
  };
  DeleteIngestionAttributes() {
    let data = this.state.data.filter(
      (val) =>
        val.productAttributeKeysId !==
        this.state.ingestionRowData.productAttributeKeysId
    );
    this.IngestionConfigurationService.deleteProductConfigurationById(
      this.state.ingestionRowData.productAttributeKeysId
    )
      .then((response) => {
        this.setState({
          data,
          deleteDailogBox: false,
        });
        this.toast.show({
          severity: "success",
          summary: response.data,
          life: 3000,
        });
      })
      .catch((error) => {
        this.toast.show({
          severity: "error",
          summary: "Error Message",
          detail: error.response.data.message,
          life: 3000,
        });
      });
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <Button
          label="Add Ingestion Configuation"
          icon="pi pi-plus"
          className="p-py-1 p-button-info p-mr-2"
          onClick={this.handleClick}
        />
        {this.state.selectedProduct !== null ? (
          <Link
            to={{
              pathname: `/ingestion/ingestionConfig/addDVNProductIngestion`,
              product: this.state.selectedProduct,
            }}
            style={{ textDecoration: "none" }}
            disabled={this.state.selectedProduct === null}
          >
            <Button
              icon="pi pi-plus"
              className="p-button-primary p-py-1"
              label="Add DVN Attributes"
              disabled={this.state.selectedProduct === null}
              style={{ listStyle: "none" }}
            />
          </Link>
        ) : (
          <Button
            icon="pi pi-plus"
            className="p-button-warning p-py-1"
            label="Add DVN Attributes"
            disabled={this.state.selectedProduct === null}
          />
        )}
      </React.Fragment>
    );
  }
  configInfoTemplate = () => {
    const {
      type,
      category,
      subCategory,
      model,
      manufacturer,
      productNonDisplayAttributes,
      productDisplayAttributes,
    } = this.state.selectedProduct;
    return (
      <>
        <div className="p-grid p-mb-2">
          <div className="p-col-12 p-md-6 p-xl-4">
            <label>Type</label>
          </div>
          <div className="p-col p-text-uppercase">
            <span className="p-mx-3">:</span>
            {type}
          </div>
        </div>
        <div className="p-grid p-mb-2">
          <div className="p-col-12 p-md-6 p-xl-4">
            <label>Category</label>
          </div>
          <div className="p-col p-text-uppercase">
            <span className="p-mx-3">:</span>
            {category}
          </div>
        </div>
        <div className="p-grid p-mb-2">
          <div className="p-col-12 p-md-6 p-xl-4">
            <label>Sub Category</label>
          </div>
          <div className="p-col p-text-uppercase">
            <span className="p-mx-3">:</span>
            {subCategory}
          </div>
        </div>
        <div className="p-grid p-mb-2">
          <div className="p-col-12 p-md-6 p-xl-4">
            <label>Model</label>
          </div>
          <div className="p-col p-text-uppercase">
            <span className="p-mx-3">:</span>
            {model}
          </div>
        </div>
        <div className="p-grid p-mb-2">
          <div className="p-col-12 p-md-6 p-xl-4">
            <label>Manufacturer</label>
          </div>
          <div className="p-col p-text-uppercase">
            <span className="p-mx-3">:</span>
            {manufacturer}
          </div>
        </div>
        <div className="p-fluid p-p-2">
          <label>Display Attributes ({productDisplayAttributes?.length})</label>
          <div>{this.convertsData(productDisplayAttributes)}</div>
        </div>
        <div className="p-fluid p-p-2">
          <label>
            Non Display Attributes ({productNonDisplayAttributes?.length})
          </label>
          <div>{this.convertsData(productNonDisplayAttributes)}</div>
        </div>
      </>
    );
  };
  render() {
    const header = (
      <div className="p-d-flex p-jc-between">
        <h3 className="p-m-0">List of Ingestion Configuration</h3>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) =>
              this.setState((prevstate) => ({
                ...prevstate,
                globalFilter: e.target.value,
              }))
            }
            placeholder="Search..."
            className="p-py-1"
          />
        </span>
      </div>
    );
    const DATA = this.state.data;
    const DeleteIngestionDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteTemplate}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.DeleteIngestionAttributes}
        />
      </React.Fragment>
    );
    const breadcrumbs = [
      {
        label: "Ingestion Configuration",
        path: "/ingestion/ingestionConfig",
        icon: "fa fa-home",
        onlyIcon: false,
        showIcon: false,
      },
    ];
    return (
      <div className="">
        <Toast ref={(el) => (this.toast = el)} />
        <Dialog
          style={{ width: "50%" }}
          header={`${this.state.selectedProduct?.type} Configuration Info`}
          focusOnShow={false}
          visible={this.state.configInfoDialog}
          onHide={() =>
            this.setState((prevstate) => ({
              ...prevstate,
              configInfoDialog: false,
              selectedProduct: null,
            }))
          }
        >
          {this.state.selectedProduct && this.configInfoTemplate()}
        </Dialog>
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <div>
          <div>
            <Toolbar
              className="p-mb-1 p-p-2"
              left={this.leftToolbarTemplate}
            ></Toolbar>
            <DataTable
              value={DATA}
              selection={this.state.selectedProduct}
              onSelectionChange={(e) =>
                this.setState({ selectedProduct: e.value })
              }
              loading={this.state.loading}
              paginator
              dataKey="productAttributeKeysId"
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              globalFilter={this.state.globalFilter}
              header={header}
              className="p-datatable-sm p-datatable-gridlines p-mt-0"
              resizableColumns
            >
              <Column selectionMode="single" style={{ width: "3rem" }} />

              <Column
                field="type"
                header="Type"
                body={(rowData) => (
                  <Button
                    label={rowData.type}
                    className="p-button-text p-p-0"
                    onClick={() =>
                      this.setState((prevstate) => ({
                        ...prevstate,
                        selectedProduct: rowData,
                        configInfoDialog: true,
                      }))
                    }
                  />
                )}
                style={{ width: "7rem" }}
                bodyClassName="p-text-uppercase"
              />
              <Column
                field="category"
                header="Category"
                bodyClassName="p-text-uppercase"
              />
              <Column
                field="subCategory"
                header="Sub Category"
                bodyClassName="p-text-uppercase"
              />
              <Column
                field="model"
                header="Model"
                body={(rowData) => (
                  <span>
                    {rowData.model ? (
                      rowData.model
                    ) : (
                      <div style={{ color: "#999", textAlign: "center" }}>
                        - NA -
                      </div>
                    )}
                  </span>
                )}
                bodyClassName="p-text-uppercase1"
              />

              <Column
                field="manufacturer"
                header="Manufacturer"
                body={(rowData) => (
                  <span>
                    {rowData.manufacturer ? (
                      rowData.manufacturer
                    ) : (
                      <div style={{ color: "#999", textAlign: "center" }}>
                        - NA -
                      </div>
                    )}
                  </span>
                )}
                bodyClassName="p-text-uppercase1"
              />
              <Column
                field="productNonDisplayAttributes"
                header="Non Display Attributes"
                bodyClassName="p-text-center"
                body={this.nonDisplayattributeTemplate}
              />
              <Column
                field="productDisplayAttributes"
                header="Display Attributes"
                bodyClassName="p-text-center"
                body={this.displayAttributeTemplate}
              />

              <Column
                body={this.actionBodyTemplate}
                style={{ width: "7rem" }}
              />
            </DataTable>
          </div>
        </div>

        <Dialog
          visible={this.state.deleteDailogBox}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={DeleteIngestionDialogFooter}
          onHide={this.hideDeleteTemplate}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.ingestionRowData && (
              <span>
                Are you sure you want to delete{" "}
                <b>{this.state.ingestionRowData.productAttributeKeysId}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}
