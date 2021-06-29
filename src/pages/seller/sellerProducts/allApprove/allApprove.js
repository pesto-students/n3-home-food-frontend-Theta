import { Card, Row, Skeleton, Typography } from "antd";
import "antd/dist/antd.css";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../../../../components/shared/image/image";
import item from "../../../../images/south-indian.jpg";


const AllApprove = ({products,isLoading}) => {
  const {Title} = Typography
  const fetchMoreData = () => {
    // axios
    // .get("`${baseUrl}/products/get/approved")
    // .then((result) => {
    //   setproducts(products.concat(result.data));
    // })
    // .catch((err) => console.error(err))
    // .finally(() => setIsLoading(false));
  };



  return (
    <>
      <div>
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
                      <Title level={4}>{product.name}</Title>
                      <span>Max Amount: ₹ {product.max_price}</span>
                    </div>
                  </div>
                </div>
       
              </Card>
            ))}
          </InfiniteScroll>
        </Skeleton>
      </div>
    </>
  );
};

export default AllApprove;
