import React from "react";

import { TabPanel, TabView } from "primereact/tabview";
import CategoryTemplate from "./CategoryTemplate";
import SubCategoryTemplate from "./SubCategory";
import CustomBreadcrumbs from "../CustomBreadCrumbs";

const CategoryMainPage = () => {
  const breadcrumbs = [
    {
      label: "Category & SubCategory Configuration",
      path: "/attributesGrouping",
      icon: "fa fa-home",
      onlyIcon: false,
      showIcon: false,
    },
  ];
  return (
    <div className="category">
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <TabView>
        <TabPanel header="Category">
          <CategoryTemplate />
        </TabPanel>
        <TabPanel header="Sub Category">
          <SubCategoryTemplate />
        </TabPanel>
      </TabView>
    </div>
  );
};
export default CategoryMainPage;
