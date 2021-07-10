import React, { useState } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import { Switch } from "antd";
import { rejectSeller, approveSeller } from "../utils/api";

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Reject Seller"
      okText="Reject"
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
            {
              min: 5,
              message: "Rejection Reason must be minimum 5 characters.",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const RejectSellerModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(props.switchChecked);
  const onCreate = async (values) => {
    const response = rejectSeller(props.sellerId).catch((err) => {
      console.error(err);
      openNotificationWithIcon("error", "Could Not Reject Seller");
    });
    if (response.status === 200) {
      openNotificationWithIcon("success", "Seller Rejected");
      props.callback();
    } else {
      openNotificationWithIcon("error", "Could Not Reject Seller ");
    }
    setSwitchChecked(false);
    setVisible(false);
  };

  const onChange = async (checked) => {
    if (!checked) {
      // show the modal
      setVisible(true);
    } else {
      const response = await approveSeller(props.sellerId).catch((err) => {
        console.error(err);
        openNotificationWithIcon("error", "Could Not Approve Seller");
      });
      if (response.status === 200) {
        setSwitchChecked(true);
        openNotificationWithIcon("success", "Seller Approved");
        props.callback();
      } else {
        openNotificationWithIcon("error", "Could Not Approve Seller");
      }
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexFlow: "row-reverse", margin: "10px" }}>
        {props.buttonType === "switch" ? (
          <Switch checked={switchChecked} size="small" onChange={onChange} />
        ) : (
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            Reject
          </Button>
        )}
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
