import { React } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProductCatalogue from '../products catalogue';


function DashboardRoutes() {
  return (
    <Router>
      <Switch>
     <Route path='/admin/dashboard' exact><ProductCatalogue /></Route> 
     <Route path='/admin/dashboard/product'><ProductCatalogue /></Route> 

    </Switch>
   </Router>
  );
}

export default DashboardRoutes;
