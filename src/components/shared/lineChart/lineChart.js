import { useEffect, useRef } from "react";
import bb, { area, areaSpline } from "billboard.js";

const LineChart = () => {
  const lineChart = useRef(null);

  useEffect(() => {
    bb.generate({
      data: {
        columns: [
          ["data1", 300, 350, 300, 0, 0, 0],
          ["data2", 130, 100, 140, 200, 150, 50],
        ],
        types: {
          data1: area(), // for ESM specify as: area()
          data2: areaSpline(), // for ESM specify as: areaSpline()
        },
      },
      zoom: {
        enabled: true, // for ESM specify as: zoom()
        type: "drag",
      },
      bindto: lineChart.current,
    });
  }, []);
  return <div ref={lineChart}>kapil</div>;
};

export default LineChart;
