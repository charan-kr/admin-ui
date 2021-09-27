import React from "react";
import CustomBreadcrumbs from "../../CustomBreadCrumbs";
import { Button } from "primereact/button";
import Configuration from "./Configuration";
import { Route, Switch } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
const breadcrumbs = [
  {
    label: "Product Language Config",
    path: "/ingestion/product-language-configuration",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  },
];
const ProductLanguageConfiguration = () => {
  const [basePath] = useState("/ingestion/productLanguageConfiguration");

  return (
    <div className="product-languag-ingestion">
      <Switch>
        <Route path={`${basePath}/settings`} component={Configuration} />
        <Route path={basePath}>
          <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
          <Link className="custom-router-link" to={`${basePath}/settings`}>
            <Button
              className="p-button-info p-py-1 p-px-4"
              label="Add Product Language Configuration"
              icon="fa fa-plus-circle"
            />
          </Link>
        </Route>
      </Switch>
    </div>
  );
};

export default ProductLanguageConfiguration;
