import { Card, Row, Skeleton } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppoveProductModal } from '../../../../components/shared/manageProductmodal/approveProduct';
import { ReassignProduct } from "../../../../components/shared/manageProductmodal/reassignProduct";
import { RejectProductModal } from "../../../../components/shared/manageProductmodal/rejectProduct";
import { baseUrlAdmin } from "../../../../utils/constant";
import "./productApproval.css";
import Image from "../../../../components/shared/image/image";

const ProductApproval = () => {
  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrlAdmin}/products/get/pending`)
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

  const updateProductList = () =>{
    axios
    .get(`${baseUrlAdmin}/products/get/pending`)
    .then((result) => {
      setproducts(result.data);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsLoading(false));

  }


  return (
    <>
      <div>
        {/* add product modal */}
        


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
                      <span className="seller-name">{product.name}</span>
                    </div>
                    <div className="acess-buttons">
                      <AppoveProductModal callback ={updateProductList} productId={product.id} />
                      <RejectProductModal callback ={updateProductList} productId={product.id}/>
                      <ReassignProduct callback ={updateProductList} productId = {product.id} />
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

export default ProductApproval;
