import React, { Component } from "react";
import { withRouter } from "react-router";

import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";

import ImagesStageService from "../../../Service/ImagesStageService";

export class AddDvnImages extends Component {
  constructor(props) {
    super(props);
    this.types = ["Image", "Video"];
    this.orders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.state = {
      selectedFiles: undefined,
      files: [],
      progressInfos: [],
      message: [],
      totalSize: 0,
      order: this.props.count + 1,

      imageInfos: [],
      dvnId: this.props.id,
      view360: "false",
      type: "",
      image: "",
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.headerTemplate = this.headerTemplate.bind(this);
    this.itemTemplate = this.itemTemplate.bind(this);
    this.emptyTemplate = this.emptyTemplate.bind(this);
    this.onTemplateUpload = this.onTemplateUpload.bind(this);
    this.onTemplateSelect = this.onTemplateSelect.bind(this);
    this.onTemplateClear = this.onTemplateClear.bind(this);
    this.onTemplateRemove = this.onTemplateRemove.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);

    this.ImagesStageService = new ImagesStageService();
  }

  onSubmitHandler = (e) => {
    let data = {
      dvnId: this.state.dvnId,
      // files: this.state.files,
      type: this.state.type,
      view360: this.state.view360 === "true" ? true : false,
    };
    Array.from(this.state.files).forEach((file) => {
      this.ImagesStageService.addStageMediaToDVN({ ...data, files: [file] })
        .then((response) => {
          this.toast.show({
            severity: "success",
            summary: "Success Message",
            detail: response.data,
            life: 3000,
          });
          this.props.productDialog(false);
        })
        .catch((error) => {
          this.toast.show({
            severity: "error",
            summary: "Error Message",
            detail: error.response.data.message,
            life: 3000,
          });
        });
    });
  };
  onChangeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  headerTemplate(options) {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = this.state.totalSize / 10000;
    const formatedValue = this.fileUploadRef
      ? this.fileUploadRef.formatSize(this.state.totalSize)
      : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <ProgressBar
          value={value}
          displayValueTemplate={() => `${formatedValue} / 1 MB`}
          style={{ width: "300px", height: "20px", marginLeft: "auto" }}
        ></ProgressBar>
      </div>
    );
  }

  itemTemplate(file, props) {
    return (
      <div className="p-d-flex p-ai-center p-flex-wrap">
        <div className="p-d-flex p-ai-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="p-d-flex p-dir-col p-text-left p-ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="p-px-3 p-py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger p-ml-auto"
          onClick={() => this.onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  }
  onTemplateSelect(e) {
    const SELECTED_FILE = e.files[0];
    let images = [];
    const SIZE = SELECTED_FILE.size;

    for (let i = 0; i < e.files.length; i++) {
      images.push(e.files[i]);
    }
    this.setState({
      files: [...this.state.files, ...e.files],
      totalSize: SIZE,
    });
  }
  onTemplateRemove(file, callback) {
    this.setState(
      (prevState) => ({
        totalSize: prevState.totalSize - file.size,
      }),
      callback
    );
  }

  onTemplateUpload(e) {
    let totalSize = 0;
    e.files.forEach((file) => {
      totalSize += file.size || 0;
    });

    this.setState(
      {
        totalSize,
      },
      () => {
        this.toast.show({
          severity: "info",
          summary: "Success",
          detail: "File Uploaded",
        });
      }
    );
  }
  onTemplateClear() {
    this.setState({ totalSize: 0, files: [] });
  }
  emptyTemplate() {
    return (
      <div className="p-d-flex p-ai-center p-dir-col">
        <i
          className="pi pi-image p-mt-3 p-p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="p-my-5"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  }

  render() {
    const chooseOptions = {
      icon: "pi pi-fw pi-images",
      iconOnly: true,
      className: "custom-choose-btn p-button-rounded p-button-outlined",
    };
    const uploadOptions = {
      icon: "pi pi-fw pi-cloud-upload",
      iconOnly: true,
      className:
        "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
    };
    const cancelOptions = {
      icon: "pi pi-fw pi-times",
      iconOnly: true,
      className:
        "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
    };

    return (
      <div className=" p-pt-5">
        <Toast ref={(el) => (this.toast = el)} />

        <div className="p-grid p-justify-center"></div>
        <div className="p-field">
          <label htmlFor=" DVN ID">DVN ID</label>
          <InputText name="dvnId" value={this.state.dvnId} />
        </div>

        <div className="p-field">
          <label htmlFor=" DVN ID">Type</label>
          <Dropdown
            id="type"
            options={this.types}
            name="type"
            value={this.state.type}
            onChange={this.onChangeHandler}
          />{" "}
        </div>
        <div className="p-field">
          <label htmlFor=" DVN ID">view360</label>
          <div className="p-col">
            <div className="p-formgroup-inline">
              <div className="p-field-checkbox">
                <RadioButton
                  inputId="city7"
                  name="view360"
                  value="true"
                  // onChange={(e) => setCity2(e.value)}
                  checked={this.state.view360 === "true"}
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="TRUE">True</label>
              </div>
              <div className="p-field-checkbox">
                <RadioButton
                  inputId="city8"
                  name="view360"
                  value="false"
                  //onChange={(e) => setCity2(e.value)}
                  checked={this.state.view360 === "false"}
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="FALSE">False</label>
              </div>
            </div>{" "}
          </div>
        </div>

        <div className="p-field">
          <div className="p-field p-grid"></div>
          <label
            htmlFor="firstname3"
            className="p-col-fixed"
            style={{ width: "200px", fontSize: "18px" }}
          >
            Image/Video
          </label>
          {this.state.view360 === "true" ? (
            <FileUpload
              ref={(el) => (this.fileUploadRef = el)}
              name="images"
              accept="image/*,video/*"
              //onUpload={this}

              multiple
              maxFileSize={1000000}
              onSelect={this.onTemplateSelect}
              onError={this.onTemplateClear}
              onClear={this.onTemplateClear}
              headerTemplate={this.headerTemplate}
              itemTemplate={this.itemTemplate}
              emptyTemplate={this.emptyTemplate}
              chooseOptions={chooseOptions}
              uploadOptions={uploadOptions}
              cancelOptions={cancelOptions}
            />
          ) : (
            <FileUpload
              ref={(el) => (this.fileUploadRef = el)}
              name="images"
              accept="image/*,video/*"
              //onUpload={this}
              multiple
              maxFileSize={1000000}
              onSelect={this.onTemplateSelect}
              onError={this.onTemplateClear}
              onClear={this.onTemplateClear}
              headerTemplate={this.headerTemplate}
              itemTemplate={this.itemTemplate}
              emptyTemplate={this.emptyTemplate}
              chooseOptions={chooseOptions}
              uploadOptions={uploadOptions}
              cancelOptions={cancelOptions}
            />
          )}
        </div>

        <div
          className="p-grid p-justify-center"
          style={{ alignContent: "center", alignItems: "center" }}
        >
          <Button
            //className=" p-pl-6"
            disabled={this.state.totalSize === 0}
            onClick={this.onSubmitHandler}
            style={{
              alignContent: "center",
              alignItems: "center",
              paddingLeft: "300px",
            }}
          >
            Upload
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(AddDvnImages);
