import { React, useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Layout, Modal, Row } from "antd";
import "antd/dist/antd.css";
import { useTranslation } from "react-i18next";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "images/logo.png";
import { setIsCustomerLoginDrawerOpen } from "../../../store/actions";
import { getPincode, setPincode } from "utils/helpers";
import Image from "../image/image";
import SelectBox from "../selectBox/selectBox";
import "./navbar.css";

const { Header } = Layout;

const Navbar = ({ callBack }) => {
  const { t } = useTranslation();
  const Dispatch = useDispatch();
  const [currentPincode, setCurrentPincode] = useState("");

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
  return (
    <Header className="navbar">
      <Modal
        title={t("Header.Enter Pincode")}
        visible={openPincdeModal}
        initialValues={{
          pincode: currentPincode,
        }}
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

      <Row className="full-width">
        <Col md={10} sm={24} xs={24}>
          <Link to="/">
            <Image height="70px" width="70px" url={logo} />
          </Link>
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
          <Button type="link">
            <ShoppingCartOutlined className="cart-icon" />
          </Button>
        </Col>
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
