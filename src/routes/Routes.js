import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "../pages/admin/login/admin";
import LandingPage from "../pages/landingScreen/Landing";

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
     
      </Switch>
    </Router>
  );
}

export default MainRoutes;
