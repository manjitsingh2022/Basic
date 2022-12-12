import {
  // Avatar,
  Button,
  Col,
  Layout,
  Menu,
  message,
  Row,
  // Typography,
} from "antd";
// import Password from "antd/lib/input/Password";
import { Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoutingComponents from "../routingComponent/Routingcomponents";
import { SideMenu } from "../routingComponent/SideMenu";
import { PageWrap } from "../shared/commonStyle";
// import lifelogo from "../assets/lifelogo.png";
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
    label: "Category",
    path: "/category",
  },
];
const LayoutComponents = () => {
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
    navigate("/");
    setToggle(false);
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
          <Row>
            <Col span={12}>
              {/* <Link to="/">
                <Avatar src={lifelogo} size="small" />
              </Link> */}

              {/* <Typography.Title level={2} className="logo">
         
        </Typography.Title> */}

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
              {!toggle ? (
                <Button type="primary">
                  {/* {console.log(toggle, "toggle")} */}
                  <Link to="/login">
                    <span>LogIn</span>
                  </Link>
                </Button>
              ) : (
                <Button type="primary" onClick={logout}>
                  <Link to="/">
                    <span>Logout</span>
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
              color: "#000",
              background: "#F5F5F5",
            }}
          >
            <Row /* style={{ padding: "30px, 30px",border:'1px solid #000' }} */
            >
               {/* <Col span={4} >
              <PageWrap>
              <SideMenu/>
              </PageWrap>
              </Col> */}
              <Col span={20} offset={2}>
                <PageWrap>
                  <RoutingComponents />
                </PageWrap>
              </Col>
             
              {/* <Col  span={18} style={{marginLeft:20}}> */}
              {/* <PageWrap> */}
              {/* <RoutingComponents /> */}
              {/* </PageWrap> */}
              {/* </Col> */}
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
