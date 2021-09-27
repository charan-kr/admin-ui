import React, { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { AutoComplete } from "primereact/autocomplete";
import { Editor } from "primereact/editor";

import FAQService from "../Service/FAQService";
import { convertDateToString } from "../../utils/convertDateToString";

const Table = () => {
  const faqService = new FAQService();
  const [data, setData] = useState([]);

  const [editData, setEditData] = useState(null);

  const [groupName, setGroupName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [visible, setVisible] = useState(false);

  const [globalFilter, setGlobalFilter] = useState(null);

  const [options, setOptions] = useState([]);
  const [filteredOptions, setfilteredOptions] = useState(null);
  const toast = useRef(null);
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const fetchData = () => {
    faqService
      .getAllFAQ()
      .then((res) => {
        setData(res.data);
        const set = new Set(res.data.map((ele) => ele.groupName));
        setOptions(Array.from(set));
      })
      .catch((error) => {
        console.log(error.response);
        toast?.current?.show({
          severity: "error",
          summary: error?.response?.data?.message,
        });
      });
  };
  const answerTemplate = (row) => {
    let answer = "";
    try {
      answer = decodeURIComponent(escape(window.atob(row.answer)));
    } catch (error) {}

    return <span>{parse(answer + "")}</span>;
  };

  const questionTemplate = (row) => <span>{parse(row.question + "")}</span>;

  const handleEdit = (rowData) => {
    let answer = "";
    try {
      answer = decodeURIComponent(escape(window.atob(rowData.answer)));
    } catch (error) {}
    setEditData(rowData);
    setQuestion(rowData.question);
    setGroupName(rowData.groupName);
    setAnswer(answer);
    setVisible(true);
  };
  const handleDelete = (row) => {
    faqService
      .deleteFAQ(row.id)
      .then(() => {
        toast?.current?.show({
          severity: "info",
          summary: "Deleted FAQ",
        });
        const updateddata = data.filter((data) => data.id !== row.id);
        setData(updateddata);
      })
      .catch((error) => {
        console.log(error.response);
        toast?.current?.show({
          severity: "error",
          summary: error?.response?.data?.message,
        });
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
          onClick={() => handleDelete(rowData)}
          className="p-button-text p-p-0 p-button-danger"
          icon="pi pi-trash"
        />
      </>
    );
  };

  const paginatorLeft = (
    <Button
      onClick={fetchData}
      type="button"
      icon="pi pi-refresh"
      className="p-button-text"
    />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );
  const header = (
    <div className="p-d-flex p-jc-between">
      <h3 className="p-m-0">List of Frequently Asked Question's (FAQ)</h3>
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

  const suggestionMethod = (event) => {
    setTimeout(() => {
      let _filteredOptions;
      if (!event.query.trim().length) {
        _filteredOptions = [...options];
      } else {
        _filteredOptions = options.filter((option) => {
          return option.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setfilteredOptions(_filteredOptions);
    }, 250);
  };
  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="Add New Question"
          icon="pi pi-plus-circle"
          className="p-button-info p-py-1 p-px-3"
          onClick={() => setVisible(true)}
        />
      </>
    );
  };
  const resetForm = () => {
    setQuestion("");
    setAnswer("");
    setGroupName("");
  };
  const closeDialog = () => {
    resetForm();
    setEditData(null);
    setVisible(false);
  };
  const handleSave = () => {
    if (!groupName || !question || !answer) {
      toast?.current?.show({
        severity: "warn",
        summary: "Enter all Fields",
      });
      return;
    }

    const commonBody = {
      modifiedBy: "admin 1",
      modifiedDt: convertDateToString(new Date(), "dd-mm-yyyy HH:MM A"),
      question,
      answer: btoa(unescape(encodeURIComponent(answer))),
      groupName,
    };
    if (editData) {
      const updatedData = {
        ...editData,
        ...commonBody,
      };
      faqService
        .updateFAQ(updatedData)
        .then(() => {
          setData(
            data.map((faq) => (faq.id === editData.id ? updatedData : faq))
          );
          if (!options.some((ele) => ele === updatedData.groupName)) {
            setOptions((prevState) => [...prevState, updatedData.groupName]);
          }
          toast?.current?.show({
            severity: "success",
            summary: "Upadted FAQ",
          });
          closeDialog();
        })
        .catch((error) => {
          toast?.current?.show({
            severity: "error",
            summary: error?.response?.data?.message,
          });
        });
    } else {
      const newData = {
        createdBy: "admin 1",
        createdDt: convertDateToString(new Date(), "dd-mm-yyyy HH:MM A"),
        ...commonBody,
      };
      faqService
        .createNewFAQ(newData)
        .then((res) => {
          setData((prevState) => [...prevState, res.data]);
          if (!options.some((ele) => ele === newData.groupName)) {
            setOptions((prevState) => [...prevState, newData.groupName]);
          }
          toast?.current?.show({
            severity: "success",
            summary: "Inserted New FAQ",
          });
          closeDialog();
        })
        .catch((error) => {
          toast?.current?.show({
            severity: "error",
            summary: error?.response?.data?.message,
          });
        });
    }
  };
  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={editData ? "UPDATE FAQ" : "ADD NEW FAQ"}
        style={{ width: "70%" }}
        visible={visible}
        onHide={closeDialog}
        focusOnShow={false}
      >
        <div className="p-grid">
          <div className="p-col-12 p-md-6">
            <div className="p-fluid">
              <label>Group Name</label>
              <AutoComplete
                value={groupName}
                suggestions={filteredOptions}
                completeMethod={suggestionMethod}
                // field="name"
                dropdown
                onChange={(e) => setGroupName(e.value)}
              />
            </div>
          </div>
        </div>
        <div className="p-grid">
          <div className="p-col-12 p-md-6">
            <div className="p-fluid">
              <label>Question</label>
              <Editor
                name="question"
                value={question}
                onTextChange={(e) => {
                  setQuestion(e.htmlValue);
                }}
                style={{ height: "200px" }}
              />
            </div>
          </div>

          <div className="p-col-12 p-md-6">
            <div className="p-fluid">
              <label>Answer</label>
              <Editor
                name="question"
                value={answer}
                onTextChange={(e) => {
                  setAnswer(e.htmlValue);
                }}
                style={{ height: "200px" }}
              />
            </div>
          </div>
        </div>
        <div className="p-d-flex p-jc-between">
          <Button
            className="p-button-secondary p-py-1 p-px-3"
            onClick={closeDialog}
            label="Cancel"
          />
          <div>
            <Button
              className="p-button-help p-py-1 p-px-3 p-mx-2"
              onClick={resetForm}
              label="Reset"
              icon="fa fa-refresh"
            />
            <Button
              className="p-button-success p-py-1 p-px-3"
              onClick={handleSave}
              label={editData ? "Update" : "Save"}
            />
          </div>
        </div>
      </Dialog>
      <Toolbar
        className="p-p-2"
        left={leftToolbarTemplate}
        // right={rightToolbarTemplate}
      ></Toolbar>
      <DataTable
        value={data}
        className="p-datatable-gridlines p-datatable-sm p-mt-1"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={10}
        globalFilter={globalFilter}
        header={header}
        rowsPerPageOptions={[10, 20, 50]}
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        resizableColumns
      >
        <Column
          field="groupName"
          header="Group Name"
          filter
          filterPlaceholder="search by GroupName"
          sortable
          sortField="groupName"
        />
        <Column
          field="question"
          header="Question"
          filter
          body={questionTemplate}
          filterPlaceholder="search by Question"
          sortable
          sortField="question"
        />
        <Column
          field="answer"
          style={{ width: "37rem" }}
          header="Answer"
          filter
          body={answerTemplate}
          filterPlaceholder="search"
          sortable
          sortField="answer"
        />
        <Column body={actionBodyTemplate} style={{ width: "7rem" }} />
      </DataTable>
    </>
  );
};

export default Table;
