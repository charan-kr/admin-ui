import React, { Component } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import IngestionPoolService from "../../Service/IngestionPoolService";

class AddIngestionPool extends Component {
  constructor(props) {
    super(props);
    this.toast = React.createRef();
    this.state = {
      key: "",
      displayName: "",

      errors: {
        displayName: null,
      },
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.IngestionPoolService = new IngestionPoolService();
  }
  validateForm = (errors) => {
    let valid = false;
    let x = Object.values(errors);
    alert(JSON.stringify(x.length));
    if (x.length > 0) {
      valid = true;
    }
    return valid;
  };
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
  CapitlizeString(word) {
    console.log(word);
    return word.replace(/\b\w/g, (l) => l.toUpperCase());
  }
  onChangeHandler = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    console.log(name, value);
    value = this.CapitlizeString(value);
    let errors = this.state.errors;
    switch (name) {
      case "displayName":
        errors.displayName =
          value.length < 2 ? "key Name must be 2 characters long!" : "";

        this.setState({ errors, [name]: value });

        break;

      default:
        break;
    }
    //this.setState({ errors, [name]: value });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    if (this.state.errors.displayName) {
      alert("Invalid Form");
    } else {
      let finalJson = {
        key: "",
        displayName: "",
      };

      finalJson.displayName = this.state.displayName;
      finalJson.key = this.toCamelCase(this.state.displayName);

      this.IngestionPoolService.addIngestionPool(finalJson)
        .then((response) => {
          this.toast.show({
            severity: "success",
            summary: response.data,
            life: 3000,
          });
          // this.props.history.push("/ingestionPool");
          this.props.addNewAttribute(this.state.displayName);
        })
        .catch((error) => {
          if (error.response === undefined) {
            this.toast.show({
              severity: "error",
              summary: "Error Message",
              detail: "network error",
              life: 3000,
            });
          } else {
            this.toast.show({
              severity: "error",
              summary: "Error Message",
              detail: error.response.data.message,
              life: 3000,
            });
          }
        });
    }
  };

  render() {
    return (
      <div className="">
        <Toast ref={(el) => (this.toast = el)} />
        <div>
          <div className="p-grid p-ai-center">
            <div className="p-col-4">
              <label htmlFor="displayName">
                <b>Display Name</b>
              </label>
            </div>
            <div className="p-col">
              <InputText
                id="displayName"
                name="displayName"
                aria-describedby="username1-help"
                className="p-inputgroup"
                value={this.state.displayName}
                onChange={this.onChangeHandler}
              />
              <span className="p-d-block p-invalid p-error">
                {this.state.errors.displayName}
              </span>
            </div>
          </div>

          <div className="p-d-flex p-jc-between p-mt-3">
            <Button
              className="p-px-3 p-py-1 p-button-secondary"
              label="Cancel"
              onClick={() => this.props.closeDialog()}
            />
            <Button
              type="submit"
              className="p-px-3 p-py-1 p-button-success"
              label="Save"
              disabled={this.state.displayName === ""}
              onClick={this.onSubmitHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AddIngestionPool;
