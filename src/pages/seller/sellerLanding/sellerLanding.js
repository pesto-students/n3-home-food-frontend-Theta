import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SellerDashBoard from "../sellerDashboard/sellerDashboard";
import SellerRegistration from "../sellerRegistration/sellerRegistration";


const SellerLanding = () => {


  return (
    <Router>
      <Switch>
       <Route path='/seller' exact>  <SellerRegistration/></Route> 
       <Route path='/seller/dashboard'>  <SellerDashBoard/></Route> 
       </Switch>
    </Router>
  );
}

export default SellerLanding;
 



