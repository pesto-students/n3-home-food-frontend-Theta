import { Button, Form, Modal, notification, Select } from "antd";

import React, { useEffect, useState } from "react";
import { reassignProduct, getApproveProduct } from "../utils/api";

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
    const getProducts = async () => {
      const response = await getApproveProduct().catch(() => {
        setIsLoading(false);
      });
      setproducts(response.data);
    };
    getProducts();
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
          .catch((info) => {});
      }}
    >
      {isLoading}
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
                <span>{product.name}</span>
                {/* <span className="cost">
                  <p className="max-amount">Max Amount</p> &nbsp; ₹
                  {product.max_price}
                </span> */}
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

  const onCreate = async (values) => {
    const response = await reassignProduct(props.productId, {
      existingProductId: values.existingProductId,
    }).catch(() => {
      openNotificationWithIcon("error", "Could Not Reassigned Product");
    });
    if (response.status === 200) {
      openNotificationWithIcon("success", "Product Reassigned");
      props.callback();
    } else {
      openNotificationWithIcon("error", "Could Not Reassign Product ");
    }

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
