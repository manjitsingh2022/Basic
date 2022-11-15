import { Button, Col, Layout, Menu, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoutingComponents from "../routingComponent/Routingcomponents";
import { PageWrap } from "../shared/commonStyle";
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
];
const LayoutComponents = () => {
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    console.log(localStorage.getItem("token"), "local");
    if (localStorage.getItem("token")) {
      setToggle(false);
    }
  }, []);

  const navigate = useNavigate();
  // HANDLE LOGOUT EVENT
  const logout = (e) => {
    e.preventDefault();
    console.log("Logout");
    // CLEAR DATA FROM STORAGE
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    setToggle(true);
  };
  return (
    <>
      <Layout>
        {/* <SiderComponents/>  */}
        <Header
          style={{
            position: "sticky",
            zIndex: 1,
            width: "100%",
          }}
        >
          <div className="logo" />

          {/* <Button  component={Link} to="/login" onClick={() => setToggle(!toggle)}>LogIn</Button>
            <Button  component={Link} to="#" onClick={logout}>logout</Button> */}

          <Row>
            <Col span={12}>
              <Menu
                theme="dark"
                mode="horizontal"
                className="header-nav"
                defaultSelectedKeys={["/"]}
              >
                {navs.map((nav) => (
                  <Menu.Item key={nav.path}>
                    <Link to={nav.path}>{nav.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Col>
            <Col span={12} style={{ textAlign: "end" }}>
              {toggle ? (
                <Button type="primary" >
                  {console.log(toggle, "toggle")}
                  <Link to="/login">
                    <span>LogIn</span>
                  </Link>
                </Button>
              ) : (
                <Button type="primary" onClick={logout}>
                  <Link to="/">
                    <span>logout</span>
                  </Link>
                </Button>
              )}
            </Col>
          </Row>
        </Header>
        <Content className="site-layout">
          <div
            className="site-layout-background"
            style={{
              minHeight: "100vh",
              color: "#fff",
              background: "#26633F",
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
};
export default LayoutComponents;
