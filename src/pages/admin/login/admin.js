import {React} from "react";
import Login from "../../../components/shared/login/login"

import AdminDashBoard from "../dashboard/dashboard"
import { BrowserRouter as Router, Route } from "react-router-dom";


const Admin = () => {
  return (
    <Router>
       <Route path='/admin' exact>  <Login/></Route> 
       <Route path='/admin/dashboard' exact>  <AdminDashBoard/></Route> 
    </Router>
  );
}

export default Admin;
 



