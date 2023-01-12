import { Button, Form, Input, message, Modal, Switch } from "antd";
// import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import { MonthDayYearFormat } from "../../../shared/constants";
const EditAdvertisementDetail = ({
  open,
  handleOk,
  handleCancel,
  categoryRecord,
  // loading,
  getData,
}) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  useEffect(() => {
    if (categoryRecord) {
      form.setFieldsValue({
        _id: categoryRecord._id,
        name: categoryRecord.name ? categoryRecord.name : "",
        description: categoryRecord.description
          ? categoryRecord.description
          : "",
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
        const { name, description, category, status } = val;
        const payload = {
          _id: categoryRecord["_id"],
          // _id: record._id,
          name: name,
          category: category,
          description: description,
          status: status ? status : false,
          createdDate: moment().format(MonthDayYearFormat),
        };
        const response = await axios.patch(
          `/advertisement/update/${id}`,
          payload
        );
        getData();
        message.success("Advertisement Detail update document!");
        console.log("response", response);
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
        width={500}
        title="Change a Advertisement Detail"
        //   loading={loading}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} danger type="primary">
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
          <Form.Item labelCol={{ span: 24 }} name="name" label="Name">
            <Input placeholder={""} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            name="description"
            label="Description"
          >
            <Input placeholder={""} />
          </Form.Item>

          <Form.Item labelCol={{ span: 24 }} name="category" label="category">
            <Input placeholder={""} />
          </Form.Item>

          {/* <Form.Item labelCol={{ span: 24 }} name="createdDate" label="Date">
              <Space direction="vertical" size={12}>
                <DatePicker  style={{ width: '100%'}}/>
              </Space>
            </Form.Item> */}

          {/* <Form.Item
            name={"status"}
            label="Active"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default EditAdvertisementDetail;
