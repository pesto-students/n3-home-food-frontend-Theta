import { Button, Card, notification, Row, Skeleton } from "antd";
import "antd/dist/antd.css";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { RejectSellerModal } from "components/manageSellerModal/rejectSeller";
import item from "images/south-indian.jpg";
import "./pendingSeller.css";
import { approveSellerById } from "projects/admin/utils/api";
import DataNotFound from "components/dataNotFound/dataNotFound";

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

const PendingSellers = ({ callback, sellers, isLoading }) => {
  const fetchMoreData = () => {};

  const approveSeller = async (id) => {
    try {
      const response = await approveSellerById(id);
      if (response.status === 200) {
        openNotificationWithIcon("success", "Seller Approved");
      } else {
        openNotificationWithIcon("error", "Could Not Approve Seller");
      }
    } catch (error) {}
  };

  const updateSellerList = () => {
    callback();
  };

  return (
    <>
      <div>
        <Skeleton loading={isLoading} active>
          {sellers.length > 0 ? (
            <InfiniteScroll
              dataLength={sellers.length}
              next={fetchMoreData}
              hasMore={true}
              loader={
                <Row className="m-2 mt-4" justify="center">
                  <p>Loading ...</p>
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
                        <Button
                          style={{ margin: "10px" }}
                          type="primary"
                          onClick={() => {
                            approveSeller(seller.id);
                            updateSellerList();
                          }}
                        >
                          Approve
                        </Button>
                        <RejectSellerModal
                          callback={updateSellerList}
                          sellerId={seller.id}
                        />
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
        </Skeleton>
      </div>
    </>
  );
};

export default PendingSellers;
