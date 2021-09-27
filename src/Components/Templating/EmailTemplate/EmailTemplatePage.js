import React, { Component } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Toast } from "primereact/toast";
import { EmailTemplateService } from "../../Service/EmailTemplateService";

class EmailTemplatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      subtype: "",
      subject: "",
      body: "",
      formValid: false,
      createdBy: "praneeth",
      createdDt: "18-11-2020",
      modifiedBy: "praneeth reddy",
      status: "y",
      errors: {
        type: "",
        subtype: "",
      },
      color: {
        typeColors: "p-pr-4 p-d-block",
        subtypeColors: "p-pr-4 p-d-block",
        subjectColors: "p-d-block",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.EmailTemplateService = new EmailTemplateService();
  }
  handleValidation() {
    let errors = {};
    let formIsValid = true;

    //Name
    if (this.state.type.length === 0) {
      console.log(this.state.type.length);
      formIsValid = false;
      errors["type"] = "Type Cannot be empty";
    }
    if (this.state.subtype.length === 0) {
      console.log(this.state.subtype.length);
      formIsValid = false;
      errors["subtype"] = "Sub Type cannot be empty.";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }
  handleChange(event) {
    //event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    let col = this.state.color;

    switch (name) {
      case "type":
        errors.type = value.length < 5 ? "Type must be 5 chars" : "";
        col.typeColors =
          value.length < 5 ? "p-pr-4 p-d-block p-invalid" : "p-pr-4 p-d-block";
        break;
      case "subtype":
        errors.subtype = value.length < 5 ? "subtype Must be 5 chars" : "";
        col.subtypeColors =
          value.length < 5 ? "p-pr-4 p-d-block p-invalid" : "p-pr-4 p-d-block";
        break;

      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => {});
    this.setState({ col });
  }

  handleSubmit = (event) => {
    let valid = true;
    Object.values(this.state.errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    //this.state.disabledbutton=false;
    console.log(valid);

    event.preventDefault();
    if (valid && this.handleValidation()) {
      let finalJson = {
        type: this.state.type,
        subType: this.state.subtype,
        subject: this.state.subject,
        body: this.state.body,
        createdBy: "praneeth",

        modifiedBy: "praneeth reddy",
      };
      this.EmailTemplateService.addEmailTemplate(finalJson)
        .then((response) => {
          console.log(response);

          this.toast.show({
            severity: "success",
            summary: "Success",
            detail: "successfully inserted the values",
            life: 3000,
          });
        })
        .catch((error) => {
          console.log(error);
          alert(JSON.stringify(error));
        });
    } else {
      alert("Form has errors.");
      console.log("+++++++++++++++++++++++++++++++");
      console.log(this.state.errors);
    }
  };

  render() {
    return (
      <div className="p-ml-2">
        <Toast ref={(el) => (this.toast = el)} />

        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="p-fluid">
              <div className="p-grid">
                <div className="p-col-12 p-md-6">
                  <div className="p-field">
                    <label htmlFor="type">
                      <b>Type</b>
                    </label>
                    <div>
                      <InputText
                        id="name"
                        name="type"
                        onChange={this.handleChange}
                      />
                      <label className="p-d-block p-error">
                        {this.state.errors.type}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="p-col-12 p-md-6">
                  <div className="p-field">
                    <label htmlFor="subType">
                      <b>Sub Type</b>
                    </label>
                    <div>
                      <InputText
                        id="subType"
                        name="subtype"
                        onChange={this.handleChange}
                      />
                      <label className="p-d-block p-error">
                        {this.state.errors.subtype}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-field">
                <label htmlFor="subject">
                  <b>Subject</b>
                </label>
                <div>
                  <Editor
                    id="subject"
                    name="subject"
                    value={this.state.subject}
                    onTextChange={(e) => {
                      this.setState({ subject: e.textValue });
                    }}
                  />
                  <label className="p-d-block p-invalid">
                    {this.state.errors.subject}
                  </label>
                </div>
              </div>
              <div className="p-field">
                <label htmlFor="body">
                  <b>Body</b>
                </label>
                <div>
                  <Editor
                    name="body"
                    style={{ height: "150px" }}
                    value={this.state.body}
                    onTextChange={(e) => {
                      this.setState({ body: e.htmlValue });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="p-grid p-pt-4 p-justify-center ">
              <Button
                className="p-button-primary "
                type="submit"
                disabled={!this.state.type || !this.state.subtype}
              >
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EmailTemplatePage;
