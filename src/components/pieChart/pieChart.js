import React from 'react';
import { useEffect, useRef } from "react";
import bb, { pie } from "billboard.js";
import { Row } from "antd";
const PieChart = ({dataSource}) => {
  const PieChart = useRef(null);

  useEffect(() => {
    bb.generate({
        data: {
          columns:dataSource ,
          type: pie(), // for ESM specify as: pie()
        //   onclick: function(d, i) {
        //   console.log("onclick", d, i);
        //  },
          onover: function(d, i) {
          console.log("onover", d, i);
         },
          onout: function(d, i) {
          console.log("onout", d, i);
         }
        },
      bindto: PieChart.current
    })
    
  }, [dataSource]);
  return(
    <>
   <Row justify='center' className='mt-1'><h4>Categories Sold</h4></Row>
   <div  ref={PieChart}>chart</div>
   </>
  )
};

export default PieChart;
