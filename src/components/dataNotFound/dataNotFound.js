import * as React from "react";
import { Row } from "antd";
import ServiceNotFound from "components/serviceNotFound/serviceNotFound";
const DataNotFound = () => {
  return (
    <Row justify="center">
      <ServiceNotFound />
    </Row>
  );
};

export default DataNotFound;
