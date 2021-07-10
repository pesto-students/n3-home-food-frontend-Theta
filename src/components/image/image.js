import * as React from "react";

const Image = ({ url, height, width, radius }) => {
  const onError = (e) => {
    //e.target.src = logo

    e.target.src =
      "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/ndbykjavkxko09lutd18";
  };

  return (
    <img
      height={height}
      style={{ backgroundPosition: "center", borderRadius: radius }}
      width={width}
      onError={onError}
      alt="not found"
      src={url}
    />
  );
};

export default Image;
