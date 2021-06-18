import {
  DesktopOutlined, FileOutlined, PieChartOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import SellerGraphs from "../sellerGraphs/sellerGraphs";
import SellerProducts from "../sellerProducts/sellerProducts";
import SellerProfile from "../sellerProfile/sellerProfile";
const { Header, Content, Footer, Sider } = Layout;

 const SellerDashBoard  = () => {

  const [collapsed,setCollapsed] = useState(false)
  const onCollapse = (collapsed) => {
    setCollapsed({ collapsed });
  };



    return <>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
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
}

export default SellerDashBoard