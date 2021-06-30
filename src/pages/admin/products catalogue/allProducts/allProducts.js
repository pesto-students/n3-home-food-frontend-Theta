import { Card, Row, Skeleton, Typography } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../../../../components/shared/image/image";
import { AddProductModal } from "../../../../components/shared/manageProductmodal/addProduct";
import { ProductCrudMenu } from "../productCrudMenu";
import "./allProducts.css";
import SpinnerLoader from "../../../../components/shared/spinnerLoader/spinnerLoader";
import DataNotFound from "../../../../components/shared/dataNotFound/dataNotFound";
const AllProducts = ({ isLoading, products, loadAllProducts }) => {
  const { Title } = Typography;

  const [hasMore, setHasMore] = useState(false);

  const fetchMoreData = () => {
    setHasMore(true);
  };

  // const updateProductList = () => {
  //   loadAllProducts();
  // };

  return (
    <>
      <div>
        {/* add product modal */}
        <AddProductModal callback={loadAllProducts} />

        <Skeleton loading={isLoading} active>
          {products.length > 0 ? (
            <InfiniteScroll
              dataLength={products.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <Row className="m-2 mt-4" justify="center">
                  <SpinnerLoader />
                </Row>
              }
            >
              {products.map((product, i) => (
                <Card key={i} hoverable>
                  <div className="container">
                    <div className="row">
                      <div className="product-cointaner">
                        <Image
                          url={product.image}
                          height="100"
                          width="150"
                        ></Image>
                      </div>
                      <div className="product-details ">
                        <Title level={4}>{product.name}</Title>
                        <span>Max Amount : ₹ {product.max_price}</span>
                      </div>
                      <div className="product-delete">
                        <span className="seller-name">
                          <ProductCrudMenu
                            product={product}
                            callback={loadAllProducts}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </InfiniteScroll>
          ) : (
            <Row className="m-2 mt-4" justify="center">
              <DataNotFound text="No Data Found!" />
            </Row>
          )}

          {/* <div className="pagination-container">
            <Pagination defaultCurrent={6} total={100} />
          </div> */}
        </Skeleton>
      </div>
    </>
  );
};

export default AllProducts;
