import React, { useState, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useToast } from "../../hooks/useToast";
import { useHistory } from "react-router-dom";
import AdvertiseService from "../Service/AdvertiseService";

const AdvertiseConfig = () => {
  const toast = useToast();
  const history = useHistory();

  const [form, setForm] = useState({
    name: "",
    advertisementCode: "",
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
    const { name, advertisementCode } = form;
    if (!name || !advertisementCode || !images) {
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

    const advertiseService = new AdvertiseService();
    advertiseService
      .createAdvertisement({ formData, advertisementCode, name })
      .then((res) => {
        toast({
          severity: "success",
          summary: res.data,
        });
        history.goBack();
      });
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

  return (
    <>
      <div className="p-grid">
        <div className="p-col-4">
          <div className="p-field">
            <label htmlFor="name">
              Name
              <span className="p-error">*</span>
            </label>
            <div className="p-inputgroup">
              <InputText
                placeholder="Ex: 50% Offer from workload services"
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
                placeholder="Ex: WORK5050"
                name="advertisementCode"
                id="advertisementCode"
                value={form.advertisementCode}
                onChange={onFormChange}
              />
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept=".png, .jpg, .jpeg, .svg, .gif, .webp"
        className="p-d-none"
        ref={fileUploader}
        onChange={handleImageChange}
      />
      <div className="p-grid">
        {images.map((image, i) => (
          <div
            key={"advertise-image-" + i}
            className="p-col-6 p-mx-auto"
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
        <Button
          onClick={onSubmit}
          label="Upload"
          className="p-button-rounded p-button-info p-px-4"
        />
      </div>
    </>
  );
};

export default AdvertiseConfig;
