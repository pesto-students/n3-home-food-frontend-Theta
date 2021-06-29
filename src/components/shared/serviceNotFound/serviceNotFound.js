import { Typography } from "antd";
import {React} from "react";


const {Title} = Typography
const serviceNotFound = ({url,height,width}) => {
  return (        
     <Title level={3}>Service not found!</Title>

  );
}

export default serviceNotFound;
 