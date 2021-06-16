import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const  AdminDashBoard  = () => {
 
  const [collapsed,setCollapsed] = useState(false)

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  
   
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Product Category
            </Menu.Item>
    
    
            <Menu.Item key="9" icon={<FileOutlined />}>
              Seller
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
    
                 <h1>dashboard</h1>
          </Content>
        </Layout>
      </Layout>
    );
}


export default AdminDashBoard