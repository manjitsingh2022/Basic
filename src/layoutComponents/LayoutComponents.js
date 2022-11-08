import {  Layout, Menu, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Routingcomponets from '../components/routingComponent/Routingcomponents';
const { Header, Content, Footer, } = Layout;

const navs = [
  {
    label: "Home",
    path: "/home",

  },
  {
    label: "About",
    path: "/about",

  },

];
const LayoutComponents = () => (
    <>
  <Layout>
    <Header
      style={{
        position: 'sticky',
        zIndex: 1,
        width: '100%',
      }}
    >
      <div className="logo" />
      <Menu
        mode="horizontal"
        className="header-nav"
        defaultSelectedKeys={['/home']}
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
    
 {/* <SiderComponents/>  */}


    <Content
      className="site-layout"
    >
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: "100vh",
        }}
      >
        <Row  style={{padding:"30px, 30px"}}>
          
        <Routingcomponets />
          
        </Row>
        
        
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center'
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
  </>
);
export default LayoutComponents;