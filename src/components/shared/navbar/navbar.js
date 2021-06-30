import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row } from "antd";
import "antd/dist/antd.css";
import { React } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import { setIsCustomerLoginDrawerOpen } from "../../../store/actions";
import Image from "../image/image";
import SelectBox from "../selectBox/selectBox";
import "./navbar.css";
import { useTranslation } from "react-i18next";


const { Header } = Layout;


const Navbar = (props) => {
  const { t } = useTranslation();

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
          <Link to="/seller/login">
            <Button type="link">{t('Header.Become Seller')}</Button>
          </Link>
          <Button type="link" onClick={toggleDrawer}>
            {t('Header.Sign In')}
          </Button>
          <Link to="/admin/login">
            <Button type="link">{t('Header.Admin')}</Button>
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
