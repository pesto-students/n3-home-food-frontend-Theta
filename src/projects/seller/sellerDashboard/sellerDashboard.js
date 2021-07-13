import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import "./sellerDashboard.css";
import { Layout, Menu } from "antd";

import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { getUser } from "utils/helpers";
import SellerGraphs from "../sellerGraphs/sellerGraphs";
import SellerProducts from "../sellerProducts/sellerProducts";
import SellerProfile from "../sellerProfile/sellerProfile";
import { useTranslation } from "react-i18next";
import logo from "images/logo.png";
import Image from "components/image/image";
import Select from "components/selectBox/selectBox";

import { AvatarMenu } from "projects/admin/header/header";
import { Switch } from "react-router-dom";
import Orders from "../order/order";
const { Header, Content, Footer, Sider } = Layout;

const SellerDashBoard = () => {
  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const user = getUser() ? getUser().userType : null;
  useEffect(() => {
    if (user === "Admin") window.location.href = "/admin/dashboard";
    if (user === "Customer") window.location.href = "/customer";
    if (user === null) window.location.href = "/";
  }, [user]);

  const handdleActiveTabs = () => {
    if (window.location.pathname === "/seller/dashboard") setActiveTab("1");
    if (window.location.pathname === "/seller/product") setActiveTab("2");
    if (window.location.pathname === "/seller/profile") setActiveTab("3");
    if (window.location.pathname === "/seller/orders") setActiveTab("4");
  };

  useEffect(() => {
    handdleActiveTabs();
  }, []);

  const logoSize = collapsed ? 50 : 100;

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="home-food-logo">
            <Image
              url={logo}
              height={logoSize}
              width={logoSize}
              radius="100%"
            />
          </div>
          <Menu
            theme="dark"
            onClick={handdleActiveTabs}
            defaultSelectedKeys={[activeTab]}
            selectedKeys={[activeTab]}
            mode="inline"
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/seller/dashboard">
                {t("seller.dashboard.dashboardText")}
              </Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/seller/product">
                {t("seller.dashboard.productText")}
              </Link>
            </Menu.Item>

            <Menu.Item key="3" icon={<FileOutlined />}>
              <Link to="/seller/profile">
                {t("seller.dashboard.profileText")}
              </Link>
            </Menu.Item>

            <Menu.Item key="4" icon={<FileOutlined />}>
              <Link to="/seller/orders">{t("seller.dashboard.orderText")}</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="header-navbar">
            <h1>{t("seller.dashboard.profileText")}</h1>
            <div>
              <Select />
              <AvatarMenu />
            </div>
          </Header>
          <Content style={{ margin: "20px 16px" }}>
            {user === "Seller" ? (
              <div
                className="site-layout-background"
                style={{ padding: 0, minHeight: 360 }}
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

                  <Route path="/seller/orders">
                    <Orders />
                  </Route>
                </Switch>
              </div>
            ) : (
              (window.location.href = "/")
            )}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Home Food ©2021 Created by Pesto Theta
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default SellerDashBoard;
