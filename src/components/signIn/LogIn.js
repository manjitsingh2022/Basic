import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import axios from "../../api/axios";
import React, { useState } from "react";
import { LogWrap } from "../../shared/commonStyle";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const LogIn = () => {
  const [form] = Form.useForm();
  const [LogInSubmit, setLogInSubmit] = useState(false);
  let navigate = useNavigate();
  const onFormSubmit = async () => {
    console.log(LogInSubmit, "LogInSubmit");
    form
      .validateFields()
      .then(async (values) => {
        // do something with values
        console.log("values", values);
        try {
          await axios.post("/api/auth/signin", values).then((response) => {
            // localStorage.setItem("token-info", JSON.stringify({response}));
            const token = response?.data?.accessToken;
            localStorage.setItem("token", token);
            console.log("response", token);
            const userId = response?.data?.id;
            localStorage.setItem("userkey", userId);
            console.log("userId", userId);
            const UserRole = response?.data?.roles;
            localStorage.setItem("rolekey", UserRole);
            console.log("roles", UserRole);
            const Usercategory = response?.data?.category;
            localStorage.setItem(
              "categorykey",
              Usercategory ? Usercategory : ""
            );

            setAuthToken(token);
            setLogInSubmit(true);
            navigate("/");
            message.success(`${response?.data?.username} is loggged in`);
            console.log(response?.data, "d");

            window.location.reload(false);
          });
        } catch (error) {
          // if (!err?.response) {
          //   setErrMsg("No Server Response");
          // } else if (err.response?.status === 409) {
          //   setErrMsg("Username Taken");
          // } else {
          //   setErrMsg("Registration Failed");
          // }
          // errRef.current.focus();
          message.error("Login Error!");
          console.log("Error while submitting data!", error);
        } finally {
          setLogInSubmit(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // useEffect((roles)=>{
  //   if (roles === "ROLE_ADMIN") {
  //     navigate("/category");
  //   }else if (roles==="ROLE_USER") {
  //     navigate("/");
  //   } else {
  //     console.log("log in")
  //   }
  // },[])
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else delete axios.defaults.headers.common["Authorization"];
  };

  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  return (
    <>
      <Row>
        <Col span={8} />
        <Col span={8}>
          <LogWrap>
            <Form form={form} className="login-form" autoComplete="off">
              <Title
                level={3}
                style={{
                  textAlign: "center",
                  color: "#fff",
                  marginBottom: "15px",
                  marginTop: "10px",
                  fontWeight: "500",
                }}
              >
                Log In
              </Title>

              <Form.Item
                value="email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your vaild Email!",
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                value="password"
                name="password"
                // label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <>
                  <Button
                    loading={LogInSubmit}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    onClick={() => onFormSubmit()}
                    block
                  >
                    LogIn
                  </Button>
                </>
              </Form.Item>

              <Form.Item
                style={{
                  textAlign: "center",
                }}
              >
                {/* <span> {`Need to create an account?`}</span> */}
                <Button
                  type="link"
                  style={{ padding: "1" }}
                  onClick={() => {
                    navigate(`/signup`);
                  }}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </LogWrap>
        </Col>
        <Col span={8} />
      </Row>

      {/* <CategorySeclect categoryList={selectCatgory}   /> */}
    </>
  );
};
export default LogIn;
