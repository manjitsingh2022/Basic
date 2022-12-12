import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { FormWrap } from "../../../shared/commonStyle";
export const Advertisement = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [fill, setFill] = useState(false);
  const [form] = Form.useForm();

  const newPostAdd = () => {
    setFill(true);
    form.validateFields().then(async (val) => {
      try {
        const { name, description } = val;
        const payload = {
          name: name ? name : "",
          description: description ? description : "",
        };
        console.log(payload, "userkey");
        const response = await axios.post(`/advertisement`, payload);
        if (response) {
          message.success("Successfully  new Advertisement !");
          setPost();
        }
        navigate(`/`);
      } catch (error) {
        console.log("Error while Advertisement", error);
        message.error("something went wrong while Advertisement!");
      } finally {
        setFill(false);
      }
    });
  };

  if (!post) return;
  return (
    <>
    <Col span={14} offset={5}>
    <FormWrap>
      
    
      <Form
        form={form}
        autoComplete="off"
        wrapperCol={{
          span: 24,
        }}
      >
        <Row  gutter={[16, 16]} style={{marginTop:20}}>
          <Col span={12} >
            <Form.Item
              labelCol={{ span: 24 }}
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input placeholder="Provide a short name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input description!" },
              ]}
            >
              <Input placeholder="Provide a short description" />
            </Form.Item>
          </Col>
        </Row>

        <Col span={12} offset={6}>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                navigate(`/`);
              }}
              type="primary"
              danger
              style={{ margin: "10px" }}
            >
              Close
            </Button>
            <Button
              // loading={submitting}
              type="primary"
              onClick={newPostAdd}
            >
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Form> 
      </FormWrap> </Col>
    </>
  );
};
