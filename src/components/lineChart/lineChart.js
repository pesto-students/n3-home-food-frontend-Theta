import * as React from "react";
import { useEffect, useRef } from "react";
import bb, { line, zoom } from "billboard.js";
import { Row } from "antd";
const LineChart = ({ dataSource }) => {
  const lineChart = useRef(null);

  useEffect(() => {
    bb.generate({
      data: {
        columns: [dataSource],
        type: line(), // for ESM specify as: line()
      },
      zoom: {
        enabled: zoom(), // for ESM specify as: zoom()
        type: "drag",
      },
      bindto: lineChart.current,
    });
  }, [dataSource]);

  return (
    <>
      <div style={{ width: "70vw" }} ref={lineChart}>
        chart
      </div>
      <Row justify="center">
        <h4>My Income</h4>
      </Row>
    </>
  );
};

export default LineChart;
