import { Drawer } from "antd";
import React, { useState } from "react";
import Login from "../../components/shared/login/login";

const CustomerLogin = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(true);
  };

  return (
    <Drawer
      title="Sign in"
      placement="right"
      width={400}
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <Login />
    </Drawer>
  );
};

export default CustomerLogin;
