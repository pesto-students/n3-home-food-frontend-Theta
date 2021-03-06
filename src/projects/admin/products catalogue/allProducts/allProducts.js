import { Card, Row, Skeleton, Typography } from "antd";
import DataNotFound from "components/dataNotFound/dataNotFound";
import Image from "components/image/image";
import { AddProductModal } from "components/manageProductmodal/addProduct";
import React from "react";
import { ProductCrudMenu } from "../productCrudMenu";
import "./allProducts.css";

const AllProducts = ({
  isLoading,
  products,
  loadAllProducts,
  fetchMoreAllProducts,
}) => {
  const { Title } = Typography;

  return (
    <>
      <div>
        {/* add product modal */}
        <AddProductModal callback={loadAllProducts} />

        <Skeleton loading={isLoading} active>
          {products.length > 0 ? (
            products.map((product, i) => (
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
            ))
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
