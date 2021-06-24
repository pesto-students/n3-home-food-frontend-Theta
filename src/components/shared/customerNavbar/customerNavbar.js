import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row } from "antd";
import "antd/dist/antd.css";
import { React } from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import Image from "../image/image";

const { Header } = Layout;

const CustomerNavbar = () => {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Header className="navbar">
      <Row className="full-width">
        <Col md={10} sm={24} xs={24}>
          <Image height="70px" width="70px" url={logo} />
        </Col>
        <Col md={14} sm={24} xs={24} className="keep-items-left">
          <Link to="/my/orders">
            <Button type="link">Orders</Button>
          </Link>
          <Button type="link" onClick={logout}>
            Logout{" "}
          </Button>
          <Button type="link">
            <ShoppingCartOutlined className="cart-icon" />
          </Button>
        </Col>
      </Row>
    </Header>
  );
};

export default CustomerNavbar;
