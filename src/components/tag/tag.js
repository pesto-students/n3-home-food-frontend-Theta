import { React } from "react";
import { Tag } from "antd";

const TabTag = ({ text, count }) => {
  return (
    <span>
      {text}
      <Tag style={{ marginLeft: "10px" }} color="#1890ff">
        {count}
      </Tag>
    </span>
  );
};

export default TabTag;
