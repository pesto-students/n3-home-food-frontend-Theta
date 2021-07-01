import { useEffect, useRef } from "react";
import bb, { line, zoom } from "billboard.js";
import "billboard.js/dist/billboard.css";
const LineChart = () => {
  const lineChart = useRef(null);

  useEffect(() => {
    bb.generate({
      data: {
        columns: [
      ["sample", 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
        ],
        type: line(), // for ESM specify as: line()
      },
      zoom: {
        enabled: zoom(), // for ESM specify as: zoom()
        type: "drag"
      },
      bindto: lineChart.current
    })
    
  }, []);
  return <div ref={lineChart}>chart</div>;
};

export default LineChart;
