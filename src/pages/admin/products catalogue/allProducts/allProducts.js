import React, { useState, useEffect } from 'react';
import "./allProducts.css";
import "antd/dist/antd.css";
import { Card } from "antd";
import item from "../../../../images/south-indian.jpg";
import axios from 'axios'
const { Meta } = Card;

const AllProducts = () => {

    const [products, setproducts] = useState([]);

    useEffect(() => {
    axios
      .get("")
      .then((response) => {

      });
  }, []);

  return (
    <>
      <div>
        <Card hoverable>
          <div className="container">
            <div className="row">
              <div className="colproduct-cointaner">
                <img src={item} className="product-image" />
              </div>
              <div className="col-6 product-details">
                <h2>hiii</h2>
                <h3>hiii</h3>
              </div>
              <div className="col">One of three columns</div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AllProducts;
