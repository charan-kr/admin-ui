import React, { useEffect, useRef, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Link } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";

import CustomBreadcrumbs from "../CustomBreadCrumbs";

import SearchFilterService from "../Service/SearchFilterService";
import CategoryService from "../Service/categoryService";
import SubcategoryService from "../Service/subcategoryService";

const Table = () => {
  const [data, setData] = useState([]);
  const [selectedSearchFilter, setSelectedSearchFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const toast = useRef(null);
  const dt = useRef(null);

  const searchFilterService = new SearchFilterService();
  const categoryService = new CategoryService();
  const subCategoryService = new SubcategoryService();

  /* 
===============================================================	
OnSearchHandler functionality for retriving  data based on the search and values.
and get the data from api and then representing in the data table
================================================================
 */

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const fetchData = () => {
    searchFilterService
      .getAllSearchFilters()
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    categoryService.getAllCategories().then((res) => setCategories(res.data));

    subCategoryService
      .getAllsubCategories()
      .then((res) => setSubCategories(res.data));
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Link
          to={`/searchFilters/edit/${rowData.id}`}
          className="custom-router-link"
        >
          <Button
            icon="pi pi-pencil"
            className="p-button-text p-button-warning p-p-0"
          />
        </Link>
        <Button
          icon="pi pi-trash"
          className="p-button-text p-button-danger p-p-0"
          onClick={() => confirmDeleteHomeTemplate(rowData)}
        />
      </React.Fragment>
    );
  };

  /* 
==============================================================	
Ask the confirmation to delete the data.
==============================================================
 */

  const confirmDeleteHomeTemplate = (rowData) => {
    searchFilterService
      .deleteSearchFilter(rowData.id)
      .then((res) => {
        toast?.current?.show({
          severity: "success",
          summary: res.data,
        });
        setData(data.filter((ele) => ele.id !== rowData.id));
      })
      .catch((error) => {
        toast?.current?.show({
          severity: "error",
          summary: "Error Message",
          detail: "Problem with backend",
        });
      });
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link to={`/searchFilters/new`} className="custom-router-link">
          <Button
            label="Create New Search Filter"
            icon="pi pi-plus"
            className="p-button-info p-py-1"
          />
        </Link>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          onClick={() => fetchData()}
          className="p-button-text p-button-info p-p-0"
          icon="fa fa-refresh"
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of Search Filters</h3>
      <span className="p-input-icon-left p-d-none">
        <i className="pi pi-search" />
        <InputText
          type="search"
          // onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="p-py-1"
        />
      </span>
    </div>
  );
  const categoryTemplate = (rowData) => {
    const category = categories.find(
      (ele) => ele.categoryId === rowData.categoryId
    );
    return <>{<span>{category?.categoryName || rowData.categoryId}</span>}</>;
  };
  const subCategoryTemplate = (rowData) => {
    const subCategory = subCategories.find(
      (ele) => ele.subCategoryId === rowData.subCategoryId
    );
    return (
      <>
        {<span>{subCategory?.subCategoryName || rowData.subCategoryId}</span>}
      </>
    );
  };
  const activeBodyTemplate = (rowData) => {
    return (
      <Button
        className={`p-button-text p-p-0 p-button-${
          rowData.isActive === "true" ? "danger" : "success"
        }`}
        icon={
          rowData.isActive === "true" ? "pi pi-times" : "pi pi-check-circle"
        }
      />
    );
  };
  const breadcrumbs = [
    {
      label: "Search Filters",
      path: "/searchFilters",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <>
      <Toast ref={toast} />

      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />

      <Toolbar
        className="p-p-2"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      {
        <DataTable
          value={data}
          ref={dt}
          selection={selectedSearchFilter}
          onSelectionChange={(e) => setSelectedSearchFilter(e.value)}
          header={header}
          dataKey="id"
          paginator
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Search Filters"
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50]}
          className="p-datatable-gridlines p-datatable-sm p-mt-1"
        >
          <Column
            field="categoryId"
            body={categoryTemplate}
            header="Category"
          />
          <Column
            field="subCategoryId"
            body={subCategoryTemplate}
            header="Sub Category"
          />
          <Column field="createdBy" header="Created By" sortable />
          <Column field="createdDt" header="Created Date" sortable />
          <Column field="modifiedBy" header="Updated By" sortable />
          <Column field="modifiedDt" header="Updated Date" sortable />
          <Column
            field="isActive"
            header="Is Active"
            body={activeBodyTemplate}
            bodyClassName="p-text-center"
            style={{ width: "7rem" }}
            sortable
          />
          <Column body={actionBodyTemplate} style={{ width: "7rem" }} />
        </DataTable>
      }
    </>
  );
};

export default Table;
