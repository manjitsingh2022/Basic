import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { LogWrap } from "../../shared/commonStyle";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const LogIn = () => {
  const [LogInSubmit, setLogInSubmit] = useState(false);
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const onFormSubmit = async() => {
    console.log(LogInSubmit, "LogInSubmit");
    form
      .validateFields()
      .then(async (values) => {
        // do something with values
        console.log("values", values);
        try {
        await  axios.post("http://localhost:8080/login", values).then((response) => {
            console.log("response", response);
            localStorage.setItem("token-info", JSON.stringify(response));
            const token = response.data.token;
            localStorage.setItem("token", token);
            setAuthToken(token);
            setLogInSubmit(true);
            navigate("/?login=true");
            window.location.reload(false);
          });
        } catch (error) {
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
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else delete axios.defaults.headers.common["Authorization"];
  };

  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values);
  // };

  const registerForm = () => {
    navigate(`/register`);
  };
  return (
    <Row>
      <Col span={8} />
      <Col span={8}>
        <LogWrap>
          <Form
            form={form}
            className="login-form"
            // initialValues={{
            //   remember: true,
            // }}
            // onFinish={onFinish}
          >
          <Title level={3} style={{textAlign:"center",color:'#000',marginBottom:'15px',marginTop:'10px', fontWeight:'500'}}>Log In </Title>
            
                
            <Form.Item
            
              name="email"
          
              // label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your vaild Email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"

              />
            </Form.Item>

            <Form.Item
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
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <>
                <Button
                  loading={LogInSubmit}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={() => onFormSubmit()}  block
                >
                  LogIn
                </Button>
              </>
            </Form.Item>

            <Form.Item
              style={{
                textAlign: "center"
              }}
            >
              {`Need to create an account?   `}
              <Button style={{ padding: "1" }} onClick={registerForm} >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </LogWrap>
      </Col>
      <Col span={8} />
    </Row>
  );
};
export default LogIn;
