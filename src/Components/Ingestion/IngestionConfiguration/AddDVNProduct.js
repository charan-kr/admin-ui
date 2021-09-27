import React, { Component } from "react";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import CustomBreadcrumbs from "../../CustomBreadCrumbs";
import Attributes from "./Attributes";

import IngestionService from "../../Service/IngestionPoolService";
import AttributeService from "../../Service/AttributeService";

export default class AddDVNProduct extends Component {
  constructor(props) {
    super(props);
    this.toast = React.createRef();

    this.types = ["DVN"];

    this.state = {
      selectedType: "DVN",
      search: null,

      selectedAttributes: [],

      checked: false,
      targetChecked: false,
      selectedRemoveAttriutes: [],
      source: [],
      target: [],
      selectedCategory: null,
      selectedSubCategory: null,
      disableSubCategory: true,
      manufacturer: "",
      brand: "",
      serachText: null,
      displaySource: [],
      displayTarget: [],
      nonDisplaySource: [],
      nonDisplayTarget: [],
      attributeGroups: [],
      parentProductAttributeKeysId: "",
      categoryId: "",
      subCategoryId: "",
    };

    this.onTypeHandler = this.onTypeHandler.bind(this);
    this.IngestionService = new IngestionService();

    this.attributeService = new AttributeService();
    this.onManufacturerHandler = this.onManufacturerHandler.bind(this);
    this.onBrandHandler = this.onBrandHandler.bind(this);
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

  componentDidMount() {
    this.setState({
      selectedCategory: this.props.location.product.category,
      selectedSubCategory: this.props.location.product.subCategory,
      parentProductAttributeKeysId: this.props.location.product,
      categoryId: this.props.location.product.categoryId,
      subCategoryId: this.props.location.product.subCategoryId,
    });
    this.IngestionService.getIngestionPoolDetails().then((response) => {
      this.setState({
        displaySource: response.data,
        nonDisplaySource: response.data,
      });
      this.toast.show({
        severity: "success",
        summary: "Retrvied attributes successfully",
        life: 3000,
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
  }

  render() {
    const breadcrumbs = [
      {
        label: "Ingestion Configuration",
        path: "/ingestion/ingestionConfig",
        icon: "fa fa-home",
        onlyIcon: false,
        showIcon: false,
      },
      {
        label: "Add DVN Attributes",
        path: "/ingestion/ingestionConfig/addDVNProductIngestion",
        icon: "fa fa-home",
        onlyIcon: false,
        showIcon: false,
      },
    ];
    return (
      <div className="">
        <Toast ref={(el) => (this.toast = el)} />
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <div className="p-grid">
          <div className="p-col-12 p-md-6 p-xl-4">
            <div className="p-fluid">
              <label>
                <b>Category</b>
              </label>

              <InputText
                name="subcategory"
                value={this.state.selectedCategory}
                disabled
              />
            </div>
          </div>
          <div className="p-col-12 p-md-6 p-xl-4">
            <div className="p-fluid">
              <label>
                <b>Sub Category</b>
              </label>

              <InputText
                name="subcategory"
                value={this.state.selectedSubCategory}
                disabled
              />
            </div>
          </div>
          <div className="p-col-12 p-md-6 p-xl-4">
            <div className="p-fluid">
              <label>
                <b>Type</b>
              </label>

              <Dropdown
                className=" p-jc-center"
                value={this.state.selectedType}
                options={this.types}
                onChange={this.onTypeHandler}
                placeholder="Select a Type"
                required={true}
                // disabled
              />
            </div>
          </div>
        </div>
        <Attributes
          state={this.state}
          displaySource={this.state.displaySource}
          nonDisplaySource={this.state.nonDisplaySource}
        />
      </div>
    );
  }
}
