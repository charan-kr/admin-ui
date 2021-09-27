import React from "react";
import { Route, Switch } from "react-router";
import { useState } from "react";
import Table from "./Table";
import EditProductConfiguration from "./EditProductConfiguration";
import NewProductConfiguration from "./NewProductConfiguration";
import CustomBreadcrumbs from "../../CustomBreadCrumbs";
const breadcrumbs = [
  {
    label: "Product Ingestion",
    path: "/ingestion/productIngestion",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
];
const ProductIngestion = () => {
  const [basePath] = useState("/ingestion/productIngestion");

  return (
    <div className="product-ingestion" style={{ height: "inherit" }}>
      <Switch>
        <Route
          path={`${basePath}/edit/:productId`}
          component={EditProductConfiguration}
        />
        <Route path={`${basePath}/new`} component={NewProductConfiguration} />
        <Route path={basePath}>
          <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
          <Table />
        </Route>
      </Switch>
    </div>
  );
};

export default ProductIngestion;
