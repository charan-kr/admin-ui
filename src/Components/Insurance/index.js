import React from 'react'
import { Route, Switch } from "react-router";
import InsuranceTable from './InsuranceTable';
import AddNewInsurance from './AddNewInsurance';
const index = () => {
    const basePath = "/InsuranceDashboard";
    return (
        <>
            <Switch>
                <Route path={`${basePath}/new`} component={AddNewInsurance} />
                <Route path={`${basePath}`} component={InsuranceTable} />
            </Switch>
        </>
    );
}

export default index
