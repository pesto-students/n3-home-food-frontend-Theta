import { Card, Row, Skeleton, Button,notification } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppoveProductModal } from "../../../../components/shared/manageProductmodal/approveProduct";
import SpinnerLoader from "../../../../components/shared/spinnerLoader/spinnerLoader";
import item from "../../../../images/south-indian.jpg";
import "./pendingSeller.css";
import { RejectSellerModal } from "../../../../components/manageSellerModal/rejectSeller";
import { baseUrlAdmin } from "../../../../utils/constant";

const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

const PendingSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrlAdmin}/sellers/get/pending`)
      .then((result) => {
        setSellers(result.data);
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

  const approveSellerbyId = (id) => {
    axios
    .put(`${baseUrlAdmin}/sellers/approve/${id}`)
    .then((result) => {
      if (result.status === 200) {
        openNotificationWithIcon("success", "Seller Approved");
      } else {
        openNotificationWithIcon("error", "Could Not Approve Seller");
      }
    })
    .catch((err) => {
      console.error(err);
      openNotificationWithIcon("error", "Could Not Approve Seller");
    })
    .finally(() => {});
  };

  const updateSellerList = () =>{
    setIsLoading(true)
    axios
    .get(`${baseUrlAdmin}/sellers/get/pending`)
    .then((result) => {
      setSellers(result.data);
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
            dataLength={sellers.length}
            next={fetchMoreData}
            hasMore={true}
            loader={
              <Row className="m-2 mt-4" justify="center">
                {" "}
                <SpinnerLoader />
              </Row>
            }
          >
            {sellers.map((seller, i) => (
              <Card key={i} hoverable>
                <div className="container">
                  <div className="row">
                    <div className="product-cointaner">
                      <img src={item} className="product-image" alt="" />
                    </div>
                    <div className="product-details ">
                      <span className="seller-name">{seller.name}</span>
                    </div>
                    <div className="acess-buttons">
                      <Button style={{margin:'10px'}} type="primary" onClick={()=>{
                        approveSellerbyId(seller.id)
                        updateSellerList()
                      }}>
                        Approve
                      </Button>
                      <RejectSellerModal callback = {updateSellerList} sellerId={seller.id} />
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

export default PendingSellers;
