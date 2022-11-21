import { Button, Col, Form, Input, message, Row, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import {
//   DeleteOutlined,
//   EditOutlined,
// } from "@ant-design/icons";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const CategoryUser = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState("");
  const [category, setCategory] = useState([]);
  const [submiting, setSubmiting] = useState(false);


  const getData = () => {
    axios.get("http://localhost:8080/category/categories").then((response) => {
      setCategory(response.data.response);
      console.log("catss", response.data.response);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const onFormSubmit = async () => {
    setSubmiting(true);
    await form.validateFields();
    form
      .validateFields()
      .then(async (payload) => {
        console.log("payload", payload);
        payload.createdDate = new Date();
        payload.status = true;
        console.log("payload", payload);
        // var current_timestamp = new Date();
        try {
          await axios
            .post("http://localhost:8080/category/store", payload)
            .then((response) => {
              setData(response.data);
              console.log("responsxcxcxxcce", response);
              message.success("Successfully saved data category.");
              getData();
            });
        } catch (error) {
          message.error("category Error!");
          console.log("Error while submitting data!", error);
        } finally {
          setSubmiting(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };



  const columns = [
    {
      title: "Categories",
      dataIndex: "category",
      key: "category",
      // render: (_, response) => {
      //   console.log(response, "record");
      //   return <></>;
      // },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, response) => {
        return response.date;
      },
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: "80px",
      render: (_, data) => {
        return (
          <Space direction="horizontal">
            <>
              <Button
                type="default"
                // onClick={() => onCategoryEdit(record)}
              >
                <EditOutlined
                  style={
                    {
                      /* width: 20, fontSize: "20px"*/
                    }
                  }
                />
              </Button>
              <Button
                type="default"
                // onClick={() => onCategoryDelete(record)}
              >
                <DeleteOutlined
                  style={
                    {
                      /* width: 20, fontSize: "20px" */
                    }
                  }
                />
              </Button>
            </>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Form form={form} className="category-form" autoComplete="off">
        <Row justify="space-evenly">
          <Col span={8}>
            <Form.Item
              className="colorWhite"
              name="category"
              label="Category"
              rules={[{ required: true, message: "Category is required" }]}
            >
              <Input type="tel" placeholder="Category" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Button
              loading={submiting}
              type="primary"
              htmlType="submit"
              className="category-form-button"
              onClick={() => onFormSubmit()}
              block
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <Table  dataSource={category} columns={columns} />
    </>
  );
};
export default CategoryUser;
