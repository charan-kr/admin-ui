import React from "react";
import { Route, Switch } from "react-router";
import AddNewPromotion from "./AddNewPromotion";
import CopyPromotion from "./CopyPromotion";
import PromotionTable from "./PromotionTable";
import EditPromotion from "./EditPromotion";
import GivenPromotionTable from "./GivenPromotionTable";

const CouponPage = () => {
  return (
    <>
      <Switch>
        <Route path="/promotions/copy/:id" component={CopyPromotion} />
        <Route path="/promotions/edit/:id" component={EditPromotion} />
        <Route path="/promotions/new" component={AddNewPromotion} />
        <Route path="/promotions" exact component={PromotionTable} />
        <Route path="/promotions/users" component={PromotionTable} />
        <Route path="/promotions/detail" component={GivenPromotionTable} />

      </Switch>
    </>
  );
};

export default CouponPage;
