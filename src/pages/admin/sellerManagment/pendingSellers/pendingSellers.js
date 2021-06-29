import { Button, Card, notification, Row, Skeleton } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { RejectSellerModal } from "../../../../components/manageSellerModal/rejectSeller";
import item from "../../../../images/south-indian.jpg";
import { baseUrl } from "../../../../utils/constant";
import "./pendingSeller.css";

const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

const PendingSellers = ({callback,sellers,isLoading}) => {


  const fetchMoreData = () => {
    // axios
    // .get("`${baseUrl}/products/get/approved")
    // .then((result) => {
    //   setproducts(products.concat(result.data));
    // })
    // .catch((err) => console.error(err))
    // .finally(() => setIsLoading(false));
  };

  const approveSellerbyId = (id) => {
    axios
    .put(`${baseUrl}/sellers/approve/${id}`)
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
    callback()
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
            loader={<Row className='m-2 mt-4' justify="center"><p>Loading ...</p></Row > }

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
