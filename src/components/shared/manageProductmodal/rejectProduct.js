import { Button, Form, Input, Modal, notification } from "antd";
import "antd/dist/antd.css";
import axios from 'axios';
import React, { useState } from "react";



const openNotificationWithIcon = (type,message) => {
    notification[type]({
      message: message
    });
  };
  
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Reject Product"
      okText="Add"
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
          name="rejectReason"
          label="Reject Reason"
          rules={[
            {
              required: true,
              message: "Please input the Rejection Reason!",
            },
          ]}
        >
          <Input />
        </Form.Item>

      
      </Form>
    </Modal>
  );
};

export const RejectProductModal = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);

    axios
    .put(`http://localhost:8080/api/v1/products/product-rejection/${props.productId}`,{'rejection_reason':values.rejectReason})
    .then((result) => {
      if(result.status === 200){
        openNotificationWithIcon('success','Product Rejected')
      }
      else{
        openNotificationWithIcon('error','Could Not Reject Product ')

      }
      
    })
    .catch((err) => {
      console.error(err)
      openNotificationWithIcon('error','Could Not Reject Product')
    })
    .finally(() => {

    });
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
          Reject
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
