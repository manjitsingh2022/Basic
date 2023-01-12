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
            <Link to="/login">
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
      key: "admin",
      label: (
        <Link to="/advertisementDetail" >
          <span>Ads Manager</span>
        </Link>
      ),
    },
  ];
  return (
    <>
      <Space direction="horizontal">
        <Link to="/advertisement">
          <Button type="primary">
            <span> Advertisement</span>
          </Button>
        </Link>
        {/* <Search
          style={{ verticalAlign: "middle" }}
          placeholder="input search text"
          enterButton="Search"
          size="middle"
          suffix={suffix}
          onSearch={onSearch}
        /> */}
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Button type="primary">
            <span> Account</span>
          </Button>
        </Dropdown>
      </Space>
    </>
  );
};

export default ProfileMenu;
