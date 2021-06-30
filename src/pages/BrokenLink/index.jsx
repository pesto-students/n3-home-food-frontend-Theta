import React from "react";
import { Link } from "react-router-dom";
import brokenLinkImage from '../../images/broken-link.jpeg'
import "./broken-link.css";

const BrokenLink = () => {
  return (
    <>
      <div className="broken-link">
        You have followed a broken link or the information is not currently
        avaialble!
        <img src={brokenLinkImage} alt=":)" />
        <div>
          Click here to go to homepage{" "}
          <Link to={{ pathname: "/" }}>Home</Link>
        </div>
      </div>
    </>
  );
};

export default BrokenLink;
