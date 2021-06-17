import { Button, Col, Layout, Row } from "antd";
import "antd/dist/antd.css";
import { React } from "react";
import Image from "../image/image";
import SelectBox from "../selectBox/selectBox";
import logo from '../../../images/logo.png'
import './navbar.css'

import {
    ShoppingCartOutlined
  } from '@ant-design/icons';

const { Header } = Layout;
const Navbar = () => {


  return (
    <Header className="navbar">
    <Row className="full-width">
      <Col span={10}>
        <Image
          height="70px"
          width="70px"
          url={logo}
        />
      </Col>
      <Col span={14} className='keep-items-left'>
      <SelectBox />
        <Button type="link">Become Seller</Button>
        <Button type="link">Sign In</Button>
        <Button type="link">Admin</Button>

        <Button type="link"><ShoppingCartOutlined className="cart-icon" /></Button>
        
     
      </Col>
    </Row>
  </Header>
  );
};

export default Navbar;
