import { React } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProductCatalogue from '../products catalogue';
import SellerManagment from "../sellerManagment";


function DashboardRoutes() {
  return (
    <Router>
      <Switch>
     <Route path='/admin/dashboard' exact><ProductCatalogue /></Route> 
     <Route path='/admin/dashboard/product' ><ProductCatalogue /></Route> 
     <Route path='/admin/dashboard/seller' ><SellerManagment /></Route> 

    </Switch>
   </Router>
  );
}

export default DashboardRoutes;
