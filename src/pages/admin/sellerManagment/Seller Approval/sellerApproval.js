import { Card, Row, Skeleton } from "antd";
import "antd/dist/antd.css";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { RejectSellerModal } from "../../../../components/manageSellerModal/rejectSeller";
import item from "../../../../images/seller.png";
import "./sellerApproval.css";
const SellerApproval = ({isLoading,sellers,callback}) => {


  const fetchMoreData = () => {
  };

  const updateSellerList = () => {
   callback()
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
            loader={<Row className='m-2 mt-4' justify="center"><p>Loading ...</p></Row > }

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
                        <RejectSellerModal callback = {updateSellerList} buttonType='switch' switchChecked={seller.status === 'Approved' ? true:false} sellerId = {seller.id}/>
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
