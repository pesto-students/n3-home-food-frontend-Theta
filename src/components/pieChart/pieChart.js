import React from "react";
import { useEffect, useRef } from "react";
import bb, { pie } from "billboard.js";
import { Row } from "antd";
import "./pieChart.css";
import { useTranslation } from "react-i18next";

const PieChart = ({ dataSource }) => {
  const { t } = useTranslation();
  const PieChart = useRef(null);

  useEffect(() => {
    bb.generate({
      data: {
        columns: dataSource,
        type: pie(), // for ESM specify as: pie()
        onover: function (d, i) {},
        onout: function (d, i) {},
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
        <h5>{t("Header.Categories Sold")}</h5>
      </Row>
      <div ref={PieChart}>chart</div>
    </>
  );
};

export default PieChart;
