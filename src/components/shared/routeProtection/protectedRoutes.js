import {React} from "react";
import { BrowserRouter as Router, Route,Redirect,Switch } from "react-router-dom";


const ProtectedRoutes = () => {
  

    const authentication = {
        isAdminLoggedIn:false,
        onAuthentication(){
        }
    }
  return (
    <Router>
      {/* <Switch>
       <Route path='/admin' exact>  <Login/></Route> 
       <Route path='/admin/dashboard'>  <AdminDashBoard/></Route>
       </Switch>  */}
    </Router>
  );
 
}

export default ProtectedRoutes;
 



