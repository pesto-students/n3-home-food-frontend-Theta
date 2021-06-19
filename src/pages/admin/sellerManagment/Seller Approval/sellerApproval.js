import { Card, Row, Skeleton } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { RejectSellerModal } from "../../../../components/manageSellerModal/rejectSeller";
import item from "../../../../images/seller.png";
import { baseUrlAdmin } from "../../../../utils/constant";
import "./sellerApproval.css";
const SellerApproval = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrlAdmin}/sellers`)
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

  // const onChange = (checked) => {
  //   if (false) {
  //   }
  //   console.log(`switch to ${checked}`);
  // };

  const updateSellerList = () =>{
    setIsLoading(true)
    axios
      .get(`${baseUrlAdmin}/sellers`)
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
