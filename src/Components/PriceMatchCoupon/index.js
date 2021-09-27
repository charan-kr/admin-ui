import React from "react";
import { Route, Switch } from "react-router";
import CouponTable from "./CouponTable";
import NewCoupon from "./NewCoupon";

const CouponPage = () => {
  return (
    <>
      <Switch>
        <Route path="/pmcoupon/new" component={NewCoupon} />
        <Route path="/pmcoupon" component={CouponTable} />
      </Switch>
    </>
  );
};

export default CouponPage;
