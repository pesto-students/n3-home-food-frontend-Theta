import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "landingScreen/Landing";
import SellerLanding from "projects/seller/sellerLanding/sellerLanding";
import AdminLanding from "../projects/admin/adminLanding/adminLanding";
import BrokenLink from "components/BrokenLink";
import CustomerHome from "../projects/customer/customerHome/customerHome";
import SellerDetailWithProducts from "components/sellerDetailWithProducts/sellerDetailWithProducts";
import Orders from "../projects/customer/orders/order";
import { Checkout } from "../projects/customer/checkout/checkout";

function MainRoutes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>

        <Route path="/checkout" exact>
          <Checkout />
        </Route>

        <Route path="/admin">
          <AdminLanding />
        </Route>

        <Route path="/seller">
          <SellerLanding />
        </Route>

        <Route path="/customer">
          <CustomerHome />
        </Route>

        <Route path="/seller-detail/:id">
          <SellerDetailWithProducts />
        </Route>

        <Route path="/my/orders">
          <Orders />
        </Route>

        <Route exact default component={BrokenLink}></Route>
      </Switch>
    </Router>
  );
}

export default MainRoutes;
