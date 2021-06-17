import {React} from "react";
import Login from "../../../components/shared/login/login"

import AdminDashBoard from "../dashboard/dashboard"
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";


const AdminLanding = () => {
  return (
    <Router>
      <Switch>
       <Route path='/admin' exact>  <Login/></Route> 
       <Route path='/admin/dashboard'>  <AdminDashBoard/></Route>
       </Switch> 
    </Router>
  );
}

export default AdminLanding;
 



