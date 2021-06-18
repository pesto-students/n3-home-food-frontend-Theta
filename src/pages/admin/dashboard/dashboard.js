import {
  DesktopOutlined, FileOutlined, PieChartOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardRoutes from "../dashboard-routes/dashboardRoutes";
import "./dashboard.css";


const { Header, Content, Footer, Sider } = Layout;

const AdminDashBoard = ()                                                                            => {

  const [collapsed,setCollapsed] = useState(false)
  const onCollapse = (collapsed) => {
    setCollapsed({ collapsed });
  };




    return  <>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
           
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                   <Link to='/admin/dashboard'>
                Dashboard
                </Link>
              </Menu.Item>
             
            
              <Menu.Item key="2" icon={<DesktopOutlined />}>
               <Link to='/admin/dashboard/product'>
                Product
                </Link>
              </Menu.Item>
                       
              <Menu.Item key="3" icon={<FileOutlined />}>
              <Link to='/admin/dashboard/seller'>
                Seller
                </Link>
              </Menu.Item>
            
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item></Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <DashboardRoutes />
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
