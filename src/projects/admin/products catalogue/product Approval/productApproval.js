import { Card, Row, Skeleton, Typography } from "antd";
import DataNotFound from "components/dataNotFound/dataNotFound";
import Image from "components/image/image";
import { AppoveProductModal } from "components/manageProductmodal/approveProduct";
import { ReassignProduct } from "components/manageProductmodal/reassignProduct";
import { RejectProductModal } from "components/manageProductmodal/rejectProduct";
import React from "react";
import "./productApproval.css";


const ProductApproval = ({ isLoading, products, loadPenindgProducts }) => {
  const { Title } = Typography;


  const updateProductList = () => {
    loadPenindgProducts();
  };

  return (
    <>
      <div>
        {/* add product modal */}

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
                        <span>
                          Price : ₹{product.max_price ? product.max_price : 0}
                        </span>
                      </div>
                      <div className="acess-buttons">
                        <AppoveProductModal
                          callback={updateProductList}
                          productId={product.id}
                        />
                        <RejectProductModal
                          callback={updateProductList}
                          productId={product.id}
                        />
                        <ReassignProduct
                          callback={updateProductList}
                          productId={product.id}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))
          ) : (
            <Row className="m-2 mt-4" justify="center">
              <DataNotFound text="No Data Found! " />
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

export default ProductApproval;
