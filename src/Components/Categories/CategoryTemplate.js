import React, { useState, useRef, useEffect } from "react";

import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { confirmPopup } from "primereact/confirmpopup";

import Categoryservice from "../Service/categoryService";
import { convertStringToDate } from "../../utils/convertStringToDate";
import { convertDateToString } from "../../utils/convertDateToString";
function CategoryTemplate() {
  const initialState = {
    categoryName: "",
    CategoryId: "",
    categoryKey: "",
    isActive: true,
    validTo: "",
    validFrom: "",
  };

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState(initialState);
  const [validFrom, setValidFrom] = useState(new Date());
  const [validTo, setValidTo] = useState(new Date());
  const toast = useRef(null);
  const [selectedDate, setSelectedDate] = useState(false);
  const dt = useRef(null);
  const categoryservice = new Categoryservice();
  const options = [
    {
      name: "true",
      value: true,
    },
    {
      name: "false",
      value: false,
    },
  ];
  const [globalFilter, setGlobalFilter] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getAllCategory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getAllCategory = () => {
    categoryservice
      .getAllCategories()
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        toast?.current?.show({
          severity: "warn",
          summary: "Fetch failed",
        });
      });
  };

  const activeBodyTemplate = (row) => {
    const isActive = row.isActive;

    return (
      <Button
        onClick={(e) => confirm(e, row.categoryId)}
        className={`p-button-text p-p-0 p-button-${
          !isActive ? "danger" : "success"
        }`}
        icon={!isActive ? "pi pi-times" : "pi pi-check-circle"}
      />
    );
  };
  function confirmStatusUpdate(id) {
    categoryservice
      .updateStatus(id)
      .then(() => {
        getAllCategory();
        toast?.current?.show({
          severity: "success",
          summary: "Updated Active Flag",
        });
      })
      .catch(() => {
        toast?.current?.show({
          severity: "error",
          summary: "Update Failed",
        });
      });
  }
  const confirm = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to Update active status?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => confirmStatusUpdate(id),
    });
  };
  const handleEdit = (rowData) => {
    setEdit(true);
    setForm(rowData);
    setValidFrom(convertStringToDate(rowData.validFrom, "dd-mm-yyyy HH:MM A"));
    setValidTo(convertStringToDate(rowData.validTo, "dd-mm-yyyy HH:MM A"));
    setVisible(true);
  };
  const handledelete = (row) => {
    categoryservice
      .DeleteCategory(row)
      .then((response) => {
        toast?.current?.show({
          severity: "success",
          summary: "deleted succesfully",
          details: response.data,
        });
        getAllCategory();
      })
      .catch(() => {
        toast?.current?.show({
          severity: "error",
          summary: "Error Message",
          detail: "Method not Allowed",
        });
      });
  };
  const CapitalizeString = (word) => {
    console.log(word);
    return word.replace(/\b\w/g, (l) => l.toUpperCase());
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevstate) => ({ ...prevstate, [name]: value }));
  };

  const handleFormSubmit = (row) => {
    const { categoryName, categoryKey } = form;
    if (!categoryName || !categoryKey || !validTo || !validFrom) {
      toast?.current?.show({
        severity: "warn",
        summary: "Mandatory field missing",
      });
      return;
    }

    const body = {
      categoryKey: form.categoryKey,
      categoryName: form.categoryName,
      validFrom: convertDateToString(validFrom, "dd-mm-yyyy HH:MM A"),
      validTo: convertDateToString(validTo, "dd-mm-yyyy HH:MM A"),
    };
    if (edit) {
      const data = {
        ...form,
        ...body,
      };

      categoryservice
        .updateCategory(data)
        .then(() => {
          toast?.current?.show({
            severity: "success",
            summary: "Updated successfully",
          });
          setEdit(false);
          getAllCategory();
          closeDialog();
        })
        .catch(() => {
          toast.current.show({
            severity: "error",
            summary: "update failed",
          });
        });
    } else {
      const data = {
        ...form,
        ...body,
      };

      categoryservice
        .createCategory(data)
        .then(() => {
          toast?.current?.show({
            severity: "success",
            summary: "updated succesfully",
          });

          getAllCategory();
          closeDialog();
        })
        .catch(() => {
          toast.current.show({
            severity: "warn",
            summary: "updated failed",
          });
        });
    }
  };
  const onDateChange = (e) => {
    dt.current.filter(e.value, "date", "custom");
    setSelectedDate(e.value);
  };

  const dateFilter = (
    <Calendar
      value={selectedDate}
      onChange={onDateChange}
      dateFormat="yy-mm-dd"
      className="p-column-filter"
      placeholder="Date"
    />
  );

  const formatDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    return date.getFullYear() + "-" + month + "-" + day;
  };

  const filterDate = (value, filter) => {
    if (
      filter === undefined ||
      filter === null ||
      (typeof filter === "string" && filter.trim() === "")
    ) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return value === formatDate(filter);
  };

  const camelCase = (value) => {
    return value
      .split(" ")
      .map((ele) => ele.toLowerCase())
      .map((ele, index) =>
        index > 0
          ? ele.slice(0, 1).toUpperCase() + ele.slice(1, ele.length)
          : ele
      )
      .join("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevstate) => ({
      ...prevstate,
      [name]: value,
      categoryKey: camelCase(value),
      categoryName: CapitalizeString(value),
    }));
  };
  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="Add New Category"
          icon="pi pi-plus"
          className="p-button-info p-py-1 p-px-3"
          onClick={() => setVisible(true)}
        />
      </>
    );
  };

  const confirmDelete = (event, data) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this category?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handledelete(data),
    });
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
          onClick={(e) => confirmDelete(e, rowData)}
          className="p-button-text p-p-0 p-button-danger"
          icon="pi pi-trash"
        />
      </>
    );
  };
  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of Categories</h3>
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
    setValidFrom(null);
    setValidTo(null);
  };

  return (
    <div>
      <Toast ref={toast} />
      <Dialog
        style={{ minWidth: "30%" }}
        visible={visible}
        onHide={closeDialog}
        focusOnShow={false}
        header={
          edit ? <span>Update Category</span> : <span>Add New Category</span>
        }
      >
        <div className="p-grid">
          <div className="p-col-4 ">
            <label htmlFor="categoryName">
              <b>Display Name</b>
            </label>
          </div>
          <div className="p-col">
            <InputText
              id="categoryName"
              type="text"
              className="p-inputgroup"
              value={form.categoryName}
              name="categoryName"
              onChange={(e) => handleChange(e)}
            />
            <div style={{ color: "#999" }}>
              <span>displayKey : {form.categoryKey}</span>
            </div>
          </div>
        </div>
        <div className="p-grid p-d-none">
          <div className="p-col-4">
            <label htmlFor="CategoryValue">
              <b>Key</b>
            </label>
          </div>
          <div className="p-col">
            <InputText
              id="CategorKey"
              name="categoryKey"
              value={form.categoryKey}
              required="true"
              disabled
              className="p-inputgroup"
            />
          </div>
        </div>
        <div className="p-grid p-ai-center">
          <div className="p-col-4">
            <label htmlFor="End date">
              <b>Is Enable?</b>
            </label>
          </div>
          <div className="p-col">
            <Dropdown
              name="isActive"
              id="isActive"
              placeholder="select Status"
              options={[
                { value: true, label: "True" },
                { value: false, label: "False" },
              ]}
              optionLabel="label"
              optionValue="value"
              value={form.isActive}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
        </div>
        <div className="p-grid">
          <div className="p-col-4">
            <label htmlFor="Start date">
              <b>Valid From</b>
            </label>
          </div>
          <div className="p-col">
            <Calendar
              value={validFrom}
              hourFormat="12"
              hideOnDateTimeSelect
              dateFormat="dd/mm/yy"
              showIcon
              showTime
              showAM
              onChange={(e) => setValidFrom(e.value)}
            />
          </div>
        </div>
        <div className="p-grid">
          <div className="p-col-4">
            <label htmlFor="End date">
              <b>Valid To</b>
            </label>
          </div>
          <div className="p-col">
            <Calendar
              value={validTo}
              // minDate={validFrom}
              showIcon
              showTime
              filterElement={dateFilter}
              filterFunction={filterDate}
              hourFormat="12"
              //minDate={validFrom !== validTo && validFrom}
              hideOnDateTimeSelect
              dateFormat="dd/mm/yy"
              onChange={(e) => setValidTo(e.value)}
            />
          </div>
        </div>
        <div className="p-d-flex p-ai-center p-jc-between p-mt-3">
          <Button
            onClick={closeDialog}
            className={`p-py-1 p-px-3 p-button-secondary`}
            label="Cancel"
          />
          <Button
            onClick={() => handleFormSubmit()}
            className={`p-py-1 p-px-3  p-button-${!edit ? "success" : "info"}`}
            label={!edit ? "Save" : "Update"}
          />
        </div>
      </Dialog>
      <Toolbar className="p-mb-1 p-p-2" left={leftToolbarTemplate} />
      <DataTable
        ref={dt}
        value={data}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        globalFilter={globalFilter}
        header={header}
        className="p-datatable-sm p-datatable-gridlines p-mt-0"
      >
        <Column
          field="categoryName"
          sortable
          sortField="categoryName"
          header=" Display Name"
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          field="categoryKey"
          sortable
          sortField="categoryKey"
          header="Key"
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          field="validFrom"
          header="Valid From"
          filter
          filterPlaceholder="Search by Date"
          sortable
          sortField="validFrom"
        />
        <Column
          field="validTo"
          header="Valid To"
          filter
          sortable
          sortField="validTo"
          filterPlaceholder="Search by Date"
        />
        <Column
          style={{ width: "10rem" }}
          body={activeBodyTemplate}
          header="Active"
          bodyClassName="p-text-center"
        />

        <Column body={actionBodyTemplate} style={{ width: "7rem" }} />
      </DataTable>
    </div>
  );
}
export default CategoryTemplate;
