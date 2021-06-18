import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row } from "antd";
import "antd/dist/antd.css";
import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import { setIsCustomerLoginDrawerOpen } from "../../../store/actions";
import Image from "../image/image";
import SelectBox from "../selectBox/selectBox";
import "./navbar.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


const { Header } = Layout;


const Navbar = (props) => {

  const Dispatch = useDispatch();
  const toggleDrawer = () => {
    Dispatch(setIsCustomerLoginDrawerOpen(true))
  };

  return (
    <Header className="navbar">
      <Row className="full-width">
        <Col md={10} sm={24} xs={24}>
          <Image height="70px" width="70px" url={logo} />
        </Col>
        <Col md={14} sm={24} xs={24} className="keep-items-left">
          <SelectBox />
          <Link to="/seller">
            <Button type="link">Become Seller</Button>
          </Link>
          <Button type="link" onClick={toggleDrawer}>
            Sign In
          </Button>
          <Link to="/admin/dashboard">
            <Button type="link">Admin</Button>
          </Link>
          <Button type="link">
            <ShoppingCartOutlined className="cart-icon" />
          </Button>
        </Col>
      </Row>
    </Header>
  );
};


const mapStateToProps = state => {
  return {
    title: state
  };
};
export default connect(mapStateToProps)(Navbar);
