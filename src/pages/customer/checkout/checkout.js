import {
  CreditCardOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Radio, Space, Steps } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import Cart from "../../../components/shared/cart/cart";
import CustomerNavbar from "../../../components/shared/customerNavbar/customerNavbar";
import axios from "../../../utils/axios";
import { baseUrl } from "../../../utils/constant";
import { sessionId } from "../../../utils/helpers";
import Payment from "../payment";
import "./checkout.css";

const { Step } = Steps;

export class Checkout extends React.Component {
  state = {
    current: 1,
    value: "Take-Away",
    alreadyInCart: { items: [] },
    isCartLoad: false,
  };

  componentDidMount = () => {
    this.getCart();
  };

  getCart = () => {
    axios
      .get(`${baseUrl}/cart/${sessionId()}`)
      .then((result) => {
        this.setState({ isCartLoad: true });
        this.setState({ alreadyInCart: result.data }, () => {
          console.log(this.state.alreadyInCart);
        });
      })
      .catch((err) => {
        this.setState({ isCartLoad: true });
        let cart = {
          items: [],
          subTotal: 0,
        };
        this.setState({ alreadyInCart: cart });

        console.error(err);
      });
  };

  onDeliveryChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  onChange = (current) => {
    console.log("onChange:", current);
    this.setState({ current });
  };

  render() {
    const { current } = this.state;
    const { value } = this.state;
    //  const { alreadyInCart } = this.state;
    const Content1 = (
      <Card hoverable>
        <div className="about-row">
          <span>Contact No - 7741084950</span>
          <span>Pincode - 560066</span>
        </div>
      </Card>
    );

    const deliverMethod = (
      <Card hoverable>
        <Radio.Group onChange={this.onDeliveryChange} value={value}>
          <Space direction="vertical">
            <Radio value={"Take-Away"}>Take Away</Radio>
            <Radio value={"Dine-In"}>Dine In</Radio>
          </Space>
        </Radio.Group>
      </Card>
    );

    const payment = (
      <Card hoverable>
        <Payment deliveryType={value} />
      </Card>
    );

    return (
      <>
        <CustomerNavbar />
        <div className="payment-cointaner">
          <Steps
            direction="vertical"
            onChange={this.onChange}
            current={current}
          >
            <Step
              title="personal details"
              icon={<UserOutlined />}
              description={Content1}
            />
            <Step
              title="Delivery"
              icon={<SolutionOutlined />}
              description={deliverMethod}
            />
            <Step
              title="Pay"
              icon={<CreditCardOutlined />}
              description={payment}
            />
          </Steps>
          <Card hoverable style={{ width: "40vw" }}>
            <Title level={3}>Cart</Title>
            <hr />
            {this.state.isCartLoad && (
              <Cart
                reloadCart={this.getCart}
                alreadyInCart={this.state.alreadyInCart}
              />
            )}
          </Card>
        </div>
      </>
    );
  }
}
