import React from "react";
import { Route, Switch } from "react-router";
import AddNewCoupon from "./AddNewCoupon";
import CopyCoupon from "./CopyCoupon";
import CouponTable from "./CouponTable";
import EditCoupon from "./EditCoupon";

const CouponPage = () => {
  return (
    <>
      <Switch>
        <Route path="/CoupensDashboard/copy/:id" component={CopyCoupon} />
        <Route path="/CoupensDashboard/edit/:id" component={EditCoupon} />
        <Route path="/CoupensDashboard/new" component={AddNewCoupon} />
        <Route path="/CoupensDashboard" component={CouponTable} />
      </Switch>
    </>
  );
};

export default CouponPage;
