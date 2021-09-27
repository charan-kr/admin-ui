import React from "react";
import { Route, Switch } from "react-router";
import AddNewBankOffers from "./AddNewBankOffers";
import CopyBankOffers from "./CopyBankOffers";
import BankOffersTable from "./BankOffersTable";
import EditBankOffers from "./EditBankOffers";
import ApplicableTable from "./ApplicableDetails/ApplicableTable";
import EditApplicableDetails from "./ApplicableDetails/EditApplicableDetails";

const BankOffers = () => {
  const basePath = "/BankOffersDashboard";
  const applicableDetailsPath = "/BankOffersDashboard/new";
  return (
    <>
      <Switch>
        <Route path={`${basePath}/copy/:id`} component={CopyBankOffers} />
        <Route path={`${basePath}/edit/:id`} component={EditBankOffers} />
        <Route path={`${applicableDetailsPath}/ApplicableConfig/edit/:keyword`} component={EditApplicableDetails} />
        <Route path={`${applicableDetailsPath}/ApplicableConfig`} component={ApplicableTable} />
        <Route path={`${basePath}/new`} component={AddNewBankOffers} />
        <Route path={`${basePath}`} component={BankOffersTable} />
      </Switch>
    </>
  );
};

export default BankOffers;
