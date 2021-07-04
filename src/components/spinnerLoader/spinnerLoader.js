import { React } from "react";
import { Spin, Tooltip } from "antd";

const SpinnerLoader = () => {
  return (
    <Tooltip placement="bottom" title="Loding">
      <Spin size="large" />
    </Tooltip>
  );
};

export default SpinnerLoader;
