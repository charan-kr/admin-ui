import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Editor } from "primereact/editor";
import { Toolbar } from "primereact/toolbar";
import CustomBreadcrumbs from "../CustomBreadCrumbs";

import { EmailTemplateService } from "../Service/EmailTemplateService";

class EmailTemplateLandingPage extends Component {
  emptyEmailTemplate = {
    id: null,
    type: null,
    subType: null,
    subject: null,
    body: null,
    createdBy: null,
    createdDt: null,
    modifiedBy: null,
    modifiedDt: null,
    status: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      emailTemplates: [],

      serachedValue: "",
      isDisabledSearch: true,
      isDisabledButton: true,

      searchBy: null,
      emailTemplatevalue: this.emptyEmailTemplate,
      emailDialog: false,
      submitted: false,
      selectedEmailTemplates: null,
      deleteEmailTemplateDialog: false,
      showDiv: false,
      isHidden: true,
      deleteDailogBox: false,
    };
    this.SearchDropdownOptions = [
      { name: "type", id: 1 },
      { name: "subject", id: 2 },
      { name: "subType", id: 3 },

      { name: "Event Name", id: 4 },
    ];
    this.onDropdownSerach = this.onDropdownSerach.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

    this.hideDialog = this.hideDialog.bind(this);
    this.saveEmailTemplate = this.saveEmailTemplate.bind(this);
    this.editEmailTemplate = this.editEmailTemplate.bind(this);
    this.confirmDeleteEmailTemplate =
      this.confirmDeleteEmailTemplate.bind(this);
    this.DeleteEmailTemplate = this.DeleteEmailTemplate.bind(this);
    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    this.hideDeleteEmailTemplateDialog =
      this.hideDeleteEmailTemplateDialog.bind(this);
    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    this.EmailTemplateService = new EmailTemplateService();
  }
  onInputChangeHandler(e, name) {
    const val = e.target.value;
    console.log("Values:" + val);
    let emailTemplatevalue = { ...this.state.emailTemplatevalue };
    emailTemplatevalue[`${name}`] = val;
    console.log("Values:" + JSON.stringify(emailTemplatevalue));

    this.setState({ emailTemplatevalue });
  }
  onInputTextChangeHandler(e, name) {
    const val = e.htmlValue;
    console.log("Values:" + val);
    let emailTemplatevalue = { ...this.state.emailTemplatevalue };
    emailTemplatevalue[`${name}`] = val;
    console.log("Values:" + JSON.stringify(emailTemplatevalue));

    this.setState({ emailTemplatevalue });
  }

  onDropdownSerach(e) {
    this.setState({ searchBy: e.value, isDisabledSearch: false });
  }
  handleClick() {
    this.props.history.push("/emailTemplate/new");
  }
  onSearchHandler = () => {
    const searchBy = this.state.searchBy.name;
    const values = this.state.serachedValue;

    this.EmailTemplateService.getEmailTemplateSearchFilter(searchBy, values)
      .then((res) => {
        console.log(res);
        this.setState({
          emailTemplates: res.data.content,
          showDiv: true,
        });
        this.toast.show({
          severity: "success",
          summary: "Retrvied successfully",
          life: 3000,
        });
        console.log(JSON.stringify(this.state.emailTemplates));
      })
      .catch((error) => {
        //alert("error");
        console.log(error);

        this.toast.show({
          severity: "error",
          summary: "Error Message",
          detail: "Message Content",
          life: 3000,
        });

        console.log(JSON.stringify(error));
      });
  };
  hideDialog() {
    this.setState({
      submitted: false,
      emailDialog: false,
    });
  }

  hideDeleteEmailTemplateDialog() {
    this.setState({ deleteDailogBox: false });
  }

  saveEmailTemplate() {
    this.EmailTemplateService.updateEmailTemplate(
      this.state.emailTemplatevalue.emailTemplateId,
      this.state.emailTemplatevalue
    )
      .then((response) => {
        this.setState({
          emailTemplatevalue: response,
        });
        console.log("updated value" + JSON.stringify(response));
      })
      .catch((error) => {
        console.log("error" + error);
      });
    this.setState({
      emailDialog: false,
      emailTemplatevalue: this.state.emailTemplatevalue,
    });
  }

  editEmailTemplate(emailvalues) {
    this.setState({
      emailTemplatevalue: { ...emailvalues },
      emailDialog: true,
    });
  }

  confirmDeleteEmailTemplate(emailTemplatevalue) {
    this.setState({
      emailTemplatevalue: emailTemplatevalue,
      deleteDailogBox: true,
    });
  }

  DeleteEmailTemplate() {
    let data = this.state.emailTemplates.filter(
      (val) => val.id !== this.state.emailTemplatevalue.id
    );
    console.log("email template" + JSON.stringify(data));
    //console("state"+JSON.stringify(this.state.emailTemplatevalue.id));
    this.EmailTemplateService.deleteEmailTemplateDetailsById(
      this.state.emailTemplatevalue.id
    )
      .then((response) => {
        this.setState({
          data,
          deleteDailogBox: false,
          emailTemplatevalue: this.emptyEmailTemplate,
        });
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: response.data,
          life: 3000,
        });
      })
      .catch((error) => {
        this.toast.show({
          severity: "error",
          summary: "Error",
          detail: error.response.data.message,
          life: 3000,
        });
      });
  }
  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success "
          onClick={() => this.editEmailTemplate(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => this.confirmDeleteEmailTemplate(rowData)}
        />
      </React.Fragment>
    );
  }

  leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link to={`/emailTemplate/new`} className="custom-router-link">
          <Button
            label="Create New Email Template"
            icon="pi pi-plus"
            className="p-button-info p-py-1"
            onClick={this.handleClick}
          />
        </Link>
      </React.Fragment>
    );
  };

  rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          // onClick={() => fetchData()}
          className="p-button-text p-button-info p-p-0"
          icon="fa fa-refresh"
        />
      </React.Fragment>
    );
  };
  componentDidUMount() {
    this.EmailTemplateService.getAllEmailTemplates()
      .then((res) => {
        console.log(res.data);
        this.setState({
          emailTemplates: res.data.content,
          showDiv: true,
        });
        this.toast.show({
          severity: "success",
          summary: "Retrvied successfully",
          life: 3000,
        });
        console.log(JSON.stringify(this.state.emailTemplates));
      })
      .catch((error) => {
        //alert("error");
        console.log(error);

        this.toast.show({
          severity: "error",
          summary: "Error Message",
          detail: "Message Content",
          life: 3000,
        });

        console.log(JSON.stringify(error));
      });
  }
  render() {
    const header = (
      <div className="p-d-flex p-jc-between">
        <h3 className="p-m-0">List of Email Template's</h3>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            // onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="p-py-1"
          />
        </span>
      </div>
    );

    const DeleteEmailTemplateDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteEmailTemplateDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.DeleteEmailTemplate}
        />
      </React.Fragment>
    );
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
          onClick={this.saveEmailTemplate}
        />
      </React.Fragment>
    );
    const breadcrumbs = [
      {
        label: "Email Template",
        path: "/emailTemplate",
        icon: "fa fa-home",
        onlyIcon: false,
        showIcon: false,
      },
    ];
    return (
      <div className="p-ml-2">
        <Toast ref={(el) => (this.toast = el)} />

        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <div className="p-formgroup-inline">
          <div className="p-field">
            <Dropdown
              value={this.state.searchBy}
              options={this.SearchDropdownOptions}
              onChange={this.onDropdownSerach}
              optionLabel="name"
              placeholder="Search By"
              style={{ width: "200px" }}
            />{" "}
          </div>
          <div className="p-field">
            <InputText
              value={this.state.serachedValue}
              onChange={(e) =>
                this.setState({
                  serachedValue: e.target.value,
                  isDisabledButton: false,
                })
              }
              placeholder="search by select values"
              disabled={this.state.isDisabledSearch ? "disabled" : ""}
            />{" "}
          </div>
          <Button
            type="button"
            label="serach"
            onClick={this.onSearchHandler}
            disabled={this.state.isDisabledButton ? "disabled" : ""}
          />
        </div>

        <Toast ref={(el) => (this.toast = el)} />
        <Toolbar
          className="p-p-2"
          left={this.leftToolbarTemplate}
          right={this.rightToolbarTemplate}
        ></Toolbar>
        <div>
          <DataTable
            value={this.state.emailTemplates}
            ref={(el) => (this.dt = el)}
            selection={this.state.selectedTempaltes}
            onSelectionChange={(e) =>
              this.setState({ selectedTempaltes: e.value })
            }
            header={header}
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Menu Setup config"
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50]}
            className="p-datatable-gridlines p-datatable-sm p-mt-1"
          >
            <Column selectionMode="single" style={{ width: "3rem" }}></Column>
            <Column field="type" header="Type" sortable></Column>
            <Column field="subType" header="subType" sortable></Column>
            <Column field="subject" header="subject" sortable></Column>
            <Column field="body" header="Body" sortable></Column>
            <Column field="createdBy" header="Created" sortable></Column>
            <Column field="createdDt" header="Created Date" sortable></Column>
            <Column field="modifiedBy" header="Modified By" sortable></Column>
            <Column field="modifiedDt" header="Modified Date" sortable></Column>
            <Column field="status" header="status" sortable></Column>
            <Column body={this.actionBodyTemplate} header="actions"></Column>
          </DataTable>
        </div>
        <Dialog
          visible={this.state.emailDialog}
          style={{ width: "800px" }}
          header="Email Details"
          modal
          className="p-fluid"
          footer={EmailTemplateDialogFooter}
          onHide={this.hideDialog}
        >
          <div className="p-field">
            <label htmlFor="id">id</label>
            <InputText
              id="id"
              readOnly
              value={this.state.emailTemplatevalue.id}
              onChange={(e) => this.onInputChangeHandler(e, "id")}
              required
              autoFocus
            />
          </div>
          <div className="p-field">
            <label htmlFor="type">Type</label>
            <InputText
              value={this.state.emailTemplatevalue.type}
              onChange={(e) => this.onInputChangeHandler(e, "type")}
              required
              autoFocus
            />
          </div>
          <div className="p-field">
            <label htmlFor="subType">subType</label>
            <InputText
              value={this.state.emailTemplatevalue.subType}
              onChange={(e) => this.onInputChangeHandler(e, "subType")}
              required
              autoFocus
            />
          </div>
          <div className="p-field">
            <label htmlFor="subject">subject</label>
            <Editor
              value={this.state.emailTemplatevalue.subject}
              onTextChange={(e) => this.onInputTextChangeHandler(e, "subject")}
              required
              autoFocus
            />
          </div>
          <div className="p-field">
            <label htmlFor="body">body</label>
            <Editor
              value={this.state.emailTemplatevalue.body}
              onTextChange={(e) => this.onInputTextChangeHandler(e, "body")}
              required
              autoFocus
            />
          </div>
        </Dialog>

        <Dialog
          visible={this.state.deleteDailogBox}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={DeleteEmailTemplateDialogFooter}
          onHide={this.hideDeleteEmailTemplateDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.emailTemplatevalue && (
              <span>
                Are you sure you want to delete{" "}
                <b>{this.state.emailTemplatevalue.type}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default EmailTemplateLandingPage;
