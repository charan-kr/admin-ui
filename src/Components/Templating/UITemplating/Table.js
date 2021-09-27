import React, { useRef, useState, useEffect } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";

import SubcategoryService from "../../Service/subcategoryService";
import { InputTextarea } from "primereact/inputtextarea";
import UITemplateService from "./../../Service/UiTemplateService";

const initialState = {
  templateDescription: "",
  templateName: "",
  templateType: "item",
  numberOfRows: 1,
  numberOfColumns: 1,
  totalItemsPerPage: 1,
  subCategory: "",
};

function Table() {
  const [edit, setEdit] = useState(false);
  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState(initialState);
  const toast = useRef(null);

  const subcategoryService = new SubcategoryService();
  const uITemplateService = new UITemplateService();

  const [globalFilter, setGlobalFilter] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getAllCategory();

    getAllUITemplates();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getAllCategory = () => {
    subcategoryService
      .getAllsubCategories()
      .then((response) => {
        const newOption = response.data.map((item) => {
          return {
            label: `${item.subCategoryName} `,
            value: item.subCategoryId,
          };
        });
        setAvailableSubCategories(newOption);
      })
      .catch((error) => {
        console.log(error);
        toast.current.show({
          severity: "warn",
          summary: "Fetch failed",
        });
      });
  };

  const handleEdit = (rowData) => {
    setEdit(true);
    setForm(rowData);
    setVisible(true);
  };

  const handledelete = (row) => {
    uITemplateService.deleteUITemplate(row.templateId).then((response) => {
      const updateddata = data.filter(
        (ele) => ele.templateId !== row.templateId
      );
      toast?.current?.show({
        severity: "info",
        summary: "deleted succesfully",
        details: response.data,
      });
      setData(updateddata);
      setDeleteProductDialog(false);
    });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setForm((prevstate) => ({ ...prevstate, [name]: value }));
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "templateType" && value === "item")
      setForm((prevstate) => ({
        ...prevstate,
        numberOfColumns: 1,
        numberOfRows: 1,
        totalItemsPerPage: 1,
      }));
    setForm((prevstate) => ({ ...prevstate, [name]: value }));
  };
  const getAllUITemplates = () => {
    uITemplateService
      .getAllUITemplate()
      .then((res) => setData(res.data))
      .catch((error) => {
        console.log(error.response);
      });
  };
  const handleFormSubmit = () => {
    const {
      templateName,
      templateType,
      templateDescription,
      subCategory,
    } = form;
    if (
      !templateName ||
      !templateType ||
      !templateDescription ||
      !subCategory
    ) {
      toast?.current?.show({
        severity: "warn",
        summary: "Mandatory field missing",
      });
      return;
    }
    const body = {
      ...form,
      numberOfRows: parseInt(form.numberOfColumns) || 1,
      numberOfColumns: parseInt(form.numberOfRows) || 1,
    };
    body.totalItemsPerPage = body.numberOfColumns * body.numberOfRows || 1;
    if (edit) {
      uITemplateService.updateUITemplate(body.templateId, body).then((res) => {
        setData(
          data.map((ele) => (ele.templateId === body.templateId ? body : ele))
        );
        toast?.current?.show({
          severity: "success",
          summary: JSON.stringify(res.data),
        });
        closeDialog();
      });
    } else {
      console.log(body);
      uITemplateService
        .createUITemplate(body)
        .then((res) => {
          getAllUITemplates();
          toast?.current?.show({
            severity: "success",
            summary: JSON.stringify(res.data),
          });
          closeDialog();
        })
        .catch((error) => {
          toast?.current?.show({
            severity: "error",
            summary: JSON.stringify(error?.response?.message?.data),
          });
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevstate) => ({
      ...prevstate,
      [name]: value,
      //   subCategory: CapitalizeString(value),
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
          label="Add New UI Template"
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
          onClick={() => handledelete(rowData)}
          className="p-button-text p-p-0 p-button-danger"
          icon="pi pi-trash"
        />
      </>
    );
  };
  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of UI Templating</h3>
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
  };
  return (
    <React.Fragment>
      <Toast ref={toast} />
      <Dialog
        style={{ width: "40%" }}
        visible={visible}
        onHide={closeDialog}
        focusOnShow={false}
        header={
          edit ? (
            <span>Update UI Template</span>
          ) : (
            <span>Add New UI Template</span>
          )
        }
      >
        <div>
          <div className="p-grid">
            <div className="p-col-4">
              <label htmlFor="subCategory">
                <b> Sub Category</b>{" "}
                <span className="p-error p-invalid">*</span>
              </label>
            </div>
            <div className="p-col">
              <Dropdown
                filter
                filterBy="label"
                name="subCategory"
                id="subCategory"
                className="p-inputgroup"
                placeholder="-- Select Sub Category --"
                options={availableSubCategories}
                value={form.subCategory}
                optionLabel="label"
                optionValue="label"
                onChange={(e) => handleDropdownChange(e)}
              />
            </div>
          </div>
          <div className="p-grid">
            <div className="p-col-4">
              <label htmlFor="templateName">
                <b> Template Name</b>{" "}
                <span className="p-error p-invalid">*</span>
              </label>
            </div>
            <div className="p-col">
              <InputText
                name="templateName"
                id="templateName"
                value={form.templateName}
                onChange={(e) => handleChange(e)}
                className="p-inputgroup"
                placeholder="Enter Template Name"
              />
            </div>
          </div>
          <div className="p-grid">
            <div className="p-col-4">
              <label htmlFor="templateName">
                <b> Template Description</b>{" "}
                <span className="p-error p-invalid">*</span>
              </label>
            </div>
            <div className="p-col">
              <InputTextarea
                name="templateDescription"
                id="templateDescription"
                value={form.templateDescription}
                onChange={handleChange}
                className="p-inputgroup"
                placeholder="Enter Template Description"
              />
            </div>
          </div>
          <div className="p-grid">
            <div className="p-col-4">
              <label htmlFor="templateType">
                <b> Type</b> <span className="p-error p-invalid">*</span>
              </label>
            </div>
            <div className="p-col">
              <Dropdown
                name="templateType"
                id="templateType"
                placeholder="-- Select Type --"
                className="p-inputgroup p-text-capitalize"
                options={["item", "search"]}
                value={form.templateType}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </div>
          {form.templateType === "search" && (
            <>
              <div className="p-grid">
                <div className="p-col-4">
                  <label htmlFor="numberOfColumns">
                    <b> Column Count</b>
                    <span className="p-error p-invalid p-ml-1">*</span>
                  </label>
                </div>
                <div className="p-col">
                  <InputText
                    min={1}
                    type="number"
                    name="numberOfColumns"
                    id="numberOfColumns"
                    value={form.numberOfColumns}
                    onChange={handleChange}
                    className="p-inputgroup"
                  />
                </div>
              </div>
              <div className="p-grid">
                <div className="p-col-4">
                  <label htmlFor="numberOfRows">
                    <b> Row Count</b>
                    <span className="p-error p-invalid p-ml-1">*</span>
                  </label>
                </div>
                <div className="p-col">
                  <InputText
                    min={1}
                    type="number"
                    name="numberOfRows"
                    id="numberOfRows"
                    value={form.numberOfRows}
                    onChange={handleChange}
                    className="p-inputgroup"
                  />
                </div>
              </div>
              <div className="p-grid">
                <div className="p-col-4">
                  <label htmlFor="totalItemsPerPage">
                    <b> Total Items/Page</b>
                    <span className="p-error p-invalid p-ml-1">*</span>
                  </label>
                </div>
                <div className="p-col">
                  <InputText
                    type="number"
                    disabled
                    name="totalItemsPerPage"
                    id="totalItemsPerPage"
                    value={form.numberOfRows * form.numberOfColumns}
                    className="p-inputgroup"
                  />
                </div>
              </div>
            </>
          )}
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
          dataKey="templateId"
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-sm p-datatable-gridlines p-mt-0"
        >
          <Column
            field="subCategory"
            header="Sub Category"
            filter
            filterPlaceholder="search by name"
            sortable
            sortField="subCategory"
          />
          <Column
            field="templateName"
            header="Name"
            filter
            filterPlaceholder="search by name"
            sortable
            sortField="templateName"
          />
          <Column
            field="templateType"
            header="Type"
            filter
            filterPlaceholder="search by Type"
            sortable
            sortField="templateType"
            style={{ width: "10rem" }}
          />
          <Column
            field="numberOfColumns"
            header="Column count"
            filter
            filterPlaceholder="search by column count"
            sortable
            sortField="numberOfColumns"
            style={{ width: "10rem" }}
          />
          <Column
            field="numberOfRows"
            header="Row count"
            filter
            filterPlaceholder="search by row count"
            sortable
            sortField="numberOfRows"
            style={{ width: "10rem" }}
          />
          <Column
            field="totalItemsPerPage"
            header="Items/Page"
            filter
            filterPlaceholder="search by items count"
            sortable
            sortField="totalItemsPerPage"
            style={{ width: "10rem" }}
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
                Are you sure you want to delete <b>{form.templateName}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </React.Fragment>
  );
}
export default Table;
