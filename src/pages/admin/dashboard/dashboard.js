import {
  DesktopOutlined, FileOutlined, PieChartOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../../utils/helpers";
import DashboardRoutes from "../dashboard-routes/dashboardRoutes";
import { AvatarMenu } from "../header/header";


const { Header, Content, Footer, Sider } = Layout;

const AdminDashBoard = ()                                                                            => {

  const [collapsed,setCollapsed] = useState(false)
  const onCollapse = (collapsed) => {
    setCollapsed({ collapsed });
  };

  const user =  getUser() ? getUser().user_type : null
  useEffect(()=>{
    if(user === 'Seller') window.location.href = '/seller/dashboard'
    if(user === null) window.location.href = '/'
  },[user])



    return  <>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<DesktopOutlined />}>
                <Link to="/admin/dashboard/product">Product</Link>
              </Menu.Item>

              <Menu.Item key="3" icon={<FileOutlined />}>
                <Link to="/admin/dashboard/seller">Seller</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div className="header">
                <AvatarMenu />
              </div>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item></Breadcrumb.Item>
              </Breadcrumb>
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
