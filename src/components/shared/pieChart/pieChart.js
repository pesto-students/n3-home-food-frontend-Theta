import { useEffect, useRef } from "react";
import bb, { pie } from "billboard.js";
import "billboard.js/dist/billboard.css";
const PieChart = () => {
  const PieChart = useRef(null);

  useEffect(() => {
    bb.generate({
        data: {
          columns: [
          ["data1", 30],
          ["data2", 120]
          ],
          type: pie(), // for ESM specify as: pie()
          onclick: function(d, i) {
          console.log("onclick", d, i);
         },
          onover: function(d, i) {
          console.log("onover", d, i);
         },
          onout: function(d, i) {
          console.log("onout", d, i);
         }
        },
      bindto: PieChart.current
    })
    
  }, []);
  return <div style={{width:'70vw'}} ref={PieChart}>chart</div>;
};

export default PieChart;
