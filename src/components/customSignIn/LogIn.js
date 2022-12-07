import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import axios from "../../api/axios";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { LogWrap } from "../../shared/commonStyle";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const LogIn = () => {
  const dataFeild ={email:"",password:""}
  const { setAuth } = useContext(AuthContext);
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
            console.log("response", token);
            localStorage.setItem("token", token);
            const userId = response?.data?.id;
            localStorage.setItem("userkey", userId);
            const roles = response?.data?.roles;
            console.log("userId",userId)
            setAuth({ dataFeild, roles, token });
            setAuthToken(token);
            setLogInSubmit(true);
            navigate("/");
            message.success(`${response?.data?.username} is loggged in`);
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
  const registerForm = () => {
    navigate(`/signup`);
  };
  return (<>
  
    <Row>
      <Col span={8} />
      <Col span={8}>
        <LogWrap>
          
          <Form
            form={form}
            className="login-form"
            autoComplete="off"
            
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
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
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
                prefix={<LockOutlined className="site-form-item-icon" />}
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
              {`Need to create an account?   `}
              <Button style={{ padding: "1" }} onClick={registerForm}>
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
