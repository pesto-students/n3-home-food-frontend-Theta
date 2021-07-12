import React from "react";
import { useEffect, useRef } from "react";
import bb, { pie } from "billboard.js";
import { Row } from "antd";
import "./pieChart.css";
const PieChart = ({ dataSource }) => {
  const PieChart = useRef(null);

  useEffect(() => {
    bb.generate({
      data: {
        columns: dataSource,
        type: pie(), // for ESM specify as: pie()
        onover: function (d, i) {
          console.log("onover", d, i);
        },
        onout: function (d, i) {
          console.log("onout", d, i);
        },
      },
      pie: {
        innerRadius: 20,
      },
      bindto: PieChart.current,
    });
  }, [dataSource]);
  return (
    <>
      <Row justify="start" className="mt-1">
        <h5>Categories Sold</h5>
      </Row>
      <div ref={PieChart}>chart</div>
    </>
  );
};

export default PieChart;
