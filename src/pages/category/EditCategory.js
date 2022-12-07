import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Space,
  Switch,
} from "antd";
// import axios from "axios";
import axios from "../../api/axios";
import moment from "moment";
import React, { useEffect } from "react";
import { MonthDayYearFormat } from "../../shared/constants";
const EditCategory = ({
  open,
  handleOk,
  handleCancel,
  categoryRecord,
  loading,
  getData,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (categoryRecord) {
      form.setFieldsValue({
        _id: categoryRecord._id,
        category: categoryRecord.category ? categoryRecord.category : "",
        status: categoryRecord.status ? categoryRecord.status : "",
        createdDate: categoryRecord.createdDate
          ? categoryRecord.createdDate
          : "",
      });
    }
  }, [categoryRecord, form]);

  const onSaveDocument = async () => {
    form.validateFields().then(async (val) => {
      console.log("values", val);
      try {
        const { category, status } = val;
        const payload = {
          _id: categoryRecord["_id"],
          // _id: record._id,
          category: category,
          status: status ? status : false,
          createdDate: moment().format(MonthDayYearFormat),
        };
        const response = await axios.patch("/update", payload);
        getData();
        message.success("Category update document!");
        console.log("response", response);
        // form.resetFields();
        console.log("payload", payload);
      } catch (error) {
        console.log("error while update document", error);
        message.error("error while update document!");
      } finally {
        handleCancel();
      }
    });
  };
  return (
    <>
      <Modal
        width={400}
        title="Change a Category"
        loading={loading}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={() => onSaveDocument()}
          >
            Update
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item labelCol={{ span: 24 }} name="category" label="category">
            <Input placeholder={""} />
          </Form.Item>

          {/* <Form.Item labelCol={{ span: 24 }} name="createdDate" label="Date">
            <Space direction="vertical" size={12}>
              <DatePicker  style={{ width: '100%'}}/>
            </Space>
          </Form.Item> */}

          <Form.Item
            name={"status"}
            label="Active"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditCategory;
