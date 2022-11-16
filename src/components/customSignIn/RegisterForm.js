import { LockOutlined, UserAddOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { LogWrap } from "../../shared/commonStyle";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
// import Parse from "parse/dist/parse.min.js";
const RegisterForm = ({}) => {
  const [register, setRegister] = useState(false);
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const onFormSubmit = async () => {
    console.log(register, "register");
    form
      .validateFields()
      .then(async (values) => {
        // do something with values
        console.log("values", values);
        try {
          await axios
            .post("http://localhost:8080/register", values)
            .then((response) => {
              console.log("response", response);
              window.location.reload(false);
            });
        } catch (error) {
          message.error("Login Error!");
          console.log("Error while submitting data!", error);
        } finally {
          setRegister(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const toSign = () => {
    navigate(`/login`);
  };

  return (
    <Row>
      <Col span={8} />
      <Col span={8}>
        <LogWrap>
          <Form
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
          >
            <Title
              level={3}
              style={{
                textAlign: "center",
                color: "#000",
                marginBottom: "15px",
                marginTop: "10px",
                fontWeight: "500",
              }}
            >
              ACCESS ACCOUNT
            </Title>
            <p
              style={{ fontWeight: "500", textAlign: "center" }}
              className="color-black"
            >
              Please enter your details
            </p>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your vaild Name!",
                },
              ]}
            >
              <Input
                prefix={<UserAddOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
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
              label="Password"
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

            <Form.Item
              name="confirmpassword"
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Please input your confirmpassword!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm password"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: "Phone Number is required" }]}
            >
              <Input type="tel" placeholder="Phone Number" />
            </Form.Item>

            <Button
              loading={register}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={() => onFormSubmit()}
              block
            >
              Register
            </Button>

            <div
              style={{
               
                marginTop: 10,    textAlign: "center"
              }}
            >
              {`Already have an account?   `}
              <Button style={{ padding: "1" }} onClick={toSign}>
                Sign in
              </Button>
            </div>
          </Form>
        </LogWrap>
      </Col>
      <Col span={8} />
    </Row>
  );
};
export default RegisterForm;
