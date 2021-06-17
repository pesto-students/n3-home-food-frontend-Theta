import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Input, Radio } from 'antd';

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Add Product"
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
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="Product Name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: 'Please input the Product Name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
  
        <Form.Item
          name="Product Image"
          label="Product Image"
          rules={[
            {
              required: true,
              message: 'Please input the Product Name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Max Price"
          label="Max Price"
          rules={[
            {
              required: true,
              message: 'Please input the Max Price!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Product Name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: 'Please input the Product Name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        
      </Form>
    </Modal>
  );
};

export const AddProductModal = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div>
       <div style={{display: 'flex',flexFlow: 'row-reverse',  margin: '10px'}}>
       <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Product
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
