import { React } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LandingPage from "../pages/landingScreen/Landing";
import SellerLanding from "../pages/seller/sellerLanding/sellerLanding"
import AdminLanding from "../pages/admin/adminLanding/adminLanding"
import BrokenLink from "../pages/BrokenLink";
import { Redirect } from "react-router-dom";
import { getUser } from "../utils/helpers";


function MainRoutes() {


 const user =  getUser() ? getUser().user_type : null
 console.log(user === 'Seller',"akkk")

  return (
    <Router>
      <Switch>
        <Route path="/" exact> 
          <LandingPage />
        </Route>

        {user === 'Admin' &&
        <Route path="/admin">
          <AdminLanding />
        </Route>
          }
        {user === 'Seller' &&
        <Route path="/seller">
          <SellerLanding />
        </Route>
        }
       {user === null &&
         <Redirect to='/'/>
        }
        <Route exact default component={BrokenLink}></Route>
      </Switch>
    </Router>
  );
}

export default MainRoutes
