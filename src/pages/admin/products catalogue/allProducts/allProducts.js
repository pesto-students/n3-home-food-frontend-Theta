import { Card, Row, Skeleton } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AddProductModal } from '../../../../components/shared/manageProductmodal/addProduct';
import { baseUrlAdmin } from "../../../../utils/constant";
import "./allProducts.css";


const AllProducts = () => {
  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrlAdmin}/products/get/approved`)
      .then((result) => {
        setproducts(result.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);



   const fetchMoreData = () => {
  //   setIsLoading(false)
  //   axios
  //   .get("`${baseUrlAdmin}/products/get/approved")
  //   .then((result) => {
  //     setproducts(result.data);
  //   })
  //   .catch((err) => console.error(err))
  //   .finally(() => setIsLoading(false));
   };

  const updateProductList = () =>{
    setIsLoading(false)
    axios
    .get(`${baseUrlAdmin}/products/get/approved`)
    .then((result) => {
      setproducts(result.data);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsLoading(false));

  }
  // const addDefaultSrc = (ev) =>{
  //   ev.target.src = 'some default image url'
  // }

  return (
    <>
      <div>
        {/* add product modal */}
        <AddProductModal callback ={updateProductList} />


        <Skeleton loading={isLoading} active>
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<Row className='m-2 mt-4' justify="center"><p>Loading ...</p></Row > }
          >
            {products.map((product, i) => (
              <Card key={i} hoverable>
                <div className="container">
                  <div className="row">
                    <div className="product-cointaner">
                      <img src={product.image} className="product-image" alt="not found"/>


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
