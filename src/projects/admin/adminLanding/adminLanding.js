import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminDashBoard from "../dashboard/dashboard";
import AdminLogin from "../adminLogin/adminLogin";

const AdminLanding = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin/login" exact>
          <AdminLogin />
        </Route>
        <Route path="/admin">
          <AdminDashBoard />
        </Route>
      </Switch>
    </Router>
  );
};

export default AdminLanding;
