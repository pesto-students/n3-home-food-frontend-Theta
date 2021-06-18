import { Drawer } from "antd";
import React, { useState,useEffect } from "react";
import Login from "../../components/shared/login/login";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsCustomerLoginDrawerOpen } from "../../store/actions";

const CustomerLogin = (props) => {

  useEffect(()=>{
    setVisible(props.title.isCustomerLoginDrawerOpen);
  },[props.title.isCustomerLoginDrawerOpen])

  const [visible, setVisible] = useState(true);
  const Dispatch = useDispatch();

  const showDrawer = () => {
    setVisible(true);
  };
 
  const onClose = () => {
    setVisible(!props.title.isCustomerLoginDrawerOpen);
     Dispatch(setIsCustomerLoginDrawerOpen(false))

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

const mapStateToProps = state => {
  return {
    title: state
  };
};
export default connect(mapStateToProps)(CustomerLogin);

