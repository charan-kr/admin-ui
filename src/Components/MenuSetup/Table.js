import React, { useEffect, useRef, useState } from "react";

import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Link } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { SlideMenu } from "primereact/slidemenu";
import { Skeleton } from "primereact/skeleton";
import { OverlayPanel } from "primereact/overlaypanel";

import CustomBreadcrumbs from "../CustomBreadCrumbs";

import { MenuSetupConfigService } from "../Service/MenuSetupConfigService";

const Table = () => {
  const [menuTemplates, setMenuTemplates] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [selectedMenuSetup, setSelectedMenuSetup] = useState("");
  const toast = useRef(null);
  const dt = useRef(null);
  const searchByOptions = [
    { name: "createdBy", id: 1 },
    { name: "modifiedBy", id: 2 },
    { name: "menuType", id: 3 },
  ];
  const menuSetupConfigService = new MenuSetupConfigService();

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
    menuSetupConfigService
      .getMenuSetupConfigDetails()
      .then((res) => {
        setMenuTemplates(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const onSearchHandler = () => {
    menuSetupConfigService
      .getMenuSetupConfigSearchFilter(searchBy, searchedValue)
      .then((res) => {
        setMenuTemplates(res.data);
        toast?.current?.show({
          severity: "success",
          summary: "Retrvied successfully",
          life: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast?.current?.show({
          severity: "error",
          summary: "Error Message",
          detail: "Problem with backend",
          life: 3000,
        });
      });
  };
  /* 	
==============================================================	
Menusetup for the delete and edit icons at right side the in data table.
==============================================================
  */

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Link
          to={`/menuSetup/edit/${rowData.id}`}
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
    menuSetupConfigService
      .deleteMenuSetupConfigDetailsById(rowData.id)
      .then((res) => {
        toast?.current?.show({
          severity: "success",
          summary: res.data,
        });
        setMenuTemplates(menuTemplates.filter((ele) => ele.id !== rowData.id));
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
        <Link to={`/menuSetup/new`} className="custom-router-link">
          <Button
            label="Create New Menu Setup Config"
            icon="pi pi-plus"
            className="p-button-info p-py-1"
          />
        </Link>
      </React.Fragment>
    );
  };
  const typeBodyTemplate = (rowData) => {
    function openDialog() {
      setSelectedMenuSetup(rowData);
      setVisible(true);
    }
    const keys = Object.keys(rowData?.menuSectionPair || {});
    return (
      <div className="p-d-flex p-ai-center">
        <span>{keys[0]}</span>
        <Button
          className="p-button-text p-p-0 p-button-info"
          icon="pi pi-info-circle"
          onClick={openDialog}
        />
      </div>
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
      <h3 className="p-m-0">List of Menu Setup Configuration's</h3>
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
  const activeBodyTemplate = (rowData) => {
    const isActive = rowData.isActive;
    return (
      <Button
        className={`p-button-text p-p-0 p-button-${
          !isActive ? "danger" : "success"
        }`}
        icon={!isActive ? "pi pi-times" : "pi pi-check-circle"}
      />
    );
  };
  const breadcrumbs = [
    {
      label: "Menu Setup",
      path: "/menuSetup",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  const [visible, setVisible] = useState(false);
  const closeDialog = () => {
    setVisible(false);
    setSelectedMenuSetup(null);
  };
  return (
    <>
      <Toast ref={toast} />
      <Dialog
        style={{ width: "50%" }}
        visible={visible}
        onHide={closeDialog}
        focusOnShow={false}
        header={`Menu Setup Info`}
      >
        {selectedMenuSetup?.menuSectionPair && (
          <MenuConfigInfo
            menu={Object.values(selectedMenuSetup?.menuSectionPair || {})[0]}
            type={Object.keys(selectedMenuSetup?.menuSectionPair || {})[0]}
          />
        )}
      </Dialog>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <div className="p-card p-shadow-4 p-mb-3">
        <div className="p-card-body  p-p-3 p-d-flex" style={{ gap: "1rem" }}>
          <Dropdown
            value={searchBy}
            options={searchByOptions}
            onChange={(e) => setSearchBy(e.value)}
            optionLabel="name"
            optionValue="name"
            placeholder="-- Search By --"
            style={{ width: "200px" }}
          />

          <InputText
            name="searchedValue"
            value={searchedValue}
            onChange={(e) => setSearchedValue(e.target.value)}
            placeholder="search by select values"
            disabled={!searchBy}
            style={{ width: "200px" }}
          />
          <Button
            label="Search"
            className="p-button-info"
            onClick={onSearchHandler}
            disabled={!searchedValue}
          />
        </div>
      </div>

      <Toolbar
        className="p-p-2"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      {
        <DataTable
          value={menuTemplates}
          ref={dt}
          selection={selectedMenuSetup}
          onSelectionChange={(e) => setSelectedMenuSetup(e.value)}
          header={header}
          dataKey="id"
          paginator
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Menu Setup config"
          rows={10}
          rowsPerPageOptions={[5, 10, 20, 50]}
          className="p-datatable-gridlines p-datatable-sm p-mt-1"
        >
          <Column selectionMode="single" headerStyle={{ width: "2.5rem" }} />
          <Column field="type" header="Type" body={typeBodyTemplate} />
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

const MenuConfigInfo = ({ menu = [], type }) => {
  const [menuConfig, setMenuConfig] = useState([]);
  const op = useRef(null);
  useEffect(() => {
    const data = menu.map((ele) => recurssion(ele));
    setMenuConfig(data);
  }, [menu]); // eslint-disable-line react-hooks/exhaustive-deps

  const recurssion = (ele) => {
    const data = {
      label: ele.lableName,
      items: ele?.subSection?.map((sub) => recurssion(sub)) || [],
    };
    if (!data.items?.length) {
      delete data.items;
    }
    return data;
  };

  const homeTemplate = (
    <div
      className="p-p-1"
      style={{ border: "1px solid #999", borderRadius: "5px" }}
    >
      <div className="p-d-flex p-ai-center">
        <label>DOLPHINS INDIA</label>
        <div className="p-ml-4" style={{ flex: "1" }}>
          <Skeleton height="30px" />
        </div>
      </div>
      <Skeleton height="20px" className="p-mt-1" />

      <div className="p-grid">
        <div className="p-col-4 p-p-0 p-mr-1 p-mt-1">
          <SlideMenu
            model={menuConfig}
            menuWidth={200}
            viewportHeight={300}
            style={{ width: "100%", minHeight: "300px" }}
          />
        </div>
        <div className="p-col p-p-1">
          <Skeleton height="100%" />
        </div>
      </div>
    </div>
  );
  const searchTemplate = (
    <div
      className="p-p-1"
      style={{ border: "1px solid #999", borderRadius: "5px" }}
    >
      <div className="p-d-flex p-ai-center p-jc-between">
        <label>DOLPHINS INDIA</label>
        <div
          className="p-inputgroup p-mx-4"
          style={{ flex: "1", position: "relative" }}
        >
          <span
            className="p-inputgroup-addon p-p-0"
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <Dropdown
              style={{
                borderRadius: "25px 0 0 25px",
                border: "1px solid #999",
                borderRight: "none",
                // width: "40px",
              }}
              placeholder="All"
              options={menuConfig}
              optionLabel="label"
            />
          </span>
          <InputText
            style={{
              borderRadius: " 0 25px 25px 0",
              border: "1px solid #999",
              borderLeft: "none",
            }}
          />
          <Button
            className="p-button-text p-p-1 p-button-rounded p-button-secondary"
            icon="pi pi-search"
            style={{
              position: "absolute",
              width: "2rem",
              height: "2rem",
              right: "4px",
              top: "4px",
              zIndex: "2",
            }}
          />
        </div>
        <div>
          <Skeleton width="200px" height="30px" />
        </div>
      </div>
      <Skeleton height="20px" className="p-mt-1" />

      <div className="p-grid">
        <div className="p-col-4 p-p-0 p-mr-1 p-mt-1">
          <Skeleton height="300px" />
        </div>
        <div className="p-col p-p-1">
          <Skeleton height="100%" />
        </div>
      </div>
    </div>
  );
  const userTemplate = (
    <div
      className="p-p-1"
      style={{ border: "1px solid #999", borderRadius: "5px" }}
    >
      <div className="p-d-flex p-ai-center p-jc-between">
        <label>DOLPHINS INDIA</label>
        <div
          className="p-inputgroup p-mx-4"
          style={{ flex: "1", position: "relative" }}
        >
          <Skeleton height="30px" />
        </div>
        <div>
          <span onMouseEnter={(e) => op.current.show(e)}>
            <small>Username</small>
            <i
              className="fa fa-user-circle-o"
              style={{ fontSize: "1.5rem" }}
              aria-hidden="true"
            ></i>
          </span>
          <span className="p-mx-3">
            <i
              className="fa fa-cart-plus"
              style={{ fontSize: "1.5rem" }}
              aria-hidden="true"
            ></i>
            Cart
          </span>
        </div>
        <div></div>
      </div>
      <Skeleton height="20px" className="p-mt-1" />

      <div className="p-grid">
        <div className="p-col-4 p-p-0 p-mr-1 p-mt-1">
          <Skeleton height="300px" />
        </div>
        <div className="p-col p-p-1">
          <Skeleton height="100%" />
        </div>
      </div>
    </div>
  );
  const renderTemplate = () => {
    switch (type) {
      case "search":
        return searchTemplate;
      case "home":
        return homeTemplate;
      case "user":
        return userTemplate;
      default:
        return null;
    }
  };
  return (
    <>
      <OverlayPanel style={{ minWidth: "150px" }} ref={op}>
        <div onMouseLeave={(e) => op.current.hide(e)}>
          {menuConfig.map((ele) => (
            <div key={ele}>
              <p className="p-py-1 p-m-0">{ele.label}</p>
            </div>
          ))}
        </div>
      </OverlayPanel>
      {renderTemplate()}
    </>
  );
};
