import {React} from "react";
import Login from "../../../components/shared/login/login"

import AdminDashBoard from "../dashboard/dashboard"
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
import { getUser } from "../../../utils/helpers";


const AdminLanding = () => {
  
  if(getUser())
  {
  return (
    <Router>
       <Route path='/admin' exact>  <Login/></Route> 
       <Route path='/admin/dashboard'>  <AdminDashBoard/></Route> 
    </Router>
  );
  }
  else
  {
    return <Redirect to='/'/>
  }
}

export default AdminLanding;
 



