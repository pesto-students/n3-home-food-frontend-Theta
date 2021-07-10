import * as React from "react";
import { useEffect, useRef } from "react";
import bb, { line, zoom } from "billboard.js";
import { Row } from "antd";
const LineChart = ({ dataSource }) => {
  const lineChart = useRef(null);

  useEffect(() => {
    bb.generate({
      data: {
        x: "x",
       columns: dataSource,
      //   columns: [
      // ["x", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06", "2013-01-07", "2013-01-08", "2013-01-09", "2013-01-10", "2013-01-11", "2013-01-12"],
      // ["sample", 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250]
      //   ],
        type: line(), // for ESM specify as: line()
      },
      zoom: {
        enabled: zoom(), // for ESM specify as: zoom()
        type: "drag",
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            count: 4,
            format: "%Y-%m-%d"
          }
        }
      },
      bindto: lineChart.current,
    });
  }, [dataSource]);

  return (
    <>
      <Row justify="center" className='mt-2'>
        <h4>My Income</h4>
      </Row>
      <div  ref={lineChart}>
        chart
      </div>
    
    </>
  );
};

export default LineChart;
