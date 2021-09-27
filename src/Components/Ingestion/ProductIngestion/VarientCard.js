import { Button } from "primereact/button";
import React, { useState } from "react";
import IngestionService from "../../Service/IngestionService";

import { AutoComplete } from "primereact/autocomplete";
import { InputText } from "primereact/inputtext";

const VarientCard = ({
  varient,
  index,
  handleUpdateVarientKey,
  handleDeleteVarient,
  addVarientPair,
  handleValuesChange,
  handleDeleteVarientPair,
  handleKeyChange,
}) => {
  const ingestionService = new IngestionService();

  const handleSelection = (value) => {
    handleUpdateVarientKey(value, index);
  };
  const [selectedKey, setSelectedKey] = useState(varient?.key || null);
  const [filteredAttributes, setFilteredAttributes] = useState(null);

  const searchAttributes = (event) => {
    if (event.query.trim().length > 1) {
      setTimeout(() => {
        ingestionService
          .getIngestionPoolKeys(event.query)
          .then((res) => {
            setFilteredAttributes(res.data);
          })
          .catch(() => {});
      }, 250);
    } else {
      setFilteredAttributes([]);
    }
  };
  return (
    <div
      className="p-card p-shadow-2 p-d-flex p-flex-column"
      style={{ height: "100%" }}
    >
      <div
        className="p-card-header p-p-2 p-text-center"
        style={{ backgroundColor: "#eee", position: "relative" }}
      >
        <span style={{ position: "absolute", top: "6px", left: "0" }}>
          <Button
            onClick={() => handleKeyChange(varient)}
            className="p-button-text p-p-0"
            icon="fa fa-key"
          />
        </span>
        <span>
          <small>Display Name : </small> {varient?.name}
        </span>
      </div>
      <div className="p-card-body" style={{ flex: "1" }}>
        {false && (
          <div className="p-inputgroup p-ai-center">
            <label htmlFor={varient.key}>Key : </label>
            <AutoComplete
              forceSelection
              value={selectedKey}
              suggestions={filteredAttributes}
              field="key"
              onSelect={(e) => handleSelection(e.value)}
              completeMethod={searchAttributes}
              onChange={(e) => setSelectedKey(e.value)}
              placeholder="Search For Key"
              className="p-ml-2"
            />
          </div>
        )}
        {varient.values?.map((ele, i) => (
          <div className="p-my-3" style={{ position: "relative" }}>
            {varient.values.length > 1 && (
              <i
                style={{
                  position: "absolute",
                  right: "-4px",
                  top: "-8px",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteVarientPair(varient, i)}
                className="pi pi-times-circle p-error p-invalid"
                aria-hidden="true"
              ></i>
            )}
            <InputText
              value={ele[varient.key]}
              className="p-inputgroup p-py-1"
              name={varient.key}
              id={varient.key}
              onChange={(e) => handleValuesChange(varient, e, i)}
              placeholder={`Enter Varient ${varient.name}`}
            />
            <InputText
              value={ele.value}
              className="p-inputgroup p-py-1"
              name="value"
              id="value"
              onChange={(e) => handleValuesChange(varient, e, i)}
              placeholder="Enter the Value"
            />
          </div>
        ))}
        {varient.key ? (
          <Button
            className="p-button-text p-p-0"
            icon="fa fa-plus-square-o"
            onClick={() => addVarientPair(varient)}
          />
        ) : null}
      </div>
      <div className="p-card-footer">
        <Button
          onClick={() => handleDeleteVarient(varient)}
          style={{ backgroundColor: "#f07167", width: "100%" }}
          className="p-button-danger p-py-1"
          label="Drop"
        />
      </div>
    </div>
  );
};

export default VarientCard;
