import React from "react";
import { Route, Switch } from "react-router";
import NewPromotion from "./NewPromotion";
import PromotionSetup from "./PromotionSetup";
import PromotionTable from "./PromotionTable";

const index = () => {
  return (
    <>
      <Switch>
        <Route path="/promotions/add" component={NewPromotion} />
        <Route path="/promotions/new" component={PromotionSetup} />
        <Route path="/promotions" component={PromotionTable} />
      </Switch>
    </>
  );
};

export default index;
