import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import Login from '../../components/shared/login/login';

const CustomerLogin = () => {

    const [visible, setVisible] = useState(true);

    const showDrawer = () => {
      setVisible(true);
    };
    const onClose = () => {
      setVisible(true);
    };


    return    <Drawer
    title="Sign in"
    placement="right"
    width={400}
    closable={true}
    onClose={onClose}
    visible={visible}
  >
    <Login/>
  </Drawer>
  };

  export default CustomerLogin