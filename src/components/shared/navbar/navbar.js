import { Button, Col, Layout, Row } from "antd";
import "antd/dist/antd.css";
import { React } from "react";
import Image from "../image/image";
import SelectBox from "../selectBox/selectBox";
import logo from '../../../images/logo.png'
import {Link} from "react-router-dom"
import './navbar.css'

import {
    ShoppingCartOutlined
  } from '@ant-design/icons';

const { Header } = Layout;
const Navbar = () => {


  return (
    <Header className="navbar">
    <Row className="full-width">
      <Col md={10} sm={24} xs={24}>
        <Image
          height="70px"
          width="70px"
          url={logo}
        />
      </Col>
      <Col md={14} sm={24} xs={24} className='keep-items-left'>
      <SelectBox />
      <Link to='/seller'>
        <Button type="link">Become Seller</Button>
        </Link>
        <Button type="link">Sign In</Button>
        <Link to='/admin'>
        <Button type="link">Admin</Button>
        </Link>
        <Button type="link"><ShoppingCartOutlined className="cart-icon" /></Button>
        
     
      </Col>
    </Row>
  </Header>
  );
};

export default Navbar;
