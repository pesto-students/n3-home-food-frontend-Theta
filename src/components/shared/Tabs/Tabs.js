import React from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const CustomTabs = ({list,currentTab}) => {
  const callback = (tab) => {
    currentTab(tab);
  };

  return (
    <Tabs defaultActiveKey={list[0]} onChange={callback}>
        {list.map((tab)=>{
            return   <TabPane tab={tab} key={tab}/>
        })}      
    </Tabs>
  );
};

export default CustomTabs;
