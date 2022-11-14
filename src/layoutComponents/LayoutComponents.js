import { Button, Layout, Menu, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import React from "react";
import { Link } from "react-router-dom";
import RoutingComponents from "../routingComponent/Routingcomponents";
import {  PageWrap } from "../shared/commonStyle";
const { Content, Footer } = Layout;
const navs = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "LogIn",
    path: "/logIn",
  },
];
const LayoutComponents = () => (
  <>
    <Layout>
      {/* <SiderComponents/>  */}
        <Header
          style={{
            position: "sticky",
            zIndex: 1,
            width: "100%",
            padding: 0,
          }}
        >
          <div className="logo" />
          <Menu
          theme="dark"
            mode="horizontal"
            className="header-nav"
            defaultSelectedKeys={["/"]}
          >
            {navs.map(
              (nav) =>
                (
                  <Menu.Item key={nav.path}>
                    <Link to={nav.path}>{nav.label}</Link>
                  </Menu.Item>
                ) 
            )}
          </Menu>
        </Header>
      <Content className="site-layout">
        <div
          className="site-layout-background"
          style={{
            minHeight: "100vh",
            color: "#fff",
          }}
        >
          <Row style={{ padding: "30px, 30px" }}>
            <PageWrap>
              <RoutingComponents />
            </PageWrap>
          </Row>
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
export default LayoutComponents;
