import { React } from "react";
import "./serviceNotFound.css";
import noServiceImage from "../../../images/no_service.jpg";

const serviceNotFound = () => {
  return <img src={noServiceImage} alt="not found" />;
};

export default serviceNotFound;
