import {
  DesktopOutlined, FileOutlined, PieChartOutlined
} from "@ant-design/icons";
import './sellerDashboard.css'
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React, { useState,useEffect } from "react";
import { Link, Route} from "react-router-dom";
import { getUser } from "../../../utils/helpers";
import SellerGraphs from "../sellerGraphs/sellerGraphs";
import SellerProducts from "../sellerProducts/sellerProducts";
import SellerProfile from "../sellerProfile/sellerProfile";
import logo from "../../../images/logo.png"
import Image from "../../../components/shared/image/image";
import { AvatarMenu } from "../../admin/header/header";
import { Switch } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

 const SellerDashBoard  = () => {

  const [collapsed,setCollapsed] = useState(false)

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed );
  };

  const user =  getUser() ? getUser().userType : null

  useEffect(()=>{
    if(user === 'Admin') window.location.href = '/admin/dashboard'
    if(user === 'Customer') window.location.href = '/customer'
    if(user === null) window.location.href = '/'
  },[user])

   

  const logoSize = collapsed ? 50 : 100

    return <>
        <Layout style={{ minHeight: "100vh" }}>
       
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="home-food-logo">
                 <Image url={logo} height={logoSize} width={logoSize} radius="100%"/>
              </div>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to="/seller/dashboard">Dashboard</Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<DesktopOutlined />}>
                <Link to="/seller/product">Product</Link>
              </Menu.Item>

              <Menu.Item key="3" icon={<FileOutlined />}>
                <Link to="/seller/profile">Profile</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
          <Header className="header-navbar">
                 <h1>Seller</h1>
                <AvatarMenu />
            </Header>
            <Content style={{ margin: "20px 16px" }}>
            {user === 'Seller' ?
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
               <Switch>
              
                <Route exact path="/seller/dashboard">
                  <SellerGraphs />
                </Route>

                <Route path="/seller/profile">
                  <SellerProfile />
                </Route>


                <Route path="/seller/product">
                  <SellerProducts />
                </Route>
                </Switch>

              </div>
              :
              window.location.href = '/'
}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Home Food ©2021 Created by Pesto Theta
            </Footer>
          </Layout>
        </Layout>
      </>
}

export default SellerDashBoard