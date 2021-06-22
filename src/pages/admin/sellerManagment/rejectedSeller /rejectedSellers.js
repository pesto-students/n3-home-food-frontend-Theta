import { Card, Row, Skeleton } from "antd";
import "antd/dist/antd.css";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import item from "../../../../images/seller.png";
import "../Seller Approval/sellerApproval.css";
const RejectedSellers = ({isLoading,sellers}) => {

  
  const fetchMoreData = () => {
    // axios
    // .get("`${baseUrl}/products/get/approved")
    // .then((result) => {
    //   setproducts(products.concat(result.data));
    // })
    // .catch((err) => console.error(err))
    // .finally(() => setIsLoading(false));
  };

  // const onChange = (checked) => {
  //   if (false) {
  //   }
  //   console.log(`switch to ${checked}`);
  // };

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
                      <div className="seller-details">
                      <span className="seller-name">{seller.name}</span>
                      <span className="rejection-reason"><span style={{color:'red'}} >Reason </span> - {seller.rejection_reason}</span>
                      </div>
                      
                    </div>

                    <div className="mr-3">
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

export default RejectedSellers;
