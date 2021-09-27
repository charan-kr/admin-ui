import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import PromotionsService from "../Service/PromotionsService";
import { Toast } from "primereact/toast";

export default function AddPromotionUsers({ promoCode, close }) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const history = useHistory();
  const toast = useRef(null);

  const fileUploadRef = useRef(null);
  const promotionService = new PromotionsService();
  const removeFile = () => {
    setData([]);
  };
  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => {
        return file;
      });
      setData(filesArray);
      document.getElementById("file").value = "";
    }
  };
  const selectedFileTemplate = () => {
    if (!data || data.length < 1) return null;

    return (
      <div>
        <span>{data[0].name}</span>
        <Button
          onClick={() => removeFile()}
          className="p-button-text p-button-danger p-p-0"
          icon="fa fa-trash"
        />
      </div>
    );
  };
  const handleSave = () => {
    promotionService
      .uploadUsers(promoCode, data)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Created New Promotion Successfully",
        });
        setTimeout(() => {
          close(false);
          //history.push("/promotions");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response);

        toast.current.show({
          severity: "error",
          summary: JSON.stringify(error.response),
        });
      });
  };
  return (
    <div>
      <div>
        <Toast ref={toast} />
        <div className="p-grid p-ai-center p-my-0">
          <div className="p-col-4">
            <label htmlFor="maxQuantityPerUser">User File</label>
          </div>
          {id}
          <div className="p-col-8">
            <div className="p-d-flex">
              <span className="colen">:</span>
              <div>
                <input
                  className="p-d-none"
                  ref={fileUploadRef}
                  type="file"
                  id="file"
                  accept=".csv, .xlsx"
                  onChange={handleFileChange}
                />
                {selectedFileTemplate()}
                <Button
                  onClick={() => fileUploadRef.current.click()}
                  className="p-button-info p-py-1 p-d-block"
                  label="Choose File"
                />
                {data.length === 0 && (
                  <span className="p-invalid p-error">
                    **Upload csv/xlsx file only
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-d-flex p-jc-between">
          <Button
            onClick={() => history.goBack()}
            className="p-button-secondary p-mx-2"
            label="Cancel"
          />
          <div>
            <Button
              onClick={() => handleSave()}
              className="p-button-success p-mx-2"
              label="Save"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
