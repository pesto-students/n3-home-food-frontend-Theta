import { React } from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import AdminDashboard from "../adminDashboard/adminDashboard";
import ProductCatalogue from '../products catalogue';
import SellerManagment from "../sellerManagment";


function DashboardRoutes() {
  return (
    <>
      <Switch>
     <Route path='/admin/dashboard' exact><ProductCatalogue /></Route> 
     <Route path='/admin/product' ><ProductCatalogue /></Route> 
     <Route path='/admin/seller' ><SellerManagment /></Route> 

    </Switch>
   </>
  );
}

export default DashboardRoutes;
