import React, { useState } from "react";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";

export default function EditDvnImageConfig() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectOrder, setSelectOrder] = useState(null);

  const [city2, setCity2] = useState("false");

  let states = ["Image", "Video"];
  const onStateChange = (e) => {
    const { name, value } = e.target;
    if (name === "order") {
      setSelectOrder(value);
    }
    setSelectedState(value);
  };
  return (
    <div>
      {" "}
      <h3>Order</h3>
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col">
          <label htmlFor="firstname5" className="p-sr-only">
            order{" "}
          </label>
          <InputText
            inputId="state"
            name="order"
            value={selectOrder}
            onChange={onStateChange}
            placeholder="order"
          />
        </div>
      </div>
      <h3>Type</h3>
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col">
          <label htmlFor="firstname5" className="p-sr-only">
            type
          </label>
          <Dropdown
            name="type"
            value={selectedState}
            options={states}
            onChange={onStateChange}
            placeholder="Select"
          />
        </div>
      </div>
      <h3>view 360</h3>
      <div className="p-formgroup-inline">
        <div className="p-field-checkbox">
          <RadioButton
            inputId="city5"
            name="city2"
            value="true"
            onChange={(e) => setCity2(e.value)}
            checked={city2 === "true"}
          />
          <label htmlFor="city7">true</label>
        </div>
        <div className="p-field-checkbox">
          <RadioButton
            inputId="city8"
            name="city2"
            value="false"
            onChange={(e) => setCity2(e.value)}
            checked={city2 === "false"}
          />
          <label htmlFor="city8">false</label>
        </div>
      </div>
      <Button type="button" label="Submit" />
    </div>
  );
}
