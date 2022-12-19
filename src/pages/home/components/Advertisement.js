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
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { FormWrap } from "../../../shared/commonStyle";

export const Advertisement = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [loaderUploadFile, setLoaderUploadFile] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [isSucces, setSuccess] = useState(null);
  const newPostAdd = () => {
    setLoaderUploadFile(true);
    form.validateFields().then(async (val) => {
      try {
        // console.log("images",val.image.file.name)
        const formData = new FormData();
        formData.append("user_file", fileList[0]);
        // console.log('test data', appendfile,'filelist', fileList[0])
        const res = await axios.post("/upload", formData);
        console.log("response", res);
        if (res.data.success === true) {
          setSuccess("Image upload successfully");
          message.success("Image upload successfully");
        }
        const images = res.data;
        console.log("dddldldldldld", images);
        const { name, description, image } = val;
        const payload = {
          name: name ? name : "",
          description: description ? description : "",
          image: image.file.name ? image.file.name : "",
        };
        console.log(payload, "userkey");
        const response = await axios.post(`/advertisement`, payload);
        if (response) {
          message.success("Successfully  new Advertisement!");
          setPost();
        }
        navigate(`/`);
      } catch (error) {
        console.log("Error while Advertisement", error);
        message.error("something went wrong while Advertisement!");
      } finally {
        setLoaderUploadFile(false);
      }
    });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
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
            <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
              <Col span={12}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please input name!" }]}
                >
                  <Input placeholder="Provide a short name" />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Image"
                  name="image"
                  rules={[{ required: true, message: "Please upload Image!" }]}
                >
                  <Upload
                    {...props}
                    // beforeUpload={uploadFile}
                    // fileList={isSucces}
                    loading={isSucces}
                    // disabled={!isSucces}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
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
                  loading={loaderUploadFile}
                  // disabled={!loaderUploadFile}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </FormWrap>{" "}
      </Col>
    </>
  );
};
