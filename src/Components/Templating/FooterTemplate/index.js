import React from 'react'
import { Route, Switch } from "react-router-dom";
import Table from "./Table";
import AddFooterTemplate from "./AddFooterTemplate";
import EditFooterTemplate from "./EditFooterTemplate";

const index = () => {
     const basePath = "/templating/footerTemplate";

    return (
        <Switch>
        <Route path={`${basePath}/edit/:id`} component={EditFooterTemplate} />
        <Route path={`${basePath}/add`} component={AddFooterTemplate} />
        <Route path={basePath} component={Table} />
      </Switch>
    )
}

export default index
