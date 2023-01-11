import { Button, Col, Form, Input, message, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../../api/axios";
import { FormWrap } from "../../../../shared/commonStyle";

export const Advertisement = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [loaderUploadFile, setLoaderUploadFile] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [isSucces, setSuccess] = useState(null);
  const [selectCatgory, setSelectCatgory] = useState([]);
  console.log("selectCatgory", selectCatgory);
  const getData = async () => {
    try {
      await axios.get("/categories").then((response) => {
        setSelectCatgory(response?.data?.response);
        console.log("categories", response?.data?.response);
      });
    } catch (error) {
      message.error("Select category error");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const newPostAdd = () => {
    setLoaderUploadFile(true);
    form.validateFields().then(async (val) => {
      try {
        const formData = new FormData();
        formData.append("user_file", fileList[0]);
        const res = await axios.post("/upload", formData);
        console.log("response", res);
        if (res.data.success === true) {
          setSuccess("Image upload successfully");
          message.success("Image upload successfully");
        }

        const { name, description, image, category } = val;
        const payload = {
          name: name ? name : "",
          description: description ? description : "",
          category: category ? category : "",
          image: image.file.name ? image.file.name : "",
        };

        const response = await axios.post(`/advertisement`, payload);
        if (response) {
          message.success("Successfully  new Advertisement!");
          setPost();
        }
      } catch (error) {
        console.log("Error while Advertisement", error);
        message.error("something went wrong while Advertisement!");
      } finally {
        setLoaderUploadFile(false);
        navigate(`/`);
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

  const newArray = selectCatgory.map((item) => ({
    value: item.category,
    label: item.category,
  }));
  console.log("newArray", newArray);

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
                    <Button icon={<UploadOutlined />}>Upload</Button>
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
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Category"
                  name="category"
                  rules={[
                    { required: true, message: "Please select Category!" },
                  ]}
                >
                  <Select
                    showSearch
                    style={{
                      width: 200,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={newArray}
                  />
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
