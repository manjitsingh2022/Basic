import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { Typography } from 'antd';
const { Title } = Typography;
const NotFound = () => {
  const userToken = localStorage.getItem("token");
  return (
    <div className="PageNotFound">
      <Title>Page Not Found </Title>
   {userToken?<Link to="/">Home</Link>:<Link to="/signup">signup</Link>}   
    </div>
  );
};

export default NotFound;
