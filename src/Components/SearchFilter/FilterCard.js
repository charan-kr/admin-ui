import React from "react";

import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const FilterCard = ({
  filter,
  handleDeleteFilter,
  addToFilterList,
  handleDisplayTypeChange,
  handleValuesChange,
  handleDeleteFromFilter,
  handleUnitsChange,
  handleKeyChange,
}) => {
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
            onClick={() => handleKeyChange(filter)}
            className="p-button-text p-p-0"
            icon="fa fa-key"
          />
        </span>
        <span>
          <small>Display Name : </small>
          <strong className="p-text-uppercase">{filter?.displayName}</strong>
        </span>
      </div>
      <div className="p-card-body" style={{ flex: "1" }}>
        <div className="p-grid">
          <div className="p-col-4 p-p-0">
            <label>
              <b>Display Type</b>
            </label>
          </div>
          <div className="p-col p-p-0">
            {["checkbox", "normal"].map((type) => (
              <div key={type} className="p-field-radiobutton p-d-inline p-mx-2">
                <RadioButton
                  inputId={`${type}_${filter.ingestionKeyValue}`}
                  name="displayType"
                  value={type}
                  onChange={(e) => handleDisplayTypeChange(filter, type)}
                  checked={filter.displayType === type}
                />
                <label
                  className="p-text-capitalize"
                  htmlFor={`${type}_${filter.ingestionKeyValue}`}
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="p-grid p-mt-3">
          <div className="p-col-4 p-p-0">
            <label>
              <b>Units</b>
            </label>
          </div>
          <div className="p-col p-p-0">
            <InputText
              value={filter.units}
              name="units"
              onChange={(e) => handleUnitsChange(filter, e.target.value)}
              className="p-py-1 p-inputgroup"
            />
          </div>
          <div className="p-col-12 p-p-0 p-d-none">
            <div className="p-d-flex p-ai-center ">
              <small>
                <input type="checkbox" />
                <label>Add units to this filter</label>
              </small>
            </div>
          </div>
        </div>
        <Divider align="center" className="p-mx-0" type="dashed">
          Filter By List
        </Divider>
        {filter.filterByList?.map((ele, i) => (
          <div className="p-my-3" style={{ position: "relative" }}>
            {filter.filterByList.length > 1 && (
              <i
                style={{
                  position: "absolute",
                  right: "-4px",
                  top: "-8px",
                  cursor: "pointer",
                  zIndex: "1",
                }}
                onClick={() => handleDeleteFromFilter(filter, i)}
                className="pi pi-times-circle p-error p-invalid"
                aria-hidden="true"
              ></i>
            )}
            {filter.displayType === "normal" && (
              <Dropdown
                value={ele.type}
                options={[
                  "up to",
                  "less then",
                  "greater than",
                  "under",
                  "between",
                  "plain",
                ]}
                className="p-inputgroup p-py-1 filter-card"
                name="type"
                onChange={(e) => handleValuesChange(filter, e, i)}
                placeholder="-- Select Filter Type --"
              />
            )}
            <InputText
              value={ele.text1}
              className="p-inputgroup p-py-1 p-my-1"
              name="text1"
              onChange={(e) => handleValuesChange(filter, e, i)}
              placeholder={`Enter Filter Value  `}
            />
            {filter.displayType === "normal" && (
              <InputText
                value={ele.text2}
                className="p-inputgroup p-py-1"
                name="text2"
                onChange={(e) => handleValuesChange(filter, e, i)}
                placeholder="Enter Filter Value"
              />
            )}
          </div>
        ))}
        {filter.displayType ? (
          <Button
            className="p-button-text p-p-0"
            icon="fa fa-plus-square-o"
            label="Add filter"
            onClick={() => addToFilterList(filter)}
          />
        ) : (
          <div className="p-card p-m-3" style={{ border: "1px solid blue" }}>
            <div className="p-card-body p-text-center">
              Select Display Type to add filter options
            </div>
          </div>
        )}
      </div>
      <div className="p-card-footer">
        <Button
          onClick={() => handleDeleteFilter(filter)}
          style={{ backgroundColor: "#f07167", width: "100%" }}
          className="p-button-danger p-py-1"
          label="Drop"
        />
      </div>
    </div>
  );
};

export default FilterCard;
