import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const SildeBar = () => {
  return (
    <>
      <Layout className="siderStyle">
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: (
                  <Link to="/">
                    <span>Category</span>
                  </Link>
                ),
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: (
                  <Link to="/advertisementDetail">
                    <span>Ads Manager</span>
                  </Link>
                ),
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "nav 3",
              },
            ]}
          />
        </Sider>
      </Layout>
    </>
  );
};

export default SildeBar;
