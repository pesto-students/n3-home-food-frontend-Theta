import { Button, Card, notification, Row, Skeleton } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../../../../components/shared/image/image";
import { AddProductSellerModal } from '../../../../components/shared/manageProductmodal/addProduct';
import item from "../../../../images/south-indian.jpg";
import { baseUrlSeller } from "../../../../utils/constant";


const AllProducts = ({products,isLoading,callback}) => {


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
      axios
    .put(`${baseUrlSeller}/60c9f9b635f0f7183a9a7497`,{ "products":[product._id]})
    .then((result) => {
      notification.success({
        message: `Notification`,
        description:"This product is added to your my product",
        placement:'topRight'
      });
    
    })
    .catch((err) => {
      notification.error({
        message: `Notification`,
        description:"Something went wrong",
        placement:'topRight'
      });
    })
    // .finally(() => setIsLoading(false));
  };



  return (
    <>
      <div>
        <AddProductSellerModal />


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
                      <Image url={item} height="100" width='150'></Image>
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
        </Skeleton>
      </div>
    </>
  );
};

export default AllProducts;
