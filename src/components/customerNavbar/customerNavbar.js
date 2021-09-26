import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Modal, Input, Form } from "antd";

import { Link } from "react-router-dom";
import logo from "images/logo.png";
import { getPincode, setPincode } from "utils/helpers";
import Image from "components/image/image";
import { useTranslation } from "react-i18next";
import SelectBox from "../selectBox/selectBox";

const { Header } = Layout;

const CustomerNavbar = ({ updatePincode }) => {
  const { t } = useTranslation();
  const [isPincodeModal, setIsPincodeModal] = useState(false);
  const [currentPincode, setCurrentPincode] = useState("");

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const submitPincode = (pincode) => {
    let code = pincode.pincode;
    setPincode(code);
    setIsPincodeModal(false);
    setCurrentPincode(code);
    updatePincode(code);
  };

  useEffect(() => {
    let code = getPincode();
    if (code) {
      setIsPincodeModal(false);
      setCurrentPincode(code);
      updatePincode(code);
    } else {
      setIsPincodeModal(true);
    }
  }, [updatePincode]);

  return (
    <Header className="navbar">
      <Modal
        title="Enter Pincode"
        visible={isPincodeModal}
        okText="Save"
        onCancel={() => setIsPincodeModal(false)}
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
            label="Pincode"
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
          <Link to="/customer">
            <Image height="70px" width="70px" url={logo} />
          </Link>
        </Col>
        <Col md={14} sm={24} xs={24} className="keep-items-left">
          <SelectBox />
          <Link to="/my/orders">
            <Button type="link">{t("Header.Orders")}</Button>
          </Link>
          <Button type="link" onClick={logout}>
            {t("Header.Logout")}{" "}
          </Button>

          <Button type="link" onClick={() => setIsPincodeModal(true)}>
            {t("Header.Pincode")} {currentPincode && `(${currentPincode})`}
          </Button>

          <Link to="/checkout">
            <Button type="link">
              <ShoppingCartOutlined className="cart-icon" />
            </Button>
          </Link>
        </Col>
      </Row>
    </Header>
  );
};

export default CustomerNavbar;
