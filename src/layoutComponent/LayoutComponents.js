import { Avatar, Col, Layout, Menu, Row } from "antd";
// import Password from "antd/lib/input/Password";
import { Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ProfileMenu from "./profileMenu/index.js";
// import { SideMenu } from "../routingComponent/SideMenu";
import { PageWrap } from "../shared/commonStyle";
import SildeBar from "../components/Admin/component/sildeBar.js";
// import lifelogo from "../assets/lifelogo.png";
const { Content, Footer } = Layout;
const LayoutComponents = () => {
  const [value, setValue] = useState([]);
  const navs = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "About",
      path: "/about",
      key: "user",
    },
    {
      label: "Category",
      path: "/",
      key: "admin",
    },
  ];
  const user = localStorage.getItem("rolekey");
  useEffect(() => {
    if (user === "ROLE_ADMIN") {
      setValue(navs.filter((item) => item.key === "admin"));
    } else if (user === "ROLE_USER") {
      return setValue(navs.filter((item) => item.key === "user"));
    }
  }, []);

  return (
    <>
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            webkitUserModify: "read-write-plaintext-only",
          }}
        >
          <div className="logo" />
          <Row>
            <Col span={12}>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]}>
                <Link to="/">
                  <Avatar
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    size="large"
                  />
                </Link>
                {console.log(value, "valuevalue")}
                {value.map((nav) => (
                  <Menu.Item key={nav.path}>
                    <Link to={nav.path}>{nav.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Col>
            <Col span={12} style={{ textAlign: "end" }}>
              <ProfileMenu />
            </Col>
          </Row>
        </Header>

        <Content>
          <div
            style={{
              minHeight: "100vh",
              color: "#000",
              background: "#F5F5F5",
            }}
          >
            <PageWrap>
              <Row>
                <Col span={3}>
                  <SildeBar />
                </Col>
                <Col span={21}>
                  <Outlet />
                </Col>
              </Row>
            </PageWrap>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#3b3e43",
            color: "#fff",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};
export default LayoutComponents;
