import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminDashboard from "../adminDashboard/adminDashboard";
import ProductCatalogue from "../products catalogue";
import SellerManagment from "../sellerManagment";

function DashboardRoutes() {
  return (
    <>
      <Switch>
        <Route path="/admin/dashboard" exact>
          <AdminDashboard />
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
