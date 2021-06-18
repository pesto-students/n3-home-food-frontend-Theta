import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import SellerProfile from "../sellerProfile/sellerProfile";
import SellerGraphs from "../sellerGraphs/sellerGraphs";
import SellerProducts from "../sellerProducts/sellerProducts";
const { Header, Content, Footer, Sider } = Layout;

export default class SellerDashBoard extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to="/seller/dashboard">Dashboard</Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<DesktopOutlined />}>
                <Link to="/seller/dashboard/product">Product</Link>
              </Menu.Item>

              <Menu.Item key="3" icon={<FileOutlined />}>
                <Link to="/seller/dashboard/profile">Profile</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Route exact path="/seller/dashboard/">
                  <SellerGraphs />
                </Route>

                <Route path="/seller/dashboard/profile">
                  <SellerProfile />
                </Route>


                <Route path="/seller/dashboard/product">
                  <SellerProducts />
                </Route>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Home Food ©2021 Created by Pesto Theta
            </Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}
