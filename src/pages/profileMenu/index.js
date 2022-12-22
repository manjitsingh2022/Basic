import React, { useEffect, useState } from "react";
import { Button, Dropdown, message, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
const ProfileMenu = () => {
  const [toggle, setToggle] = useState("");
  useEffect(() => {
    // console.log(localStorage.getItem("token"), "local");
    if (localStorage.getItem("token")) {
      setToggle(true);
    }
  }, []);

  const navigate = useNavigate();
  // Handle logout event handle
  const logout = (e) => {
    e.preventDefault();
    console.log("Logout", e);
    // Clear data form storage
    localStorage.clear();
    sessionStorage.clear();
    message.success(`You have successfully logged out!`);
    navigate("/login");
    setToggle(false);
  };
  const items = [
    {
      key: "1",
      label: (
        <>
          {!toggle ? (
            <Link to="/login" >
              <span>LogIn</span>
            </Link>
          ) : (
            <Link to="/" onClick={logout}>
              <span>Logout</span>
            </Link>
          )}
        </>
      ),
    },

    {
      key: "2",
      label: (
        <Link to="/advertisement">
          <span>Post</span>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to="/advertisementDetail">
          <span>Ads Manager</span>
        </Link>
      ),
    },
  ];
  return (
    <>
      <Space direction="vertical">
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Button type="primary">
            <span style={{ fontSize: 12 }}> Hello, sign in</span>Account & Lists
          </Button>
        </Dropdown>
      </Space>
    </>
  );
};

export default ProfileMenu;
