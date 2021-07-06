import { React } from "react";
import { baseUrl } from '../../utils/constant'
import axios from "axios";
import {Button,notification } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { sessionId } from "../../utils/helpers";
import { useTranslation } from "react-i18next";

function loadScript(src){
    return new Promise(resolve => {
        const script = document.createElement("script");
        script.src = src
        document.body.appendChild(script);
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })

};

const Payment = (props) => {
  const { t } = useTranslation();


  let userId = sessionId();

    async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if(!res){
        alert('Razorpay SDK failed to connect')
        return
    } 

    let data 
    axios
    .post(`${baseUrl}/razorpay`)
    .then((result) => {
        data = result.data
        console.log(data)
        var options = {
            key: 'rzp_test_d0CoHtYXgWcl5z', // Enter the Key ID generated from the Dashboard
            amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: data.currency,
            name: "Home Food",
            description: "Get Delicious Home food",
            image: "https://example.com/your_logo",
            order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
              axios
              .post(`${baseUrl}/razorpay/verification`,{response})
              .then((result) => {
                    
                // call checkout api and place an order
       
                  axios
                  .post(`${baseUrl}/orders`,{   id: userId,
                    DeliveryType: props.deliveryType,
                    sellerId:props.title.sellerIdInCart})
                  .then((result) => {
                    
                      // empty the cart
                      axios
                      .put(`${baseUrl}/users/remove-cart/${userId} `)
                      .then((result) => {
                        
                        props.history.push('/customer')
                        notification.success({
                          message: `Notification`,
                          description: "This order has been successfully placed",
                          placement: "topRight",
                        });
                          
                          
        
                      } )

    
                  } 
                  ).catch((err) => {
                    console.error(err);
                  });
              
              }
              )
              // alert(response.razorpay_payment_id);
              // alert(response.razorpay_order_id);
              // alert(response.razorpay_signature)
          },
      
          };
          const paymentObject = new window.Razorpay(options);
          paymentObject.open()
    })
    .catch((err) => console.error(err));
    
};
  return (
    <>
      <Button color='primary' onClick={displayRazorpay}>{t('Payment.Pay now')}</Button>
    </>
  );
};

const mapStateToProps = state => {
  return {
    title: state
  };
};
export default withRouter(connect(mapStateToProps)(Payment));
