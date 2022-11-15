import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { LogInWrap } from "../../shared/commonStyle";
import { useNavigate } from "react-router-dom";
// import Parse from "parse/dist/parse.min.js";
const LogIn = () => {
  const [LogInSubmit, setLogInSubmit] = useState(false);
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const onFormSubmit = () => {
    console.log(LogInSubmit, "LogInSubmit");
    form
      .validateFields()
      .then(async (values) => {
        // do something with values
        console.log("values", values);
        try {
          axios.post("http://localhost:8080/login", values).then((response) => {
            console.log("response", response);
            localStorage.setItem("token-info", JSON.stringify(response));
            const token = response.data.token;
            localStorage.setItem("token", token);
            setAuthToken(token);
            setLogInSubmit(true);
            // navigate("/home");
            window.location.refresh();
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
  return (
    <Row>
      <Col span={8} />
      <Col span={8}>
        <LogInWrap>
          <Form
            form={form}
            className="login-form"
            // initialValues={{
            //   remember: true,
            // }}
            // onFinish={onFinish}
          >
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
                  onClick={() => onFormSubmit()}
                >
                  logIn
                </Button>
               
              </>
            </Form.Item>
          </Form>
        </LogInWrap>
      </Col>
      <Col span={8} />
    </Row>
  );
};
export default LogIn;
