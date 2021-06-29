import { Card, Row, Skeleton,Typography } from "antd";
import "antd/dist/antd.css";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../../../../components/shared/image/image";
import { AddProductModal } from '../../../../components/shared/manageProductmodal/addProduct';
import { ProductCrudMenu } from "../productCrudMenu";
import "./allProducts.css";


const AllProducts = ({isLoading,products,loadApproveItem}) => {

  const {Title} = Typography

   const fetchMoreData = () => {
   };

  const updateProductList = () =>{
     loadApproveItem()
  }



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
                      <Image url={product.image} height="100" width='150'></Image>
                    </div>
                    <div className="product-details ">
                     <Title level={4}>{product.name}</Title>
                      <span>
                       Max Amount : ₹ {product.max_price}
                      </span>
                    </div>
                    <div className="product-delete">
                      <span className="seller-name">
                        <ProductCrudMenu product={product} callback ={updateProductList} />
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
