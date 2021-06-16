import { React } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import ProductCatalogue from '../products catalogue';
import BrokenLink from "../../BrokenLink" 
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer, Sider } = Layout;


function DashboardRoutes() {
  return (
    <>
    <Router>
      <Switch>
     <Route path='' exact><ProductCatalogue /></Route> 
    </Switch>
   </Router>
   </>
  );
}

export default DashboardRoutes;
