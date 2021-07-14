import * as React from "react";
import seller from 'images/seller.png'
const Image = ({ url, height, width, radius, type }) => {
  const onError = (e) => {
    //e.target.src = logo

    if(type === 'seller'){
      e.target.src = seller
      return
    }

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
