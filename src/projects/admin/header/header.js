import { Menu, Dropdown, message } from "antd";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setAsAdminLoggedOut } from "store/actions";
export const AvatarMenu = ({image}) => {
  const Dispatch = useDispatch();

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
    if (key === "logout") {
      // your logout logic here

      // remove from redux store
      Dispatch(setAsAdminLoggedOut());
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const menu = (
    <Menu onClick={onClick}>
      {/* <Menu.Item key="1">My Profile</Menu.Item> */}
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Avatar
          className="ant-dropdown-link"
          size="large"
          src={image}
        />
      </Dropdown>
    </>
  );
};
