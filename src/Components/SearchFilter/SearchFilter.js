import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";

import FilterCard from "./FilterCard";

import IngestionService from "../Service/IngestionPoolService";
import CategoryService from "../Service/categoryService";
import SubcategoryService from "../Service/subcategoryService";
import SearchFilterService from "../Service/SearchFilterService";

import { Toast } from "primereact/toast";

const SearchFilter = ({ edit = false, config = null }) => {
  const initialValue = {
    categoryId: null,
    subCategoryId: null,
    isActive: true,
    created_by: "",
    created_dt: "",
    modified_by: "",
    modified_dt: "",
  };
  const [filterList, setFilterList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [form, setForm] = useState(initialValue);

  const categoryService = new CategoryService();
  const subCategoryService = new SubcategoryService();
  const searchFilterServie = new SearchFilterService();

  const history = useHistory();
  const toast = useRef(null);

  useEffect(() => {
    if (edit && config) {
      setForm(config);
      setFilterList(config.filters);
      subCategoryService
        .getAllsubCategoriesByCategoryId(config.categoryId)
        .then((res) => setSubCategories(res.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit, config]);

  useEffect(() => {
    categoryService.getAllCategories().then((res) => setCategories(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onCategoryChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      categoryId: e.value,
      subCategoryId: null,
    }));

    subCategoryService
      .getAllsubCategoriesByCategoryId(e.value)
      .then((res) => setSubCategories(res.data));
  };
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [visible, setVisible] = useState(false);
  const addNewFilter = () => {
    setSelectedFilter(null);
    setVisible(true);
  };
  const handleKeyChange = (filter) => {
    setSelectedFilter(filter);
    setVisible(true);
  };
  const handleDeleteFilter = (filter) => {
    setFilterList(
      filterList.filter(
        (ele) => ele.ingestionKeyValue !== filter.ingestionKeyValue
      )
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDisplayTypeChange = (filter, type) => {
    const updatedFilterList = filterList.map((ele) =>
      ele.ingestionKeyValue === filter.ingestionKeyValue
        ? {
            ...ele,
            displayType: type,
          }
        : ele
    );
    setFilterList(updatedFilterList);
  };
  const addToFilterList = (filter) => {
    const updatedFilterList = filterList.map((ele) =>
      ele.ingestionKeyValue === filter.ingestionKeyValue
        ? {
            ...ele,
            filterByList: [
              ...ele.filterByList,
              { text1: "", text2: "", type: "" },
            ],
          }
        : ele
    );
    setFilterList(updatedFilterList);
  };
  const handleValuesChange = (filter, e, index) => {
    const { name, value } = e.target;
    const updatedFilterList = filterList.map((ele) =>
      ele.ingestionKeyValue === filter.ingestionKeyValue
        ? {
            ...ele,
            filterByList: ele.filterByList.map((elem, i) =>
              i === index ? { ...elem, [name]: value } : elem
            ),
          }
        : ele
    );
    setFilterList(updatedFilterList);
  };
  const handleDeleteFromFilter = (filter, index) => {
    const updatedFilterList = filterList.map((ele) =>
      ele.ingestionKeyValue === filter.ingestionKeyValue
        ? {
            ...ele,
            filterByList: ele.filterByList.filter((_, i) => i !== index),
          }
        : ele
    );
    setFilterList(updatedFilterList);
  };
  const handleUnitsChange = (filter, units) => {
    const updatedFilterList = filterList.map((ele) =>
      ele.ingestionKeyValue === filter.ingestionKeyValue
        ? {
            ...ele,
            units,
          }
        : ele
    );

    setFilterList(updatedFilterList);
  };
  const handleSubmit = () => {
    const body = {
      ...form,
      filters: filterList,
    };
    if (edit) {
      searchFilterServie.updateSearchFilter(form.id, body).then(() => {
        toast?.current?.show({
          severity: "success",
          summary: "Created New Serach Filter Succesfully",
        });
        setTimeout(() => {
          history.push("/searchFilters");
        }, 2000);
      });

      return;
    }
    searchFilterServie.createSearchFilter(body).then(() => {
      setTimeout(() => {
        history.push("/searchFilters");
      }, 2000);
    });
  };
  return (
    <>
      <Toast ref={toast} />
      <div className="p-grid">
        <div className="p-col-12 p-md-6 p-xl-4">
          <div className="p-fluid">
            <label>
              <b>Category</b>
            </label>
            <Dropdown
              id="categoryId"
              name="categoryId"
              value={form.categoryId}
              optionValue="categoryId"
              optionLabel="categoryName"
              options={categories}
              onChange={onCategoryChange}
              placeholder="--Choose Category--"
              filter
              filterBy="categoryName"
            />
          </div>
        </div>
        <div className="p-col-12 p-md-6 p-xl-4">
          <div className="p-fluid">
            <label>
              <b>Sub Category</b>
            </label>
            <Dropdown
              id="subCategoryId"
              name="subCategoryId"
              value={form.subCategoryId}
              optionValue="subCategoryId"
              optionLabel="subCategoryName"
              placeholder="--Choose Sub Category--"
              options={subCategories}
              onChange={handleChange}
              disabled={!form.categoryId}
              filter
              filterBy="subCategoryName"
            />
          </div>
        </div>
      </div>

      <div className="p-grid">
        {filterList.map((filter, index) => (
          <div className={`p-col-12 p-md-6 p-xl-4`}>
            <FilterCard
              // handleUpdateVarientKey={handleUpdateVarientKey}
              filter={filter}
              // index={index}

              handleUnitsChange={handleUnitsChange}
              handleDeleteFilter={handleDeleteFilter}
              addToFilterList={addToFilterList}
              handleValuesChange={handleValuesChange}
              handleDisplayTypeChange={handleDisplayTypeChange}
              handleKeyChange={handleKeyChange}
              handleDeleteFromFilter={handleDeleteFromFilter}
            />
          </div>
        ))}
        <div className={`p-col-12 p-md-6 p-xl-4`}>
          <div className="p-card p-shadow-2">
            <div
              onClick={() => addNewFilter()}
              className="p-card-body p-text-center"
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-plus-square-o fa-3x p-d-block" />
              <small>Add New Filter</small>
            </div>
          </div>
        </div>
      </div>
      <div className="p-d-flex p-jc-between p-ai-center p-mt-4">
        <Button
          label="Cancel"
          onClick={() => history.push("/searchFilters")}
          className="p-button-secondary p-py-1"
        />
        <Button
          onClick={handleSubmit}
          label="Save"
          className="p-button-success p-py-1"
        />
      </div>

      <Dialog
        className="varient"
        header="Select Filter Key"
        focusOnShow={false}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <VarientKeySelector
          setVisible={setVisible}
          filter={selectedFilter}
          filterList={filterList || []}
          setFilterList={setFilterList}
        />
      </Dialog>
    </>
  );
};

export default SearchFilter;

const VarientKeySelector = ({
  filter,
  setVisible,
  setFilterList,
  filterList,
}) => {
  const ingestionService = new IngestionService();

  const handleSelection = (value) => {
    const newFilter = {
      displayName: value.displayName,
      displayType: "",
      filterByList: [],
      ingestionKeyValue: value.key,
      units: "",
    };
    if (filter) {
      setFilterList(
        filterList.map((ele) =>
          ele.ingestionKeyValue === filter.ingestionKeyValue
            ? { ...newFilter }
            : ele
        )
      );
    } else {
      setFilterList([...filterList, newFilter]);
    }
    setVisible(false);
  };
  const [selectedKey, setSelectedKey] = useState(null);
  const [filteredAttributes, setFilteredAttributes] = useState(null);

  useEffect(() => {
    if (filter?.ingestionKeyValue) {
      ingestionService.getIngestionPoolKeys(filter.key).then((res) => {
        setSelectedKey(res.data[0]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const searchAttributes = (event) => {
    if (event.query.trim().length > 1) {
      setTimeout(() => {
        // let _filteredAttributes;
        ingestionService
          .getIngestionPoolKeys(event.query?.toLowerCase())
          .then((res) => {
            setFilteredAttributes(
              res.data.filter(
                (ele) =>
                  !filterList.some(
                    (option) => option.ingestionKeyValue === ele.key
                  )
              )
            );
          })
          .catch((error) => {
            // alert(error);
          });
      }, 250);
    } else {
      setFilteredAttributes([]);
    }
  };
  return (
    <>
      <div className="p-inputgroup" style={{ width: "250px" }}>
        <span className="p-inputgroup-addon">
          <i className="fa fa-key"></i>
        </span>
        <AutoComplete
          forceSelection
          value={selectedKey}
          suggestions={filteredAttributes}
          field="key"
          onSelect={(e) => handleSelection(e.value)}
          completeMethod={searchAttributes}
          onChange={(e) => setSelectedKey(e.value)}
          placeholder="Search For Key"
        />
      </div>
      {filteredAttributes?.length < 1 && (
        <small className="p-error p-invalid">No Attributes found</small>
      )}
    </>
  );
};
