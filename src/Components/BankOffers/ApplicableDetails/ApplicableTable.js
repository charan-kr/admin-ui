import React, { useEffect, useState, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import CustomBreadcrumbs from "../../CustomBreadCrumbs";

import SearchDBService from "./../../Service/SearchDBService";

const breadcrumbs = [
  {
    label: "BankOffers",
    path: "/BankOffersDashboard",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "New",
    path: "/BankOffersDashboard/new",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
  {
    label: "ApplicableDetailsConfig",
    path: "/BankOffersDashboard/new/ApplicableConfig",
    icon: "",
    onlyIcon: false,
    showIcon: false,
  },
];

const ApplicableTable = () => {
  const { path } = useRouteMatch();
  const dt = useRef(null);
  const [searchDBs, setSearchDBs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

  const searchDBService = new SearchDBService();
  useEffect(() => {
    searchDBService
      .getAllSearchDBs()
      .then((res) => {
        setLoading(false);
        setSearchDBs(res.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []); //eslint-disable-line

  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of Applicable Fields</h3>
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

  const headerTemplate = (data) => {
    return (
      <React.Fragment>
        <label>{data.keyword}</label>
        <Link to={`${path}/edit/${data.keyword}`}>
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="p-p-0 p-mx-3 p-button-secondary p-button-text"
          />
        </Link>
      </React.Fragment>
    );
  };

  const footerTemplate = (data) => {
    return (
      <React.Fragment>
        <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>
          Total Items
        </td>
        <td style={{ fontWeight: "bold" }}>
          {calculateKeywordTotal(data.keyword)}
        </td>
      </React.Fragment>
    );
  };
  const calculateKeywordTotal = (keyword) => {
    let total = 0;

    if (searchDBs) {
      for (let searchDb of searchDBs) {
        if (searchDb.keyword === keyword) {
          total++;
        }
      }
    }

    return total;
  };
  const itemsTemplate = (rowData) => {
    const len = rowData.items?.length;
    return (
      <>
        <div>
          {len ? (
            <span>{len > 1 ? `${len} items` : `${len} item`}</span>
          ) : (
            "No Items"
          )}
        </div>
      </>
    );
  };


  const toast = useRef(null);
  return (
    <div>
      <Toast ref={toast} />
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <DataTable
        value={searchDBs}
        ref={dt}
        // selection={selectedSearchDB}
        // onSelectionChange={(e) => setSelectedSearchDB(e.value)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} searchDBs"
        globalFilter={globalFilter}
        header={header}
        loading={loading}
        loadingIcon="pi pi-spinner"
        className="p-datatable-sm"
        // rowExpansionTemplate={rowExpansionTemplate}

        rowGroupMode="subheader"
        groupField="keyword"
        sortMode="single"
        sortField="keyword"
        sortOrder={1}
        expandableRowGroups
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowGroupHeaderTemplate={headerTemplate}
        rowGroupFooterTemplate={footerTemplate}
      >
        {/* <Column expander style={{ width: "3em" }} /> */}
        <Column
          header="Category"
          field="category"
          filter
          filterField="category"
          sortable
          sortField="category"
          sortableDisabled
        />
        <Column
          header="Sub Category"
          field="subCategory"
          filter
          filterField="subCategory"
          sortable
          sortField="subCategory"
          sortableDisabled
        />
        <Column
          header="Product Id"
          field="items"
          filter
          body={itemsTemplate}
          filterField="items"
          sortable
          sortField="items"
          sortableDisabled
        />
        <Column
          header="DVN Id"
          field="items"
          filter
          body={itemsTemplate}
          filterField="items"
          sortable
          sortField="items"
          sortableDisabled
        />
        <Column
          header="Dsku Id"
          field="items"
          filter
          body={itemsTemplate}
          filterField="items"
          sortable
          sortField="items"
          sortableDisabled
        />
      </DataTable>
    </div>
  );
};

export default ApplicableTable;
