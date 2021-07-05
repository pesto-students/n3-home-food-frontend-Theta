import { React, useEffect, useState } from "react";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Layout, Modal, Row, Drawer } from "antd";

import { useTranslation } from "react-i18next";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "images/logo.png";
import { setIsCustomerLoginDrawerOpen } from "store/actions";
import { getPincode, setPincode } from "utils/helpers";
import Image from "../image/image";
import SelectBox from "../selectBox/selectBox";
import "./navbar.css";
import CustomerLogin from "landingScreen/customerLogin";

const { Header } = Layout;

const Navbar = ({ callBack }) => {
  const { t } = useTranslation();
  const Dispatch = useDispatch();
  const [currentPincode, setCurrentPincode] = useState("");
  const [visibleResponsiveNavbar, setVisibleResponsiveNavbar] = useState(false);
  const [openPincdeModal, setOpenPincodeModal] = useState(false);

  const toggleDrawer = () => {
    Dispatch(setIsCustomerLoginDrawerOpen(true));
  };

  useEffect(() => {
    let code = getPincode();
    if (code) {
      setOpenPincodeModal(false);
      setCurrentPincode(code);
    } else {
      setOpenPincodeModal(true);
    }
  }, []);

  const submitPincode = (pincode) => {
    let code = pincode.pincode;
    setPincode(code);
    setOpenPincodeModal(false);
    setCurrentPincode(code);
    callBack(code);
  };

  const onOpenResponsive = () => {
    setVisibleResponsiveNavbar(true);
  };
  const onCloseResponsive = () => {
    setVisibleResponsiveNavbar(false);
  };

  return (
    <Header className="navbar">
      <Modal
        title={t("Header.Enter Pincode")}
        visible={openPincdeModal}
        okText={t("Header.Save")}
        onCancel={() => setOpenPincodeModal(false)}
        okButtonProps={{
          form: "category-editor-form",

          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
          layout="vertical"
          id="category-editor-form"
          initialValues={{
            pincode: currentPincode,
          }}
          hideRequiredMark
          onFinish={submitPincode}
        >
          <Form.Item
            name="pincode"
            label={t("Header.Pincode")}
            rules={[
              {
                required: true,
                message: "Please Enter Pincode",
              },
              {
                max: 10,
                message: "Pincode Maximun 10 characters.",
              },
            ]}
          >
            <Input size="large" placeholder="Pincode" />
          </Form.Item>
        </Form>
      </Modal>

      <Drawer
        title="Home Food"
        placement="left"
        closable={false}
        onClose={onCloseResponsive}
        visible={visibleResponsiveNavbar}
      >
        <Col md={14} sm={24} xs={24} className="responsive-items">
          <SelectBox />
          <Link to="/seller/login">
            <Button type="link">{t("Header.Become Seller")}</Button>
          </Link>
          <Button type="link" onClick={toggleDrawer}>
            {t("Header.Sign In")}
          </Button>

          <Button type="link" onClick={() => setOpenPincodeModal(true)}>
            {t("Header.Pincode")} {currentPincode && `(${currentPincode})`}
          </Button>

          <Link to="/admin/login">
            <Button type="link">{t("Header.Admin")}</Button>
          </Link>
        </Col>
      </Drawer>

      <Row className="full-width">
        <Col md={10} sm={24} xs={24} className="logo-bar">
          <Link to="/">
            <Image height="70px" width="70px" url={logo} />
          </Link>
          <MenuUnfoldOutlined
            className="hamburger"
            onClick={onOpenResponsive}
          />
        </Col>
        <Col md={14} sm={24} xs={24} className="keep-items-left">
          <SelectBox />
          <Link to="/seller/login">
            <Button type="link">{t("Header.Become Seller")}</Button>
          </Link>
          <Button type="link" onClick={toggleDrawer}>
            {t("Header.Sign In")}
          </Button>

          <Button type="link" onClick={() => setOpenPincodeModal(true)}>
            {t("Header.Pincode")} {currentPincode && `(${currentPincode})`}
          </Button>

          <Link to="/admin/login">
            <Button type="link">{t("Header.Admin")}</Button>
          </Link>
        </Col>
        <CustomerLogin type="Customer" />
      </Row>
    </Header>
  );
};

const mapStateToProps = (state) => {
  return {
    title: state,
  };
};
export default connect(mapStateToProps)(Navbar);
