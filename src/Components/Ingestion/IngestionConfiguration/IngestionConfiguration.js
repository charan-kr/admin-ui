import React, { Component } from "react";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import Attributes from "./Attributes";

import IngestionPoolService from "../../Service/IngestionPoolService";
import AttributeService from "../../Service/AttributeService";
import CategoryService from "../../Service/categoryService";
import SubCategoryService from "../../Service/subcategoryService";

export default class IngestionConfiguration extends Component {
  constructor(props) {
    super(props);
    this.toast = React.createRef();

    this.types = ["Product", "DVN"];

    this.state = {
      selectedType: "Product",
      search: null,
      selectedCategory: null,
      selectedSubCategory: null,
      disableSubCategory: true,
      manufacturer: "",
      brand: "",
      displaySource: [],
      nonDisplaySource: [],
      attributeGroups: [],
    };

    this.categoryService = new CategoryService();
    this.subCategoryService = new SubCategoryService();
    this.ingestionPoolService = new IngestionPoolService();
    this.attributeService = new AttributeService();

    this.onTypeHandler = this.onTypeHandler.bind(this);
    this.onSerachHandler = this.onSerachHandler.bind(this);
    this.onCategoryHandler = this.onCategoryHandler.bind(this);
    this.onSubCategoryHandler = this.onSubCategoryHandler.bind(this);
    this.onManufacturerHandler = this.onManufacturerHandler.bind(this);
    this.onBrandHandler = this.onBrandHandler.bind(this);
  }

  // exclude column list from filter
  excludeColumns = ["id", "displayName"];

  onCategoryHandler(e) {
    this.setState({ selectedCategory: e.value, disableSubCategory: false });

    this.subCategoryService
      .getAllsubCategoriesByCategoryId(e.value?.categoryId)
      .then((res) => {
        this.setState({
          subCategory: res.data,
        });
      });
  }
  onSubCategoryHandler(e) {
    this.setState({ selectedSubCategory: e.value, showDiv: true });
    this.ingestionPoolService
      .getIngestionPoolDetails(this.state.selectedCategory, e.value)
      .then((response) => {
        this.setState((prevState) => ({
          ...prevState,
          displaySource: response.data,
          nonDisplaySource: response.data,
        }));
        this.toast.show({
          severity: "success",
          summary: "Retrvied Attributes Data successfully",
          life: 3000,
        });
      })
      .catch((error) => {
        this.toast.show({
          severity: "error",
          summary: "Error Message",
          detail: error.response.data.message,
          life: 3000,
        });
      });

    this.ingestionPoolService
      .getIngestionPoolDetails()
      .then((response) => {
        this.setState((prevState) => ({
          ...prevState,
          attributeGroups: response.data.map((group) => ({
            ...group,
            displayName: group.groupName,
          })),
        }));
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  onManufacturerHandler = (e) => {
    this.setState({
      manufacturer: e.target.value,
    });
  };
  onBrandHandler = (e) => {
    this.setState({
      brand: e.target.value,
    });
  };
  onTypeHandler = (e) => {
    this.setState({
      selectedType: e.value,
    });
  };
  //search filter data
  onSerachHandler = (e) => {
    this.setState({
      searchDisplayAttributes: e.target.value,
    });
    this.filterData(e.target.value);
  };
  hydrateForm = (categories) => {
    const selectedCategory = categories.find(
      (ele) => ele.categoryId === this.state.categoryId
    );
    this.subCategoryService
      .getAllsubCategoriesByCategoryId(selectedCategory.categoryId)
      .then((res) => {
        const selectedSubCategory = res.data.find(
          (ele) => ele.subCategoryId === this.state.subCategoryId
        );
        this.setState((prevState) => ({
          ...prevState,
          subCategory: res.data,
          selectedCategory,
          selectedSubCategory,
        }));
      })
      .then(() => {
        this.ingestionPoolService.getIngestionPoolDetails().then((response) => {
          this.setState({
            displaySource: response.data,
            nonDisplaySource: response.data,
          });
        });
      });

    this.attributeService.getAttribures().then((response) => {
      this.setState((prevState) => ({
        ...prevState,
        attributeGroups: response.data.map((group) => ({
          ...group,
          displayName: group.groupName,
        })),
      }));
    });
  };
  //featching the categories
  fetchData() {
    this.categoryService
      .getAllActiveCategories()
      .then((res) => {
        this.setState((prevstate) => ({
          ...prevstate,
          category: res.data,
        }));
        if (this.props.edit && this.props.config) {
          this.hydrateForm(res.data);
        }
      })
      .catch((error) => {});
  }
  componentDidMount() {
    this.fetchData();
    if (this.props.edit && this.props.config) {
      this.setState(this.props.config);
    }
  }

  render() {
    return (
      <div className="">
        <Toast ref={(el) => (this.toast = el)} />
        <div className="p-grid">
          <div className="p-col-12 p-md-4">
            <div className="p-fluid">
              <label>
                <b>Category</b>
              </label>

              <Dropdown
                value={this.state.selectedCategory}
                options={this.state.category}
                onChange={this.onCategoryHandler}
                placeholder="Select a Category"
                optionLabel="categoryName"
                required={true}
                disabled={this.props.edit}
                filter
                showClear
                filterBy="categoryName"
              />
            </div>
          </div>
          <div className="p-col-12 p-md-4">
            <div className="p-fluid">
              <label>
                <b>Sub Category</b>
              </label>

              <Dropdown
                value={this.state.selectedSubCategory}
                options={this.state.subCategory}
                onChange={this.onSubCategoryHandler}
                optionLabel="subCategoryName"
                placeholder="Select a subCategory"
                disabled={!this.state.selectedCategory || this.props.edit}
                filter
                showClear
                filterBy="subCategoryName"
              />
            </div>
          </div>
          <div className="p-col-12 p-md-4">
            <div className="p-fluid">
              <label>
                <b>Type</b>
              </label>

              <Dropdown
                disabled
                value={this.state.selectedType}
                options={this.types}
                onChange={this.onTypeHandler}
                placeholder="Select a Type"
                required={true}
              />
            </div>
          </div>
          {this.state.selectedType === "Product" && (
            <>
              <div className="p-col-12 p-md-4">
                <div className="p-fluid">
                  <label>
                    <b>Manufacturer</b>
                  </label>

                  <InputText
                    name="manufacturer"
                    value={this.state.manufacturer}
                    onChange={this.onManufacturerHandler}
                  />
                </div>
              </div>
              <div className="p-col-12 p-md-4">
                <div className="p-fluid">
                  <label>
                    <b>Model</b>
                  </label>

                  <InputText
                    name="brand"
                    value={this.state.brand}
                    onChange={this.onBrandHandler}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        {this.state.displaySource.length || true ? (
          <Attributes
            state={this.state}
            displaySource={this.state.displaySource}
            nonDisplaySource={this.state.nonDisplaySource}
          />
        ) : null}
      </div>
    );
  }
}
