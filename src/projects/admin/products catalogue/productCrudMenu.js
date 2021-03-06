import { Menu, Dropdown, notification } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { EditProductModal } from "components/manageProductmodal/editProduct";
import { adminDeleteProduct } from "../utils/api";
import { catchError } from "utils/helpers";

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

export const ProductCrudMenu = ({ callback, product }) => {
  const deleteProduct = async () => {
    try {
      const response = await adminDeleteProduct(product.id);
      if (response.status === 200) {
        openNotificationWithIcon("success", "Product Deleted");
        callback();
      } else {
        openNotificationWithIcon("warning", "could not Product Deleted");
      }
    } catch (error) {
      catchError(error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="deleteProduct" onClick={deleteProduct}>
        Delete
      </Menu.Item>
      <Menu.Item key="updateProduct">
        <EditProductModal product={product} callback={callback} />
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
