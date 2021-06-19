import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getUser } from "../../../utils/helpers";
import SellerDashBoard from "../sellerDashboard/sellerDashboard";
import SellerRegistration from "../sellerRegistration/sellerRegistration";


const SellerLanding = () => {

  const user =  getUser() ? getUser().user_type : null

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
 



