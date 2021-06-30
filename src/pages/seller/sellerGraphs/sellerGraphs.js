import { React } from "react";
import "antd/dist/antd.css";
import LineChart from "../../../components/shared/lineChart/lineChart";

function SellerGraphs() {
  return (
    <div>
      <div id="chart">
        <LineChart />
      </div>
    </div>
  );
}

export default SellerGraphs;
