import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Modal, notification, Select, Upload } from "antd";
import "antd/dist/antd.css";
import axios from 'axios';
import React, { useState } from "react";
const { Option } = Select;



const openNotificationWithIcon = (type,message) => {
  notification[type]({
    message: message
  });
};

// image
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);

     
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const CollectionCreateForm = ({ visible, onCreate, onCancel,fromFor }) => {
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
          name="productName"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Please input the Product Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="productCategory"
          label="Product Category"
          rules={[
            {
              required: true,
              message: "Please input the Product Category!",
            },
          ]}
        >
             <Select placeholder="Please select a Category">
          <Option value="60c906ce35453e14cd3f4ee3">Breakfast</Option>
          <Option value="Lunch">Lunch</Option>
          <Option value="Snacks">Snacks</Option>
          <Option value="Dinner">Dinner</Option>
        </Select>
        </Form.Item>

        <Form.Item name="description" label="Description"
          rules={[
            {
              required: true,
              message: "Please input the Product Description!",
            },
          ]}>
          <Input type="textarea" />
        </Form.Item>

        <Form.Item
          name="productImage"
          label="Product Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra=""
        >
    
          <Upload {...props} name="logo" maxCount={1} >
            <Button  icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
       
       {fromFor === 'admin' ?
        <Form.Item
          name="maxPrice"
          label="Max Price"
          rules={[
            {
              required: true,
              message: "Please input the Max Price!",
            },
          ]}
        >
          <InputNumber min={1}  />
        </Form.Item>
        :
        <Form.Item
        name="Price"
        label="Price"
        rules={[
          {
            required: true,
            message: "Please Enter Price!",
          },
        ]}
      >
        <InputNumber min={1}  />
      </Form.Item>

}

      
      </Form>
    </Modal>
  );
};

export const AddProductModal = (props) => {
  const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
    
    const data = new FormData()
    data.append('image',values.productImage[0].originFileObj)
    data.append('name',values.productName)
    data.append('description',values.description)
    data.append('max_price',values.maxPrice)
    data.append('category',values.productCategory)

    console.log('file,',data)
    axios
    .post("http://localhost:8080/api/v1/products",

    data)
    .then((result) => {
      if(result.status === 200){
        openNotificationWithIcon('success','Product Added')
      }
      else{
        openNotificationWithIcon('error','Could Not Add Product')

      }
      
    })
    .catch((err) => {
      console.error(err)
      openNotificationWithIcon('error','Could Not Add Product')
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
          Add Product
        </Button>
      </div>

      <CollectionCreateForm
        fromFor='admin'
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};



export const AddProductSellerModal = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    
    const data = new FormData()
    data.append('image',values.productImage[0].originFileObj)
    data.append('name',values.productName)
    data.append('description',values.description)
    data.append('price',values.maxPrice)
    data.append('category',values.productCategory)

    axios
    .post("http://localhost:8080/api/v1/products",

    data)
    .then((result) => {
      if(result.status === 200){
        openNotificationWithIcon('success','Product Reuested')
      }
      else{
        openNotificationWithIcon('error','Could Not Add Product')

      }
      
    })
    .catch((err) => {
      console.error(err)
      openNotificationWithIcon('error','Could Not Add Product')
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
          Reuest Product
        </Button>
      </div>

      <CollectionCreateForm
        fromFor='seller'
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
