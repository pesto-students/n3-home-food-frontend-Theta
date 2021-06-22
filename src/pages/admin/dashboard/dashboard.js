import {
  DesktopOutlined, FileOutlined, PieChartOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/shared/image/image";
import logo from "../../../images/logo.png";
import { getUser } from "../../../utils/helpers";
import DashboardRoutes from "../dashboard-routes/dashboardRoutes";
import { AvatarMenu } from "../header/header";
import "./dashboard.css";
const { Header, Content, Footer, Sider } = Layout;

const AdminDashBoard = ()                                                                            => {

  const [collapsed,setCollapsed] = useState(false)
  const onCollapse = (collapsed) => {
    setCollapsed({ collapsed });
  };

  const user =  getUser() ? getUser().userType : null
  useEffect(()=>{
    if(user === 'Seller') window.location.href = '/seller/dashboard'
    if(user === null) window.location.href = '/'
  },[user])


  const logoSize = collapsed ? 50 : 100

    return  <>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="home-food-logo" >
            <Image url={logo} height={logoSize} width={logoSize} radius="100%"/>

              </div>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<DesktopOutlined />}>
                <Link to="/admin/product">Product</Link>
              </Menu.Item>

              <Menu.Item key="3" icon={<FileOutlined />}>
                <Link to="/admin/seller">Seller</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
          <Header className="header-navbar">
                 <h1>Admin</h1>
                <AvatarMenu />
            </Header>
            <Content style={{ margin: "20px 16px" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                {user === 'Admin' &&
                <DashboardRoutes />
                }
            
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Home Food ©2021 Created by Pesto Theta
            </Footer>
          </Layout>
        </Layout>
      </>
}

export default AdminDashBoard
