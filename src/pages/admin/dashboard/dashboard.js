import React from "react";
import "antd/dist/antd.css";
import "./dashboard.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from "@ant-design/icons";
import DashboardRoutes from "../dashboard-routes/dashboardRoutes";
import {Link} from "react-router-dom"


const { Header, Content, Footer, Sider } = Layout;

export default class AdminDashBoard extends React.Component {
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
              <Link to='/admin/dashboard'>
                Seller
                </Link>
              </Menu.Item>
            
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
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
    );
  }
}
