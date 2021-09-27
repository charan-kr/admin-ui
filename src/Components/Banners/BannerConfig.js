import React, { useState, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useToast } from "../../hooks/useToast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/components/column/Column";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Galleria } from "primereact/galleria";
import BannerService from "../Service/BannerService";
import { useHistory } from "react-router-dom";

const BannerConfig = () => {
  const toast = useToast();
  const history = useHistory();

  const [form, setForm] = useState({
    name: "",
    bannerCode: "",
    images: [],
  });
  const [images, setImages] = useState([]);
  const fileUploader = useRef(null);

  const onFormChange = (e) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const onSubmit = () => {
    const { name, bannerCode } = form;
    if (!name || !bannerCode || !images) {
      toast({
        severity: "warn",
        summary: "Fill all the mandatory fields.!!",
      });
      return;
    }
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("image", image);
    });

    const bannerService = new BannerService();
    bannerService.createBanner({ formData, bannerCode, name }).then(() => {
      toast({
        severity: "success",
        summary: "Created New banner group",
      });
      history.goBack();
    });
  };
  const imageTemplate = (rowData) => {
    return (
      <>
        <div
          onClick={() => setVisible(true)}
          className="cursor"
          style={{ width: "100px" }}
        >
          <img
            src={URL.createObjectURL(rowData)}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </>
    );
  };

  const actionTemplate = (rowData) => {
    function deleteImage() {
      setImages(images.filter((image) => image !== rowData));
    }
    return (
      <>
        <Button
          icon="pi pi-trash"
          className="p-button-danger p-button-rounded"
          onClick={deleteImage}
        />
      </>
    );
  };
  const removeImageTemplate = (rowData) => {
    function deleteImage() {
      setImages(images.filter((image) => image !== rowData));
    }
    return (
      <>
        <Button
          icon="pi pi-trash"
          className="p-button-danger p-button-rounded"
          onClick={deleteImage}
        />
      </>
    );
  };
  const leftToolbar = (
    <>
      <Button
        label="Add"
        icon="pi pi-plus"
        className="p-py-1 p-px-3"
        onClick={() => fileUploader.current.click()}
      />
    </>
  );
  const onRowReorder = (e) => setImages(e.value);
  const [visible, setVisible] = useState(false);
  const itemTemplate = (rowData) => {
    return (
      <>
        <div className="cursor" style={{ width: "80%", height: "100%" }}>
          <img
            src={URL.createObjectURL(rowData)}
            alt=""
            style={{ maxWidth: "100%", height: "100%" }}
          />
        </div>
      </>
    );
  };
  return (
    <>
      <Dialog
        style={{ width: "80%", height: "90%" }}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div className="h-100">
          <Galleria
            className="h-100"
            value={images}
            showItemNavigators
            // responsiveOptions={this.responsiveOptions}
            numVisible={5}
            item={itemTemplate}
            thumbnail={imageTemplate}
          />
        </div>
      </Dialog>
      <div className="p-grid">
        <div className="p-col-4">
          <div className="p-field">
            <label htmlFor="name">
              Name
              <span className="p-error">*</span>
            </label>
            <div className="p-inputgroup">
              <InputText
                placeholder="Ex: 50% off Independence Day 2021"
                name="name"
                id="name"
                value={form.name}
                onChange={onFormChange}
              />
            </div>
          </div>
        </div>
        <div className="p-col-4">
          <div className="p-field">
            <label htmlFor="code">
              Code
              <span className="p-error">*</span>
            </label>
            <div className="p-inputgroup">
              <InputText
                placeholder="Ex: INDE2021"
                name="bannerCode"
                id="bannerCode"
                value={form.bannerCode}
                onChange={onFormChange}
              />
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        multiple
        accept=".png, .jpg, .jpeg, .svg, .gif, .webp"
        className="p-d-none"
        ref={fileUploader}
        onChange={handleImageChange}
      />
      <div className="p-grid p-d-none">
        {images.map((image, i) => (
          <div
            key={"banner-image-" + i}
            className="p-col-12 p-md-3 p-xl-2 p-m-1"
            style={{
              height: "100%",
              border: "1px solid #999",
              position: "relative",
            }}
          >
            <div style={{ width: "100%" }}>
              <img
                style={{ width: "100%", height: "100%" }}
                src={URL.createObjectURL(image)}
                alt={image.filename}
              />
            </div>
            {removeImageTemplate(image)}
          </div>
        ))}
        <div className="p-col-12 p-md-4 p-xl-3" style={{ height: "100%" }}>
          <div
            onClick={() => fileUploader.current.click()}
            className="p-card p-text-center cursor"
          >
            <div className="p-card-body p-shadow-4">
              <i class="fa fa-plus fa-2x" aria-hidden="true"></i>
              <p>Add Image</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Toolbar className="p-p-2" left={leftToolbar} />
        <DataTable
          value={images}
          className="p-datatable-sm"
          onRowReorder={onRowReorder}
          reorderableColumns
        >
          <Column rowReorder style={{ width: "3em" }} />
          <Column
            body={(rowData) => <span>{rowData.name}</span>}
            header="File Name"
          />
          <Column
            body={(rowData) => <span>{rowData.type}</span>}
            header="Mime Type"
          />
          <Column
            body={(rowData) => (
              <span>{`${(rowData.size / 1024).toFixed(2)} kb`}</span>
            )}
            header="Size"
          />
          <Column header="Image" body={imageTemplate} />
          <Column header="Action" body={actionTemplate} />
        </DataTable>
      </div>
      <div>
        <Button
          onClick={onSubmit}
          label="Upload"
          className="p-button-rounded p-button-info p-px-4"
        />
      </div>
    </>
  );
};

export default BannerConfig;
