import React, { useRef, useState, useEffect } from "react";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { confirmPopup } from "primereact/confirmpopup";
import { Dialog } from "primereact/dialog";

import { useToast } from "../../hooks/useToast";

import Categoryservice from "../Service/categoryService";
import SubcategoryService from "../Service/subcategoryService";

import { convertStringToDate } from "../../utils/convertStringToDate";
import { convertDateToString } from "../../utils/convertDateToString";

const initialState = {
  categoryId: "",
  subCategoryName: "",
  subCategoryKey: "",
  isActive: true,
  validTo: "",
  validFrom: "",
  subcategoryid: "",
};

function SubCategoryTemplate() {
  const [edit, setEdit] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState(initialState);
  const [validFrom, setValidFrom] = useState(null);
  const [validTo, setValidTo] = useState(null);
  const toast = useToast();
  const categoryservice = new Categoryservice();
  const subcategoryService = new SubcategoryService();

  const [globalFilter, setGlobalFilter] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getAllCategory();

    getAllsub();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getAllCategory = () => {
    const config = {
      headers: {},
    };

    categoryservice.getAllActiveCategories(config).then((response) => {
      const newOption = response.data.map((item) => {
        return {
          label: `${item.categoryName} `,
          value: item.categoryId,
        };
      });
      setAvailableCategories(newOption);
    });
  };

  const activeField = (row) => {
    const isActive = row.isActive;

    return (
      <Button
        onClick={(e) => confirm(e, row.subCategoryId)}
        className={`p-button-text p-p-0 p-button-${
          !isActive ? "danger" : "success"
        }`}
        icon={!isActive ? "pi pi-times" : "pi pi-check-circle"}
      />
    );
  };
  function confirmStatusUpdate(id) {
    subcategoryService.updateStatus(id).then(() => {
      getAllsub();
      toast({
        severity: "success",
        summary: "Updated Active Flag",
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
    setValidFrom(convertStringToDate(rowData.validFrom, "dd-mm-yyyy HH:MM A"));
    setValidTo(convertStringToDate(rowData.validTo, "dd-mm-yyyy HH:MM A"));
    setForm(rowData);
    setForm((prevstate) => ({
      ...prevstate,
      categoryName: rowData.categoryId,
    }));
    setVisible(true);
  };

  const handledelete = (row) => {
    subcategoryService
      .deletesubCategory(row.subCategoryId)
      .then((response) => {
        const updateddata = data.filter(
          (ele) => ele.subCategoryId !== row.subCategoryId
        );
        toast({
          severity: "success",
          summary: "deleted succesfully",
          details: response.data,
        });
        setData(updateddata);
        setDeleteProductDialog(false);
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

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setForm((prevstate) => ({ ...prevstate, [name]: value }));
    console.log(setForm);
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevstate) => ({ ...prevstate, [name]: value }));
  };
  const getAllsub = () => {
    subcategoryService
      .getAllsubCategories()
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        toast({
          severity: "warn",
          summary: "Fetch failed",
        });
      });
  };
  const handleFormSubmit = () => {
    const { categoryName, subCategoryName, subCategoryKey } = form;
    if (
      !categoryName ||
      !subCategoryName ||
      !subCategoryKey ||
      !validFrom ||
      !validTo
    ) {
      toast({
        severity: "warn",
        summary: "Mandatory field missing",
      });
      return;
    }

    if (edit) {
      const body = {
        ...form,
        categoryId: form.categoryName,
        validFrom: convertDateToString(validFrom, "dd-mm-yyyy HH:MM A"),
        validTo: convertDateToString(validTo, "dd-mm-yyyy HH:MM A"),
      };
      subcategoryService.updatesubCategory(body).then(() => {
        toast({
          severity: "success",
          summary: "Updated successfully",
        });
        getAllsub();
        closeDialog();
      });
    } else {
      const body = {
        isActive: true,
        subCategoryKey: form.subCategoryKey,
        subCategoryName: form.subCategoryName,
        categoryId: form.categoryName,
        validTo: convertDateToString(validTo, "dd-mm-yyyy HH:MM A"),
        validFrom: convertDateToString(validFrom, "dd-mm-yyyy HH:MM A"),
      };

      subcategoryService
        .createsubCategory(body)
        .then(() => {
          toast({
            severity: "success",
            summary: "created successfully",
          });
          getAllsub();
          closeDialog();
        })

        .catch((error) => {
          toast({
            severity: "error",
            summary: `${error.response.data.message}`,
          });
        });
    }
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

  const categorytemplate = (rowData) => {
    return (
      <span>
        {
          availableCategories.find(
            (category) => category.value === rowData.categoryId
          )?.label
        }
      </span>
    );
  };
  const CapitalizeString = (value) => {
    console.log(value);
    return value.replace(/\b\w/g, (l) => l.toUpperCase());
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevstate) => ({
      ...prevstate,
      [name]: value,
      subCategoryKey: camelCase(value),
      subCategoryName: CapitalizeString(value),
    }));
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={(row) => handledelete(row)}
      />
    </React.Fragment>
  );
  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="Add New Sub Category"
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
      message: "Do you want to Delete this subcategory?",
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
          disabled={!rowData.isActive}
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
      <h3 className="p-m-0">List of Sub Categories</h3>
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
    setEdit(false);
    setForm(initialState);
    setValidFrom(null);
    setValidTo(null);
  };
  return (
    <React.Fragment>
      <Dialog
        style={{ width: "30%" }}
        visible={visible}
        onHide={closeDialog}
        focusOnShow={false}
        header={
          edit ? (
            <span>Update Sub Category</span>
          ) : (
            <span>Add New Sub Category</span>
          )
        }
      >
        <div>
          <div className="p-grid">
            <div className="p-col-4">
              <label htmlFor="CategoryValue">
                <b> Category</b>
              </label>
            </div>
            <div className="p-col">
              <Dropdown
                disabled={edit}
                name="categoryName"
                id="categoryName"
                placeholder="select Category"
                options={availableCategories}
                value={form.categoryName}
                optionLabel="label"
                optionValue="value"
                onChange={(e) => handleDropdownChange(e)}
              />
            </div>
          </div>
          <div className="p-grid">
            <div className="p-col-4">
              <label htmlFor="isActive">
                <b className=""> isEnable?</b>
              </label>
            </div>
            <div className="p-col">
              <Dropdown
                name="isActive"
                id="isActive"
                placeholder="-- select -- "
                options={[
                  { value: true, name: "True" },
                  { value: false, name: "False" },
                ]}
                optionValue="value"
                optionLabel="name"
                value={form.isActive}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className="p-grid">
            <div className="p-col-4">
              <label htmlFor="CategoryValue">
                <b> Display Name</b>
              </label>
            </div>
            <div className="p-col">
              <InputText
                name="subCategoryName"
                id="subCategoryName"
                value={form.subCategoryName}
                onChange={(e) => handleChange(e)}
                className="p-inputgroup"
              />
            </div>
          </div>
          <div className="p-grid">
            <div className="p-col-4">
              <label htmlFor="CategoryValue">
                <b> Valid From</b>
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
              <label htmlFor="CategoryValue">
                <b>Valid To</b>
              </label>
            </div>
            <div className="p-col">
              <Calendar
                value={validTo}
                //minDate={validFrom}
                minDate={validFrom !== validTo && validFrom}
                showIcon
                showTime
                hourFormat="12"
                hideOnDateTimeSelect
                dateFormat="yy/mm/dd"
                onChange={(e) => setValidTo(e.value)}
              />
            </div>
          </div>
        </div>

        <div className="p-d-flex p-ai-center p-jc-between p-mt-3">
          <Button
            onClick={closeDialog}
            className={` p-py-1 p-px-3 p-button-secondary`}
            label="Cancel"
          />
          <Button
            onClick={() => handleFormSubmit()}
            className={` p-py-1 p-px-3 p-button-success`}
            label={!edit ? "Add " : "Update "}
          />
        </div>
      </Dialog>
      <div>
        <Toolbar className="p-mb-1 p-p-2" left={leftToolbarTemplate} />

        <DataTable
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
            field="categoryId"
            header="Category"
            body={categorytemplate}
            filter
            filterPlaceholder="search by category"
            sortable
            sortField="categoryId"
          />
          <Column
            field="subCategoryName"
            header="Sub Category"
            filter
            filterPlaceholder="search by sub category"
            sortable
            sortField="subCategoryName"
          />

          <Column
            field="validFrom"
            header="Valid From"
            filter
            filterPlaceholder="search"
            sortable
            sortField="validFrom"
          />
          <Column
            field="validTo"
            header="Valid To"
            filter
            filterPlaceholder="search"
            sortable
            sortField="validTo"
          />
          <Column
            body={activeField}
            header="Active"
            style={{ width: "7rem" }}
            className="p-text-center"
          />
          <Column body={actionBodyTemplate} style={{ width: "7rem" }} />
        </DataTable>
        <Dialog
          visible={deleteProductDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {form && (
              <span>
                Are you sure you want to delete <b>{form.subCategoryName}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </React.Fragment>
  );
}
export default SubCategoryTemplate;
