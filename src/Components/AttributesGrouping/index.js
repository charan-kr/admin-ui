import React, { useState, useEffect, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Chip } from "primereact/chip";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { ListBox } from "primereact/listbox";
import { ScrollPanel } from "primereact/scrollpanel";

import AttributeService from "../Service/AttributeService";
import IngestionPoolService from "../Service/IngestionPoolService";
import CustomBreadcrumbs from "../CustomBreadCrumbs";
import { useToast } from "../../hooks/useToast";

const initialState = {
  groupName: "",
  search: "",
  selectedAttrbiutes: "",
};

const AttributesGrouping = () => {
  const toast = useToast();
  const attributeService = new AttributeService();
  const ingestionPoolService = new IngestionPoolService();

  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const [form, setForm] = useState(initialState);
  const [data, setData] = useState();

  const [table, setTable] = useState([]);
  const [edit, setEdit] = useState(false);

  const [deleteAttributeDialog, setDeleteAttributeDialog] = useState(false);

  const [attribute, setAttribute] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getAttributes();
    getAllAttributeGroupings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const onChange = (event) => {
  //   setSource(event.source);
  //   setTarget(event.target);
  // };

  const handleEdit = (data) => {
    setForm(data);
    setEdit(true);

    setSource(
      source.filter(
        (ele) =>
          !data.attributeList
            .map((e) => e.attributeId)
            .includes(ele.attributeId)
      )
    );
    setTarget(data.attributeList);
    setVisible(true);
  };

  const handleDelete = () => {
    attributeService
      .deleteAttributes(attribute)
      .then((response) => {
        toast({
          severity: "success",
          summary: response.data,
        });
        getAttributes();
        getAllAttributeGroupings();
        setDeleteAttributeDialog(false);
      })
      .catch((error) => {
        console.log(error);
        toast({
          severity: "error",
          summary: "Error Message",
          detail: "Method not Allowed",
        });
      });
  };

  const hideDeleteAttributeDialog = () => {
    setDeleteAttributeDialog(false);
  };

  const confirmDeleteAttribute = (attribute) => {
    setAttribute(attribute);
    setDeleteAttributeDialog(true);
  };

  const attributeTempalte = (rowData) => {
    const MAX_ATTRIBUTES_TO_DISPLAY = 12;
    const list = rowData.attributeList.slice(0, MAX_ATTRIBUTES_TO_DISPLAY);
    const showMore = rowData.attributeList.length > 12;

    function popUpAttributeInfo() {
      setSelectedAttrbiuteGroup(rowData);
      setAttributeInfo(true);
    }

    return (
      <div>
        {list.map((ele) => (
          <Chip className="p-m-1" key={ele.id} label={ele.displayName} />
        ))}
        {showMore && (
          <Button
            className="p-p-0 p-button-text p-button-info"
            label="...more"
            onClick={popUpAttributeInfo}
          />
        )}
      </div>
    );
  };

  const getAttributes = () => {
    ingestionPoolService.getIngestionPoolDetails().then((response) => {
      setSource(response.data);
    });
  };

  const getAllAttributeGroupings = () => {
    attributeService.getAttribures().then((response) => {
      toast({
        severity: "success",
        summary: "Retrieved succesfully",
      });
      setTable(response.data);
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

  const handleUpdate = () => {
    const body = {
      groupId: form.groupId,
      groupName: form.groupName,
      attributeList: target,
      id: form.id,
    };

    attributeService
      .updateAttributes(body)
      .then((response) => {
        toast({
          severity: "success",
          summary: response.data,
        });
        getAllAttributeGroupings();
        setForm(initialState);
        setEdit(false);
        closeDialog();
      })
      .catch(() => {
        toast({
          severity: "error",
          summary: "update failed",
        });
      });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const body = {
      groupName: form.groupName,
      attributeList: target,
    };
    attributeService
      .createAttributes(body)
      .then(() => {
        toast({
          severity: "success",
          summary: "Added succesfully",
        });
        getAllAttributeGroupings();
        closeDialog();
      })
      .catch((error) => {
        toast({
          severity: "error",
          summary: error?.response?.data?.message,
        });
      });
  };

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="Create New Attribute Group"
          icon="pi pi-plus"
          className="p-button-info p-py-1 p-px-3"
          onClick={() => setVisible(true)}
        />
      </>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          onClick={() => handleEdit(rowData)}
          className="p-button-text p-p-0 p-button-warning"
          icon="pi pi-pencil"
        />
        <Button
          onClick={() => confirmDeleteAttribute(rowData)}
          className="p-button-text p-p-0 p-button-danger"
          icon="pi pi-trash"
        />
      </>
    );
  };

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteAttributeDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={handleDelete}
      />
    </React.Fragment>
  );

  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of Attribute Group's</h3>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="p-py-1"
        />
      </span>
    </div>
  );

  const closeDialog = () => {
    setVisible(false);
    setForm(initialState);
    setTarget([]);
    setData("");
    getAttributes();
  };
  const breadcrumbs = [
    {
      label: "Attribute Config",
      path: "/attributesGrouping",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  const [selectedAttrbiuteGroup, setSelectedAttrbiuteGroup] = useState(null);
  const [attributeInfo, setAttributeInfo] = useState(false);
  const nonDisplaychipTemplate = (attribute) => {
    function removeAttribute() {
      setTarget(
        target.filter((ele) => ele.attributeId !== attribute.attributeId)
      );
    }
    return (
      <span style={{ position: "relative" }}>
        <Chip label={attribute.displayName} className="p-pr-5 p-m-1" />
        <i
          style={{
            position: "absolute",
            fontSize: "1.25rem",
            right: "10px",
            top: "2px",
            cursor: "pointer",
            color: "#444",
          }}
          className="fa fa-times-circle "
          aria-hidden="true"
          onClick={removeAttribute}
        ></i>
      </span>
    );
  };

  return (
    <div>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />

      <Dialog
        style={{ width: "50%", maxHeight: "75%" }}
        visible={attributeInfo}
        onHide={() => setAttributeInfo(false)}
        focusOnShow={false}
        header={`${selectedAttrbiuteGroup?.groupName} (${selectedAttrbiuteGroup?.attributeList?.length} attributes)`}
      >
        {selectedAttrbiuteGroup && (
          <div>
            {selectedAttrbiuteGroup.attributeList.map((ele) => (
              <Chip className="p-m-1" key={ele.id} label={ele.displayName} />
            ))}
          </div>
        )}
      </Dialog>
      <Dialog
        style={{ width: "50%" }}
        visible={visible}
        onHide={closeDialog}
        focusOnShow={false}
        header={
          edit ? (
            <span>Update Attribute Group</span>
          ) : (
            <span>Add New Attribute Group</span>
          )
        }
      >
        <div>
          <div className="p-grid p-ai-center">
            <div className="p-col-12 p-md-4 p-xl-2  p-pl-0">
              <label>GroupName</label>
            </div>
            <div className="p-col p-fluid">
              <InputText
                className="p-mx-2"
                name="groupName"
                value={form.groupName}
                onChange={(e) => handleFormChange(e)}
                id="GroupName"
                type="text"
                required
              />
            </div>

            <div className="p-d-none p-col-12 p-md-6 p-fluid p-pr-0">
              <label>Search</label>
              <InputText
                name="search"
                value={data}
                onChange={(e) => onsearchChange(e)}
                id="search"
                type="text"
                required
              />
            </div>
          </div>
          <div className="p-grid">
            <div className="p-col-5">
              <div className="p-inputgroup">
                <ListBox
                  value={target}
                  options={source}
                  onChange={(e) => setTarget(e.value)}
                  multiple
                  optionLabel="displayName"
                  filter
                  listStyle={{ height: "200px" }}
                />
              </div>
            </div>
            <div className="p-col">
              <ScrollPanel style={{ width: "100%", height: "260px" }}>
                {target.map((attribute) => (
                  <span>{nonDisplaychipTemplate(attribute)}</span>
                ))}
              </ScrollPanel>
            </div>
          </div>

          <div className="p-text-right p-mt-4">
            <Button
              className="p-button-info p-py-1 p-px-4"
              label={edit ? "Update" : "Save"}
              onClick={() => (edit ? handleUpdate() : handleSave())}
              disabled={form.groupName === "" || target.length === 0}
            />
          </div>
        </div>
      </Dialog>

      <div>
        <Toolbar className="p-mb-1 p-p-2" left={leftToolbarTemplate} />
        <DataTable
          value={table}
          dataKey="groupId"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-sm p-datatable-gridlines p-mt-0"
        >
          <Column
            field="groupName"
            header="Group Name"
            sortable
            sortField="groupName"
            style={{ width: "15rem" }}
          />
          <Column
            header="No of Attr."
            style={{ width: "7rem" }}
            bodyClassName="p-text-center"
            body={(rowData) => <span>{rowData.attributeList.length}</span>}
          />
          <Column
            header="Attribute List"
            body={attributeTempalte}
            sortable
            sortField="attributeList.displayName"
          />
          <Column body={actionBodyTemplate} style={{ width: "7rem" }} />
        </DataTable>
      </div>

      <Dialog
        visible={deleteAttributeDialog}
        header="Confirm"
        modal
        focusOnShow={false}
        closable={false}
        footer={deleteProductDialogFooter}
        onHide={hideDeleteAttributeDialog}
      >
        <div className="p-d-flex p-ai-center">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>
            Are you sure you want to delete <b>{attribute?.groupName}</b>?
          </span>
        </div>
      </Dialog>
    </div>
  );
};

export default AttributesGrouping;
