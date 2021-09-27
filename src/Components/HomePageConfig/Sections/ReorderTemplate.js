import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

import { confirmPopup } from "primereact/confirmpopup";
import { Button } from "primereact/button";

const ReOrderTemplate = (props) => {
  const { sections, setReorderSectionDialog, reOrderSection } = props;
  const [products, setProducts] = useState([]);
  const toast = useRef(null);
  const columns = [
    { field: "type", header: "Type", style: { width: "10rem" } },
    { field: "header.text", header: "Header" },
    { field: "footer.text", header: "Footer" },
  ];

  useEffect(() => {
    setProducts(sections);
  }, [sections]);

  const onRowReorder = (e) => {
    setProducts(e.value);
  };

  const accept = (id) => {
    setProducts(products.filter((ele) => ele.id !== id));
  };
  const confirmDelete = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(id),
    });
  };
  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        columnKey={col.field}
        field={col.field}
        header={col.header}
      />
    );
  });
  const handleCloneSection = (section) => {
    const newSection = { ...section, id: uuidv4() };
    setProducts([...products, newSection]);
  };
  const sectionBodyTemplate = (rowData) => {
    return <span>{rowData?.subSections?.length}</span>;
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="p-text-right">
        <Button
          onClick={() => handleCloneSection(rowData)}
          icon="pi pi-copy"
          tooltip="clone"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-info p-mx-1"
        />

        <Button
          onClick={(e) => confirmDelete(e, rowData.id)}
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
        />
      </div>
    );
  };
  return (
    <div>
      <Toast ref={toast}></Toast>
      <h3 className="p-mx-0 p-text-center">
        <u>
          <i className="fa fa-cogs" aria-hidden="true"></i> Sections Settings
        </u>
      </h3>
      <DataTable
        scrollable
        scrollHeight="25rem"
        emptyMessage="No sections to show"
        value={products}
        reorderableColumns
        onRowReorder={onRowReorder}
        className="p-datatable-sm"
      >
        <Column rowReorder style={{ width: "3em" }} />

        {dynamicColumns}
        <Column
          className="p-text-center"
          style={{ width: "6em" }}
          body={sectionBodyTemplate}
          header="Sub Sec."
        />
        <Column
          className="p-text-center"
          style={{ width: "8em" }}
          body={actionBodyTemplate}
        />
      </DataTable>

      <div className="p-jc-between p-d-flex p-mt-2">
        <Button
          className="p-py-1 p-button-secondary"
          label="Cancel"
          onClick={() => setReorderSectionDialog(false)}
        />
        <Button
          className="p-py-1"
          label="Save"
          onClick={() => reOrderSection(products)}
        />
      </div>
    </div>
  );
};

export default ReOrderTemplate;
