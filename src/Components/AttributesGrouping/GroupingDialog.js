import React, { useState, useEffect } from "react";

import { PickList } from "primereact/picklist";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import AttributeService from "../Service/AttributeService";

const initialState = {
  groupName: "",
  search: "",
  attributeList: "",
};

const GroupingDialog = (props) => {
  const { visible, setVisible, data = initialState } = props;
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const [form, setForm] = useState(data);

  const attributeService = new AttributeService();

  const onChange = (event) => {
    var ids = new Set(target.map((d) => d.attributeId));
    var merged = [
      ...target,
      ...event.target.filter((d) => !ids.has(d.attributeId)),
    ];

    setSource(event.source);
    setTarget(merged);
  };

  useEffect(() => {
    getAttributes();
  }, []);

  const getAttributes = () => {
    attributeService
      .getIngestionPoolDetails()
      .then((response) => {
        setSource(response.data);
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "updated failed",
        });
      });
  };

  const onsearchChange = (e) => {
    const value = e.target.value;
    setData(value);

    if (value === "") {
      getAttributes();
    } else {
      setSource(
        source.filter((ele) =>
          ele.displayName.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleUpdate = (row) => {
    const body = {
      groupId: form.groupId,
      groupName: form.groupName,
      attributeList: target,
      id: form.id,
    };

    attributeService
      .updateAttributes(body)
      .then((response) => {
        console.log(response.data);
        toast.current.show({
          severity: "success",
          summary: response.data,
        });
        getAllAttribues();
        getAttributes();
        setForm(initialState);
        setTarget([]);
        setEdit(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.current.show({
          severity: "error",
          summary: "update failed",
        });
      });
  };

  const handleSave = () => {
    const body = {
      groupName: form.groupName,
      attributeList: target,
    };
    attributeService
      .createAttributes(body)
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Added succesfully",
        });
        console.log(response.data);
        getAttributes();
        getAllAttribues();
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: error.response.data.message,
        });
      });

    setTarget([]);

    setForm(initialState);

    if (edit) {
      const body = { ...form };
      attributeService
        .updateAttributes(body)
        .then((response) => {
          console.log(response.data);
          toast.current.show({
            severity: "success",
            summary: "Updated successfully",
          });
          getAllAttribues();
          getAttributes();
          setForm(initialState);
          setEdit(false);
        })
        .catch((error) => {
          console.log(error.response);
          toast.current.show({
            severity: "error",
            summary: "update failed",
          });
        });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="p-grid  p-mt-2">
        <div>
          <div className="p-col-4">
            <b className="p-mt-3">GroupName</b>
            <span>:</span>
            <InputText
              name="groupName"
              value={form.groupName}
              onChange={(e) => handleFormChange(e)}
              id="GroupName"
              type="text"
              required
            />
          </div>

          <div className="p-col-4">
            {" "}
            <b className="p-mt-3">Search</b>
            <span>:</span>
            <InputText
              name="search"
              value={data}
              onChange={(e) => onsearchChange(e)}
              id="search"
              type="text"
              required
            />
          </div>
          <Button
            style={{
              borderRadius: "0px 15px 15px 0px",
              marginTop: "-42px",
              marginLeft: "12rem",
              position: "absolute",
            }}
            icon="pi pi-search"
            className="p-button-info"
          />
          <PickList
            source={source}
            target={target}
            itemTemplate={itemTemplate}
            sourceHeader="Available"
            targetHeader="Selected"
            showSourceControls={false}
            showTargetControls={false}
            style={{ width: "16rem" }}
            sourceStyle={{ height: "42px", width: "363px" }}
            targetStyle={{ height: "42px", width: "363px" }}
            onChange={onChange}
          ></PickList>
          {edit ? (
            <Button
              style={{
                marginTop: "45px",
                marginLeft: "26rem",
              }}
              label="Update"
              onClick={() => handleUpdate()}
              disabled={form.groupName === "" || target.length === 0}
              className="p-button-info"
            />
          ) : (
            <Button
              style={{
                marginTop: "44px",
                marginLeft: "26rem",
                marginBottom: "12px",
              }}
              label="Save"
              onClick={() => handleSave()}
              disabled={form.groupName === "" || target.length === 0}
              className="p-button-warning"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupingDialog;
