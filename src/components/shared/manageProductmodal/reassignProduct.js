import { Button, Form, Modal, notification, Select } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrlAdmin } from "../../../utils/constant";

let { Option } = Select;
const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrlAdmin}/products/get/approved`)
      .then((result) => {
        setproducts(result.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Modal
      visible={visible}
      title="Reassign Product"
      okText="Reassign"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="existingProductId"
          label="Choose Product"
          rules={[
            {
              required: true,
              message: "Please select the Product!",
            },
          ]}
        >
          <Select placeholder="Please select a Product">
            {products.map((product, i) => (
              <Option value={product.id}>
                <span >{product.name}</span>
                <span className="cost">
                  <p className="max-amount">Max Amount</p> &nbsp; ₹
                  {product.max_price}
                </span>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const ReassignProduct = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);

    axios
      .put(
        `${baseUrlAdmin}/products/product-reassign/${props.productId}`,
        { existingProductId: values.existingProductId }
      )
      .then((result) => {
        if (result.status === 200) {
          openNotificationWithIcon("success", "Product Reassigned");
          props.callback()
        } else {
          openNotificationWithIcon("error", "Could Not Reassign Product ");
        }
      })
      .catch((err) => {
        console.error(err);
        openNotificationWithIcon("error", "Could Not Reassigned Product");
      })
      .finally(() => {});
    setVisible(false);
  };

  return (
    <div>
      <div style={{ display: "flex", flexFlow: "row-reverse", margin: "10px" }}>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          Reassign
        </Button>
      </div>

      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
