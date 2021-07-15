import { Drawer } from "antd";
import React, { useState, useEffect } from "react";
import Login from "components/login/login";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { setIsCustomerLoginDrawerOpen } from "../store/actions";

const CustomerLogin = (props) => {
  const { t } = useTranslation();
  useEffect(() => {
    setVisible(props.title.isCustomerLoginDrawerOpen);
  }, [props.title.isCustomerLoginDrawerOpen]);

  const [visible, setVisible] = useState(true);
  const Dispatch = useDispatch();

  // const showDrawer = () => {
  //   setVisible(true);
  // };

  const onClose = () => {
    setVisible(!props.title.isCustomerLoginDrawerOpen);
    Dispatch(setIsCustomerLoginDrawerOpen(false));
  };

  return (
    <Drawer
      title={t("Landing.Login")}
      placement="right"
      width={400}
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <Login userType={props.type} />
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return {
    title: state,
  };
};
export default connect(mapStateToProps)(CustomerLogin);
