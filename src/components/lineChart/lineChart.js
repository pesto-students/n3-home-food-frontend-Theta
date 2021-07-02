import * as React from "react";
import { useEffect, useRef } from "react";
import bb, { line, zoom } from "billboard.js";
import { Row } from "antd";
const LineChart = (props) => {
  const lineChart = useRef(null);

  useEffect(() => {
    console.log("data");
    bb.generate({
      data: {
        columns: [props.dataSource],
        type: line(), // for ESM specify as: line()
      },
      zoom: {
        enabled: zoom(), // for ESM specify as: zoom()
        type: "drag",
      },
      bindto: lineChart.current,
    });
  }, [props.dataSource]);

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
