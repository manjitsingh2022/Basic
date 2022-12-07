import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Space,
  Table,
} from "antd";
// import axios from "axios";
import axios from "../../api/axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { MonthDayYearFormat } from "../../shared/constants";
import EditCategory from "./EditCategory";
import DeleteModal from "../../components/Modals/DeleteModal";
// import SelectCategory from "../home/CategorySeclect";
const CategoryUser = () => {
  // const params = useParams();
  const [form] = Form.useForm();
  const [ setData] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModalRecord, setShowModalRecord] = useState([]);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [recordDelete, setRecordDelete] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  // const [categorySelect, setCategorySelect] = (true);
 
  const getData = () => {
    axios.get("/categories").then((response) => {
      setCategory(response?.data.response);
      console.log("catss", response?.data?.response);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const onFormSubmit = async () => {
    setLoading(true);
    // setCategorySelect(false)
    form
      .validateFields()
      .then(async (payload) => {
        payload.createdDate = moment().format(MonthDayYearFormat);
        payload.status = true;
        console.log("payload ", payload);
        try {
          await axios.post("/store/", payload).then((response) => {
            setData(response.data);
            message.success("Successfully saved data category.");
            form.resetFields();
            getData();
            // setCategorySelect(true)
          });
        } catch (error) {
          message.error("category Error!");
          console.log("Error while submitting data!", error);
        } finally {
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onCategoryEdit = (record) => {
    console.log("onCategoryEdit", record);
    setShowModalRecord(record);
    setShowModalEdit(true);
  };
  const onComfirmEdit = async () => {
    setShowModalEdit(false);

    console.log("onCategoryEdit", setShowModalEdit(false));
  };

  const onConfirmDelete = async () => {
    setLoading(true);
    console.log("recordDelete", recordDelete);
    try {
      await axios.post("/delete/", { _id: recordDelete }).then((res) => {
        // setCategory(
        //   category.filter((i) => {
        //     return i._id !== categoryRecordDelete;
        //   })
        // );
        getData();
        setShowModalDelete(false);
        setLoading(false);
        message.success("Sucessfully Delete a Category");
      });
    } catch (error) {
      console.log("dsdsddsdsdddsdsdd", error);
      message.error("error while delete content!");
    }
  };

  const onCategoryDelete = (_id) => {
    setShowModalDelete(true);
    setLoading(false);
    setRecordDelete(_id);
    console.log("idddddddddd", _id);
  };

  // const handleStatus = (record) => {
  //   console.log("handleStatus", record.status);
  // };

  const columns = [
    {
      sortDirections: ["descend"],
      title: "Categories",
      dataIndex: "category",
      key: "category",
      sorter: {
        compare: (a, b) => a.category - b.category,
        multiple: 2,
      },
    },
    {
      title: "Date",
      dataIndex: "createdDate",
      key: "date",
      render: (_, record) => (
        <span>
          {/* {moment(record).format(YearMonthDayFormat)} */}
          {moment().format("LL")}
        </span>
      ),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "Status",
    //   render: (status, record) => (
    //     <Switch
    //     // checkedChildren="On"
    //     // unCheckedChildren="Off"
    //     // checked={status}
    //     // onChange={(checked) => handleStatus(checked, record)}
    //     />
    //   ),
    // },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: "80px",
      render: (_, record) => {
        return (
          <Space direction="horizontal">
            <>
              <Button type="default" onClick={() => onCategoryEdit(record)}>
                <EditOutlined
                  style={{
                    width: 20,
                    fontSize: "20px",
                  }}
                />
              </Button>
              <Button
                type="default"
                onClick={() => onCategoryDelete(record._id)}
              >
                <DeleteOutlined
                  style={{
                    width: 20,
                    fontSize: "20px",
                  }}
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
              // label="Category"
              rules={[{ required: true, message: "Category is required" }]}
            >
              <Input type="text" placeholder="Category" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Button
              // loading={submiting}
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

      <DeleteModal
        loading={loading}
        open={showModalDelete}
        handleCancel={() => setShowModalDelete(false)}
        handleOk={onConfirmDelete}
      />

      <Table loading={loading} dataSource={category} columns={columns} />
      <EditCategory
        loading={loading}
        open={showModalEdit}
        categoryRecord={showModalRecord}
        handleCancel={() => setShowModalEdit(false)}
        handleOk={onComfirmEdit}
        getData={getData}
      />

      {/* <SelectCategory categoryList={category} /> */}
    </>
  );
};
export default CategoryUser;
