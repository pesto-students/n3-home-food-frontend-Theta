import { React} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LandingPage from "../pages/landingScreen/Landing";
import SellerLanding from "../pages/seller/sellerLanding/sellerLanding"
import AdminLanding from "../pages/admin/adminLanding/adminLanding"
import BrokenLink from "../pages/BrokenLink";
import { withRouter } from "react-router-dom";


function MainRoutes(props) {

  return (
    <Router>
      <Switch>
        <Route path="/" exact> 
          <LandingPage />
        </Route>
        <Route path="/admin">
          <AdminLanding />
        </Route>
        <Route path="/seller">
          <SellerLanding />
        </Route>
        <Route exact default component={BrokenLink}></Route>
      </Switch>
    </Router>
  );
}

export default withRouter(MainRoutes)
