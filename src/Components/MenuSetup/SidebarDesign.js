import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const newSection = {
  lableName: "",
  lableUrl: "www.dolphinskart.com/",
  subSection: [],
};
const Recursion = ({
  menuSectionPair,
  setMenuSectionPair,
  MAX_AllOWED_DEPTH = 10,
}) => {
  return (
    <>
      <div>
        <OptionList
          MAX_AllOWED_DEPTH={MAX_AllOWED_DEPTH}
          rootIndex={0}
          list={menuSectionPair}
          onChange={(updatedList) => setMenuSectionPair(updatedList)}
        />
      </div>
      <Button
        onClick={() => setMenuSectionPair([...menuSectionPair, newSection])}
        className="p-button-text p-p-0 p-button-info"
        icon="pi pi-plus"
        label="Add new label"
      />
    </>
  );
};

export default Recursion;

const OptionList = ({ list, onChange, rootIndex, MAX_AllOWED_DEPTH }) => {
  const addNewSection = (index) => {
    const updatedData = list.map((ele, i) =>
      i === index
        ? {
            ...ele,
            subSection: ele?.subSection
              ? [...ele?.subSection, newSection]
              : [newSection],
          }
        : ele
    );
    onChange(updatedData);
  };
  const deleteSection = (index) => {
    const updatedData = list.filter((_, i) => i !== index);
    onChange(updatedData);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = list.map((ele, i) =>
      i === index ? { ...ele, [name]: value } : ele
    );
    onChange(updatedData);
  };
  const handleSubOptionsListChange = (subList, index) => {
    const updatedData = list.map((ele, i) =>
      i === index ? { ...ele, subSection: subList } : ele
    );

    onChange(updatedData);
  };
  return (
    <>
      {list.map((ele, index) => (
        <div key={ele}>
          <FormFields
            MAX_AllOWED_DEPTH={MAX_AllOWED_DEPTH}
            rootIndex={rootIndex + 1}
            ele={ele}
            index={index}
            addNewSection={addNewSection}
            handleChange={handleChange}
            deleteSection={deleteSection}
            handleSubOptionsListChange={handleSubOptionsListChange}
          />
        </div>
      ))}
    </>
  );
};

const FormFields = ({
  ele,
  index,
  handleChange,
  deleteSection,
  addNewSection,
  handleSubOptionsListChange,
  rootIndex,
  MAX_AllOWED_DEPTH,
}) => {
  const [toggle, setToggle] = useState(false);
  const [toggleAdd, setToggleAdd] = useState(false);
  const formStyle = {
    opacity: toggleAdd ? "1" : "0.65",
    borderLeft: toggleAdd ? "5px solid darkorange" : "",
    color: toggleAdd ? "blue" : "#222",
    fontSize: toggleAdd ? "16px" : "",
  };
  return (
    <>
      <div
        style={formStyle}
        onMouseEnter={() => setToggleAdd(true)}
        onMouseLeave={() => setToggleAdd(false)}
      >
        <div className="p-d-flex">
          <Button
            disabled={!ele?.subSection?.length}
            onClick={() => setToggle(!toggle)}
            className="p-button-text p-p-0 p-button-info"
            icon={`pi ${
              ele?.subSection?.length
                ? toggle
                  ? "pi-angle-down"
                  : "pi-angle-up"
                : ""
            }`}
          />
          <div className="p-grid" style={{ flex: "1" }}>
            <div className="p-col-12 p-md-5 p-xl-4 p-p-0">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="fa fa-star" aria-hidden="true"></i>
                </span>
                <InputText
                  autoComplete="off"
                  name="lableName"
                  onChange={(e) => handleChange(e, index)}
                  value={ele.lableName}
                  className="p-py-1"
                />

                {toggleAdd && (
                  <>
                    {rootIndex < MAX_AllOWED_DEPTH && (
                      <Button
                        disabled={!ele.lableName || !ele.lableUrl}
                        onClick={() => {
                          setToggle(true);
                          addNewSection(index);
                        }}
                        className="p-button-text p-p-0 p-button-info"
                        icon="pi pi-plus"
                      />
                    )}
                    <Button
                      onClick={() => deleteSection(index)}
                      className="p-button-text p-p-0 p-button-danger"
                      icon="pi pi-trash"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="p-col p-p-0">
              {toggleAdd && (
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="fa fa-link" aria-hidden="true"></i>
                  </span>
                  <InputText
                    autoComplete="off"
                    name="lableUrl"
                    onChange={(e) => handleChange(e, index)}
                    value={ele.lableUrl}
                    className="p-py-1"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-ml-4 p-mb-2">
        {ele?.subSection?.length > 0 && toggle && (
          <>
            <OptionList
              MAX_AllOWED_DEPTH={MAX_AllOWED_DEPTH}
              rootIndex={rootIndex}
              list={ele?.subSection || []}
              onChange={(subList) => handleSubOptionsListChange(subList, index)}
            />
          </>
        )}
      </div>
    </>
  );
};
