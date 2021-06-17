import {React} from "react";
import Login from "../../../components/shared/login/login"
import { BrowserRouter as Router, Route } from "react-router-dom";


const sellerLanding = () => {
  return (
    <Router>
       <Route path='/seller' exact>  <Login/></Route> 
    </Router>
  );
}

export default sellerLanding;
 



