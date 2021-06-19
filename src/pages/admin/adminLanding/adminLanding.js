import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../../../components/shared/login/login";
import AdminDashBoard from "../dashboard/dashboard";



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
 



