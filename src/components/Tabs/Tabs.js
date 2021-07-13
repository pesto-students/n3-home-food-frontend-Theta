import React from "react";

import { Tabs } from "antd";

const { TabPane } = Tabs;

const CustomTabs = ({ list, currentTab }) => {
  const callback = (tab) => {
    currentTab(tab);
  };

  return (
    <Tabs defaultActiveKey={list[0]} onChange={callback}>
      {list.map((tab, key) => {
        return <TabPane tab={tab} key={key} />;
      })}
    </Tabs>
  );
};

export default CustomTabs;
