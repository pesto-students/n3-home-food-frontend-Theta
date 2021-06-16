import { React } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import Admin from "../pages/admin/login/admin";
import LandingPage from "../pages/landingScreen/Landing";
import BrokenLink from "../pages/BrokenLink";

function MainRoutes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route exact default component={BrokenLink}></Route>
      </Switch>
    </Router>
  );
}

export default MainRoutes;
