import React, { useEffect, useRef, useState } from "react";

import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import SidebarDesign from "./SidebarDesign";

import { MenuSetupConfigService } from "../Service/MenuSetupConfigService";
import { convertDateToString } from "../../utils/convertDateToString";
import { useHistory } from "react-router-dom";

const section = {
  lableName: "",
  lableUrl: "www.dolphinskart.com/",
};
const MenuSetup = ({ edit = false, config = null }) => {
  const initialState = {
    createdBy: "",
    createdDt: "",
    modifiedBy: "",
    modifiedDt: "",
    type: "search",
  };
  const history = useHistory();
  const menuSetupConfigService = new MenuSetupConfigService();
  const [form, setForm] = useState(initialState);
  const [menuSectionPair, setMenuSectionPair] = useState([]);

  const availableSearchTypes = [
    { value: "home", name: "Home" },
    { value: "search", name: "Search" },
    { value: "user", name: "User" },
  ];

  useEffect(() => {
    if (edit && config) {
      const type = Object.keys(config.menuSectionPair)[0];
      if (type !== "home") {
        setMenuSectionPair(config.menuSectionPair[type]);
      } else {
        const data = config.menuSectionPair[type].map((sec) => ({
          ...sec,
          subSection: sec.subSection.map((sub) => ({
            ...sub,
            subSection: sub.childSection,
          })),
        }));
        setMenuSectionPair(data);
      }
      setForm({ ...config, type });
    }
  }, [edit, config]);

  const handleSubmit = () => {
    let isFormValid = menuSectionPair.some(
      (ele) => !ele.lableUrl || !ele.lableName
    );

    if (!isFormValid) {
      let data = menuSectionPair;
      if (form.type !== "home")
        data = menuSectionPair.map((ele) => ({ ...ele, subSection: [] }));
      else {
        data = menuSectionPair.map((ele) => ({
          ...ele,
          subSection: ele.subSection.map((sub) => ({
            ...sub,
            childSection: sub.subSection,
          })),
        }));
      }
      let finalJson = {
        ...form,
        modifiedBy: "admin-1",
        modifiedDt: convertDateToString(new Date(), "dd-mm-yyyy HH:MM A"),
        menuSectionPair: { [form.type]: data },
      };
      if (edit) {
        menuSetupConfigService
          .updateMenuSetUpConfiguration(form.id, finalJson)
          .then((response) => {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: response.data,
            });
            history.push("/menuSetup");
          });
      } else {
        finalJson.createdBy = "admin-1";
        finalJson.createdDt = convertDateToString(
          new Date(),
          "dd-mm-yyyy HH:MM A"
        );

        menuSetupConfigService
          .addMenuSetUpConfiguration(finalJson)
          .then((response) => {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: response.data,
              life: 3000,
            });
            history.push("/menuSetup");
          });
      }
    } else {
      toast.current?.show({
        severity: "warn",
        summary: "There are empty fields!",
        detail:
          "Clear out empty cells or fill it up with respective data and Save again!",
        life: 5000,
      });
    }
  };

  const toast = useRef(null);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const renderConfig = () => {
    switch (form.type) {
      case "search":
        return (
          <SearchMenuConfig
            menuSectionPair={menuSectionPair}
            setMenuSectionPair={setMenuSectionPair}
          />
        );
      case "home":
        return (
          <SidebarDesign
            menuSectionPair={menuSectionPair}
            setMenuSectionPair={setMenuSectionPair}
          />
        );
      case "user":
        return (
          <SearchMenuConfig
            menuSectionPair={menuSectionPair}
            setMenuSectionPair={setMenuSectionPair}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="container">
      <Toast ref={toast} />

      <div className="p-grid p-ai-center">
        <div className="p-col-12 p-md-4 p-xl-2">
          <label>
            <b>Menu Setup Configuration</b> <i>for</i>
          </label>
        </div>
        <div className="p-col">
          <div className="p-d-flex p-ai-center" style={{ gap: "2rem" }}>
            {availableSearchTypes.map((type) => (
              <div
                key={type.value}
                className="p-field-radiobutton p-my-auto p-mr-1"
              >
                <RadioButton
                  id={type.value}
                  inputId={type.value}
                  name="type"
                  value={type.value}
                  onChange={handleOnChange}
                  checked={form.type === type.value}
                />
                <label htmlFor={type.value}>{type.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ minHeight: "320px" }}>{renderConfig()}</div>

      <div className="p-d-flex p-jc-between p-ai-center p-mt-4">
        <Button
          className="p-py-1 p-px-3 p-button-secondary"
          label="Cancel"
          onClick={() => history.push("/menuSetup")}
        />
        <Button
          className="p-py-1 p-px-3 p-button-success"
          label="Save"
          onClick={handleSubmit}
          disabled={menuSectionPair.length <= 0}
        />
      </div>
    </div>
  );
};

export default MenuSetup;

const SearchMenuConfig = ({ menuSectionPair, setMenuSectionPair }) => {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedValue = menuSectionPair.map((ele, i) =>
      i === index
        ? {
            ...ele,
            [name]: value,
          }
        : ele
    );
    setMenuSectionPair(updatedValue);
  };
  const handleDelete = (index) => {
    setMenuSectionPair(menuSectionPair.filter((ele, i) => i !== index));
  };
  return (
    <>
      {menuSectionPair.map((section, index) => (
        <div key={index} className="p-grid">
          <div className="p-col-12 p-xl-3 p-md-5 p-p-1">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="fa fa-star" aria-hidden="true"></i>
              </span>
              <InputText
                value={section.lableName}
                name="lableName"
                autoComplete="off"
                onChange={(e) => handleChange(e, index)}
                className="p-py-1"
              />
            </div>
          </div>
          <div className="p-col p-p-1">
            <div className="p-inputgroup ">
              <span className="p-inputgroup-addon">
                <i className="fa fa-link" aria-hidden="true"></i>
              </span>
              <InputText
                value={section.lableUrl}
                autoComplete="off"
                name="lableUrl"
                onChange={(e) => handleChange(e, index)}
                className="p-py-1"
              />
            </div>
          </div>
          <div className="p-col-12 p-p-1 p-md-1">
            <Button
              onClick={() => handleDelete(index)}
              className="p-button-danger p-py-1"
              icon="pi pi-trash"
            />
          </div>
        </div>
      ))}
      <div className="p-p-1">
        <Button
          className="p-button-info p-py-1 "
          icon="pi pi-plus"
          label="Add New Label"
          onClick={() =>
            setMenuSectionPair((prevState) => [
              ...prevState,
              { ...section, subSection: [] },
            ])
          }
        />
      </div>
    </>
  );
};
