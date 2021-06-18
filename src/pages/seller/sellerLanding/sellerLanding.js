import {React} from "react";
import Login from "../../../components/shared/login/login"
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import SellerProfile from "../sellerProfile/sellerProfile";
import SellerDashBoard from "../sellerDashboard/sellerDashboard";
import SellerRegistration from "../sellerRegistration/sellerRegistration";


const sellerLanding = () => {
  return (
    <Router>
      <Switch>
       <Route path='/seller' exact>  <SellerRegistration/></Route> 
       <Route path='/seller/dashboard'>  <SellerDashBoard/></Route> 
       </Switch>
    </Router>
  );
}

export default sellerLanding;
 



