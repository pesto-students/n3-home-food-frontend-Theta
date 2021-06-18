import { Card, Row,Button, Skeleton } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AddProductSellerModal } from '../../../../components/shared/manageProductmodal/addProduct';
import SpinnerLoader from "../../../../components/shared/spinnerLoader/spinnerLoader";
import item from "../../../../images/south-indian.jpg";


const AllProducts = () => {
  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("`${baseUrlAdmin}/products/get/approved")
      .then((result) => {
        setproducts(result.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const fetchMoreData = () => {
    // axios
    // .get("`${baseUrlAdmin}/products/get/approved")
    // .then((result) => {
    //   setproducts(products.concat(result.data));
    // })
    // .catch((err) => console.error(err))
    // .finally(() => setIsLoading(false));
  };

  const addToMyProduct = (product) => {
     console.log(product)
  };



  return (
    <>
      <div>
        {/* add product modal */}
        <AddProductSellerModal />


        <Skeleton loading={isLoading} active>
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<Row className='m-2 mt-4' justify="center"> <SpinnerLoader /></Row > }
          >
            {products.map((product, i) => (
              <Card key={i} hoverable>
                <div className="container">
                  <div className="row">
                    <div className="product-cointaner">
                      <img src={item} className="product-image" alt =''/>
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
                <Row justify="end">
                     <Button type="primary" onClick={()=>addToMyProduct(product)}>Add</Button>
                </Row>
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
