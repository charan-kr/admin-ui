import React, { useState, useEffect, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import TableService from "../Service/TableService";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import CustomBreadcrumbs from "../CustomBreadCrumbs";

const BusinessEnquiry = () => {
  const [products, setProducts] = useState([]);
  const [review, setreview] = useState({});
  const toast = useRef(null);
  const statuses = ["New", "Reviewed", "Closed", "Followup"];

  const [globalFilter, setGlobalFilter] = useState(null);
  useEffect(() => {
    getAllDetails();
  }, []);

  const stockBodyTemplate = (rowData) => {
    console.log(rowData.status);
    return (
      <React.Fragment>
        <Dropdown
          style={{ left: "0px", width: "100%" }}
          value={rowData.status}
          options={statuses}
          onChange={(e) => handleClick(rowData, e.value)}
        />
      </React.Fragment>
    );
  };

  const handleClick = (row, status) => {
    console.log(row.status, status);
    var shouldUpdate = false;

    if (row.status === "Reviewed" && status === "Closed") {
      shouldUpdate = true;
    } else if (row.status === "Followup" && status === "Reviewed") {
      shouldUpdate = true;
    } else if (row.status === "New" && status === "Followup") {
      shouldUpdate = true;
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Error Message",
        detail: `${row.status} cannot be changed to ${status}`,
      });
    }

    if (shouldUpdate) {
      const tableService = new TableService();
      tableService
        .updateBusinessEnquiry({ ...row, status })
        .then((response) => {
          console.log(response);
          const updatedData = products.map((ele) =>
            ele.id === row.id ? { ...row, status } : ele
          );
          setProducts(updatedData);
          toast.current.show({
            severity: "success",
            summary: "updated succesfully",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getAllDetails = () => {
    const tableService = new TableService();
    tableService
      .getAllBusinessEnquiry()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dt = useRef(null);

  const purposeTemplate = (rowData) => {
    return (
      <React.Fragment>
        <InputTextarea
          type="text"
          placeholder="Left"
          style={{ width: "10rem" }}
          value={rowData.purpose}
          tooltip={rowData.purpose}
          tooltipOptions={{ position: "left" }}
        />
      </React.Fragment>
    );
  };

  const ReviewTemplate = (rowData) => {
    return (
      <React.Fragment>
        <InputTextarea
          type="text"
          placeholder="Left"
          style={{ width: "10rem", height: "3rem" }}
          value={
            review.id === rowData.id ? review.reviewNotes : rowData.reviewNotes
          }
          onFocus={() => {
            handleReviewFocus(rowData);
          }}
          onBlur={() => {
            handleBlur(rowData);
          }}
          onChange={(e) =>
            setreview({ id: rowData.id, reviewNotes: e.target.value })
          }
          tooltip={rowData.reviewNotes}
          tooltipOptions={{ position: "left" }}
        />
      </React.Fragment>
    );
  };

  const handleBlur = (rowData) => {
    console.log(rowData, review.reviewNotes);

    const tableService = new TableService();
    tableService
      .updatereviewNotes({ ...rowData, reviewNotes: review.reviewNotes })
      .then(() => {
        const updatedData = products.map((ele) =>
          ele.id === review.id
            ? { ...rowData, reviewNotes: review.reviewNotes }
            : ele
        );
        setProducts(updatedData);
        toast.current.show({
          severity: "success",
          summary: "updated succesfully",
        });
      });
  };

  const handleReviewFocus = (rowData) => {
    setreview({ id: rowData.id, reviewNotes: rowData.reviewNotes });
  };

  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of Business Enquiries</h3>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter}
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="p-py-1"
        />
      </span>
    </div>
  );
  const breadcrumbs = [
    {
      label: "Business Enquiry",
      path: "/businessEnquiry",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <div>
      <div className="card">
        <Toast ref={toast} />
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <DataTable
          ref={dt}
          value={products}
          dataKey="id"
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
            field="businessType"
            header="Business Type"
            sortable
            sortField="method"
            filter
            filterPlaceholder="Search by name"
          ></Column>

          <Column
            field="name"
            header="Name"
            sortable
            sortField="method"
            filter
            filterPlaceholder="Search by name"
          ></Column>
          <Column
            header="MobileNo"
            field="mobileNumber"
            sortable
            filter
            filterPlaceholder="Search by number"
          ></Column>

          <Column
            header="Purpose"
            field="purpose"
            body={purposeTemplate}
            sortable
            filter
            filterPlaceholder="Search by name"
          ></Column>

          <Column
            header="Review Notes"
            field="reviewNotes"
            body={ReviewTemplate}
            editable
            sortable
            filter
            filterPlaceholder="Search by name"
          ></Column>

          <Column
            header="State"
            field="state"
            sortable
            sortField="method"
            filter
            filterPlaceholder="Search by name"
          ></Column>
          <Column
            header="City"
            field="city"
            sortable
            sortField="method"
            filter
            filterPlaceholder="Search by name"
          ></Column>
          <Column
            header="Status"
            field="action"
            sortable
            body={stockBodyTemplate}
            sortField="status"
            filter
            filterPlaceholder="Search by name"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default BusinessEnquiry;
