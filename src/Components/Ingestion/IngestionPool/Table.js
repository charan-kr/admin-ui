import React, { Component } from "react";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar";

import CustomBreadcrumbs from "../../CustomBreadCrumbs";
import AddIngestionPool from "./AddIngestionPool";

import IngestionPoolService from "../../Service/IngestionPoolService";

export class IngestionPool extends Component {
  constructor(props) {
    super(props);
    this.toast = React.createRef();

    this.state = {
      editDailog: false,
      deleteDailogBox: false,
      selectedTempaltes: null,

      data: [],
      editData: { attributeId: null, key: null, displayName: null },
      loading: false,
      globalFilter: null,

      errors: {
        displayName: "",
      },
      offLine: false,
      visible: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.editPoolAttributeKey = this.editPoolAttributeKey.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveAttributePool = this.saveAttributePool.bind(this);
    this.confirmDeleteAttributeKey = this.confirmDeleteAttributeKey.bind(this);
    this.DeleteIngestionAttribute = this.DeleteIngestionAttribute.bind(this);
    //this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    this.hideDeleteAttributeDailog = this.hideDeleteAttributeDailog.bind(this);
    this.IngestionPoolService = new IngestionPoolService();
    this.fetchData = this.fetchData.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.CapitlizeString = this.CapitlizeString.bind(this);
    this.toCamelCase = this.toCamelCase.bind(this);
  }
  //exports csv
  exportCSV() {
    this.dt.exportCSV();
  }
  //navigate to edit page
  handleClick() {
    this.setState((prevState) => ({ ...prevState, visible: true }));
  }
  // confirm the delete attribute dailog
  confirmDeleteAttributeKey(deletedata) {
    this.setState({
      deleteDailogBox: true,
      editData: deletedata,
    });
  }
  // confirm the edit attribute dailog

  editPoolAttributeKey(emailvalues) {
    this.setState({
      editData: { ...emailvalues },
      editDailog: true,
    });
  }
  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-text p-p-0 p-button-warning"
          onClick={() => this.editPoolAttributeKey(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-text p-p-0 p-button-danger"
          onClick={() => this.confirmDeleteAttributeKey(rowData)}
        />
      </React.Fragment>
    );
  }

  //hide the delete attribute dailog
  hideDeleteAttributeDailog() {
    this.setState({ deleteDailogBox: false });
  }
  //hide edit dailog
  hideDialog() {
    this.setState({
      editDailog: false,
    });
  }
  //validation
  validateForm = (errors) => {
    let valid = true;
    let x = Object.values(errors);
    alert(JSON.stringify(x.length));
    x.length > 0 && (valid = false);

    return valid;
  };
  //converting the displayName to a camel case for key
  toCamelCase(str) {
    let arr = str.match(/[a-z]+|\d+/gi);
    return arr.map((m, i) => {
      let low = m.toLowerCase();
      if (i !== 0) {
        low = low.split("").map((s, k) => (k === 0 ? s.toUpperCase() : s))
          .join``;
      }
      return low;
    }).join``;
  }
  //converting the displayName to a capitalize

  CapitlizeString(word) {
    console.log(word);
    // return word.replace(/\b\w/g, (l) => l.tocapitalize());
    return word.replace(/\b\w/g, (l) => l.toUpperCase());
  }
  onInputChangeHandler(e, name) {
    let val = e.target.value;
    console.log("Values:" + val);
    let editData = { ...this.state.editData };
    val = this.CapitlizeString(val);

    let errors = this.state.errors;
    switch (name) {
      case "displayName":
        errors.displayName =
          val.length < 2 ? "key Name must be 2 characters long!" : "";

        break;

      default:
        break;
    }
    editData[`${name}`] = val;
    this.setState({ errors, editData });
  }

  //save method

  saveAttributePool() {
    this.IngestionPoolService.updateIngestionPool(
      this.state.editData.attributeId,
      {
        ...this.state.editData,
        key: this.toCamelCase(this.state.editData.displayName),
      }
    )
      .then((response) => {
        this.setState({
          editDailog: false,
          editData: this.state.editData,
        });
        this.fetchData();
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
  //delete the attribute from the pool
  DeleteIngestionAttribute() {
    let data = this.state.data.filter(
      (val) => val.attributeId !== this.state.editData.attributeId
    );
    this.IngestionPoolService.deleteIngestionPoolDetailsById(
      this.state.editData.attributeId
    )
      .then((response) => {
        this.setState({
          data: data,
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
  fetchData() {
    this.IngestionPoolService.getIngestionPoolDetails()
      .then((response) => {
        this.setState({
          data: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          this.setState({
            offLine: true,
          });
        } else if (error.response) {
          this.toast?.show({
            severity: "error",
            summary: "Error Message",
            detail: error.response.data.message,
            life: 3000,
          });
        }
      });
  }
  componentDidMount() {
    this.setState({ loading: true });

    this.fetchData();
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-primary p-py-1"
          onClick={this.exportCSV}
        />
      </React.Fragment>
    );
  }
  leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="Add New Ingestion Attribute"
          icon="pi pi-plus"
          className="p-button-info p-py-1 p-px-3"
          onClick={this.handleClick}
        />
      </>
    );
  };
  addNewAttribute = (name) => {
    this.toast?.show({
      severity: "success",
      summary: `Added ${name} to attribute Pool`,
    });
    this.fetchData();
    this.closeDialog();
  };
  closeDialog = () => {
    this.setState((prevState) => ({ ...prevState, visible: false }));
  };
  render() {
    const header = (
      <div className="p-d-flex p-jc-between">
        <h3 className="p-m-0">List of Ingestion Attributes</h3>
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
    const EmailTemplateDialogFooter = (
      <React.Fragment>
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDialog}
        />
        <Button
          label="Save"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.saveAttributePool}
        />
      </React.Fragment>
    );
    const DeleteIngestionAttributeDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteAttributeDailog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.DeleteIngestionAttribute}
        />
      </React.Fragment>
    );
    const breadcrumbs = [
      {
        label: "Ingestion Attribute Pool",
        path: "/ingestion/ingestionPool",
        icon: "fa fa-home",
        onlyIcon: false,
        showIcon: false,
      },
    ];

    return (
      <div>
        <Toast ref={(el) => (this.toast = el)} />
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <Dialog
          style={{ minWidth: "30%" }}
          header={<span>Add New Ingestion Attribute</span>}
          visible={this.state.visible}
          onHide={this.closeDialog}
          focusOnShow={false}
        >
          <AddIngestionPool
            addNewAttribute={this.addNewAttribute}
            closeDialog={this.closeDialog}
          />
        </Dialog>
        <div>
          <Toolbar
            className="p-mb-1 p-p-2"
            left={this.leftToolbarTemplate}
            right={this.rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={(el) => (this.dt = el)}
            value={DATA}
            loading={this.state.loading}
            paginator
            dataKey="attributeId"
            rows={25}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={this.state.globalFilter}
            header={header}
            className="p-datatable-sm p-datatable-gridlines p-mt-0"
          >
            {/* <Column
              field="attributeId"
              header="Attribute Id"
              sortable
              filter
              filterPlaceholder="Search by id "
            ></Column> */}
            <Column
              field="key"
              header="Key Name"
              sortable
              filter
              filterPlaceholder="Search by key name"
            ></Column>
            <Column
              field="displayName"
              header="Display Name"
              filter
              filterPlaceholder="Search by display name"
              sortable
            ></Column>

            <Column
              body={this.actionBodyTemplate}
              style={{ width: "7rem" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={this.state.editDailog}
          style={{ minWidth: "30%" }}
          header={
            <div>
              <span>Edit Ingestion Attribute</span>
            </div>
          }
          modal
          className="p-fluid"
          footer={EmailTemplateDialogFooter}
          onHide={this.hideDialog}
        >
          <small style={{ color: "#999" }}>
            Attribute Id: {this.state.editData.attributeId}
          </small>
          <div className="p-grid p-ai-center">
            <div className="p-col-4">
              <label htmlFor="displayName">
                <b>Display Name</b>
              </label>
            </div>
            <div className="p-col">
              <InputText
                value={this.state.editData.displayName}
                onChange={(e) => this.onInputChangeHandler(e, "displayName")}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="p-grid p-justify-center p-pt-2">
            <label className="p-d-block p-invalid">
              {this.state.errors.key}
            </label>
          </div>
        </Dialog>
        <Dialog
          visible={this.state.deleteDailogBox}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={DeleteIngestionAttributeDialogFooter}
          onHide={this.hideDeleteAttributeDailog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.editData && (
              <span>
                Are you sure you want to delete <b>{this.state.editData.key}</b>
                ?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}
export default IngestionPool;
