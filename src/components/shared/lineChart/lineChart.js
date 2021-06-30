import React, { Component } from "react";

// component and styles
// import BillboardChart from "react-billboardjs";

const CHART_DATA = {
  columns: [
    ["data1", 30, 20, 50, 40, 60, 50],
    ["data2", 200, 130, 90, 240, 130, 220],
    ["data3", 300, 200, 160, 400, 250, 250],
  ],
  type: "line",
};

export default class LineChart extends Component {
  render() {
    return(
      <>
      </>
    )
 
    // return <BillboardChart data={CHART_DATA} />;
  }
}
