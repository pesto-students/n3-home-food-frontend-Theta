import React, { useState, useEffect } from "react";
import "./allProducts.css";
import "antd/dist/antd.css";
import { Card } from "antd";
import item from "../../../../images/south-indian.jpg";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";
import { Pagination } from "antd";
import { Button } from "antd";
import { AddProductModal } from '../../../../components/shared/addProductmodal/addProduct';
const { Meta } = Card;

const AllProducts = () => {
  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/products/get/approved")
      .then((result) => {
        setproducts(result.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const fetchMoreData = () => {
    // axios
    // .get("http://localhost:8080/api/v1/products/get/approved")
    // .then((result) => {
    //   setproducts(products.concat(result.data));
    // })
    // .catch((err) => console.error(err))
    // .finally(() => setIsLoading(false));
  };



  return (
    <>
      <div>
        {/* add product modal */}
        <AddProductModal />


        <Skeleton loading={isLoading} active>
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<div className="loader">loading..</div>}
          >
            {products.map((product, i) => (
              <Card hoverable>
                <div className="container">
                  <div className="row">
                    <div className="product-cointaner">
                      <img src={item} className="product-image" />
                    </div>
                    <div className="product-details ">
                      <span className="seller-name">{product.name}</span>
                      <span className="cost">
                        <p className="max-amount">Max Amount</p> &nbsp; ₹{" "}
                        {product.max_price}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </InfiniteScroll>

          {/* <div className="pagination-container">
            <Pagination defaultCurrent={6} total={100} />
          </div> */}
        </Skeleton>
      </div>
    </>
  );
};

export default AllProducts;
