import { Card, Row, Skeleton } from "antd";

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { RejectSellerModal } from "components/manageSellerModal/rejectSeller";
import "./sellerApproval.css";
import DataNotFound from "components/dataNotFound/dataNotFound";
import SpinnerLoader from "components/spinnerLoader/spinnerLoader";
import Image from "components/image/image";

const SellerApproval = ({ isLoading, sellers, callback }) => {
  const [hasMore, setHasMore] = useState(false);

  const fetchMoreData = () => {
    setHasMore(true);
  };

  const updateSellerList = () => {
    callback();
  };

  return (
    <>
      <div>
        {/* add product modal */}

        <Skeleton loading={isLoading} active>
          {sellers.length > 0 ? (
            <InfiniteScroll
              dataLength={sellers.length}
              next={fetchMoreData}
              hasMore={hasMore}
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
                        <Image
                          url={seller.image}
                          height={150}
                          width={100}
                          type="seller"
                        />
                        <span className="seller-name">{seller.name}</span>
                      </div>

                      <div className="mr-3">
                        {seller.status === "Approved" ? (
                          <span>Deactivate</span>
                        ) : (
                          <span>Activate</span>
                        )}

                        <div className="switch-cointaner">
                          <RejectSellerModal
                            callback={updateSellerList}
                            buttonType="switch"
                            switchChecked={
                              seller.status === "Approved" ? true : false
                            }
                            sellerId={seller.id}
                          />
                        </div>

                        <span
                          className={
                            seller.status === "Approved"
                              ? "status-text-green"
                              : "status-text-red"
                          }
                        >
                          {" "}
                          {seller.status}
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
        </Skeleton>
      </div>
    </>
  );
};

export default SellerApproval;
