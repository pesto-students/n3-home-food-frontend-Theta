import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminAnalytics from "../adminAnalytics/adminAnalytics";
import ProductCatalogue from "../products catalogue";
import SellerManagment from "../sellerManagment";

function DashboardRoutes() {
  return (
    <>
      <Switch>
        <Route path="/admin/dashboard" exact>
          <AdminAnalytics />
        </Route>
        <Route path="/admin/product">
          <ProductCatalogue />
        </Route>
        <Route path="/admin/seller">
          <SellerManagment />
        </Route>
      </Switch>
    </>
  );
}

export default DashboardRoutes;
