import { Menu, Dropdown, notification } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import axios from "../../../utils/axios";
import { baseUrl } from "../../../utils/constant";
import { EditProductModal } from "../../../components/shared/manageProductmodal/editProduct";

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

export const ProductCrudMenu = (props) => {
  const deleteProduct = () => {
    axios
      .delete(`${baseUrl}/products/${props.product.id}`)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          openNotificationWithIcon("success", "Product Deleted");
          props.callback();
        } else {
          openNotificationWithIcon("warning", "could not Product Deleted");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {});
  };

  const menu = (
    <Menu>
      <Menu.Item key="deleteProduct" onClick={deleteProduct}>
        Delete
      </Menu.Item>
      <Menu.Item key="updateProduct">
        <EditProductModal product={props.product} callback={props.callback}/>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <MoreOutlined />
      </Dropdown>
    </>
  );
};
