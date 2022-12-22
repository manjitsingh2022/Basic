import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { Typography } from 'antd';
const { Title } = Typography;
const NotFound = () => {
  return (
    <div className="PageNotFound">
      <Title>Page Not Found </Title>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
