import { Card, Row, Skeleton } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SpinnerLoader from "../../../../components/shared/spinnerLoader/spinnerLoader";
import item from "../../../../images/seller.png";
import "./sellerApproval.css";
import { Switch } from "antd";
import { RejectSellerModal } from "../../../../components/manageSellerModal/rejectSeller";

const SellerApproval = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/sellers")
      .then((result) => {
        setSellers(result.data);
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

  const onChange = (checked) => {
    if (false) {
    }
    console.log(`switch to ${checked}`);
  };

  return (
    <>
      <div>
        {/* add product modal */}

        <Skeleton loading={isLoading} active>
          <InfiniteScroll
            dataLength={sellers.length}
            next={fetchMoreData}
            hasMore={true}
            loader={
              <Row className="m-2 mt-4" justify="center">
                <SpinnerLoader />
              </Row>
            }
          >
            {sellers.map((seller, i) => (
              <Card key={i} hoverable>
                <div>
                  <div className="row seller-row">
                    <div className="product-cointaner">
                      <img src={item} className="product-image" alt="" />

                      <span className="seller-name">{seller.name}</span>
                    </div>

                    <div className="mr-3">
                      <div className='switch-cointaner'>
                        <RejectSellerModal buttonType='switch' switchChecked={seller.status === 'Approved' ? true:false} sellerId = {seller.id}/>
                      </div>

                      <span className={seller.status === 'Approved' ? 'status-text-green':'status-text-red'} > {seller.status}
                      </span>
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

export default SellerApproval;
