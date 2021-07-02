import { useEffect, useRef } from "react";
import bb, { pie } from "billboard.js";
import "billboard.js/dist/billboard.css";
import { Row } from "antd";
const PieChart = ({dataSource}) => {
  const PieChart = useRef(null);

  useEffect(() => {
    bb.generate({
        data: {
          columns:dataSource,
          type: pie(), // for ESM specify as: pie()
        //   onclick: function(d, i) {
        //   console.log("onclick", d, i);
        //  },
        //   onover: function(d, i) {
        //   console.log("onover", d, i);
        //  },
        //   onout: function(d, i) {
        //   console.log("onout", d, i);
        //  }
        },
      bindto: PieChart.current
    })
    
  }, [dataSource]);
  return(
    <>
   <div style={{width:'70vw'}} ref={PieChart}>chart</div>
   <Row justify='center'><h4>Categories Sold</h4></Row>
   </>
  )
};

export default PieChart;
