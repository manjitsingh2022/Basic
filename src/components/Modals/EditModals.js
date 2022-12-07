import { Button, Form, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";

const EditModals = ({ open, handleOk, handleCancel, dataRecord, loading }) => {
  // console.log("dataRecord", dataRecord)

  const [form] = Form.useForm();
  useEffect(() => {
    if (dataRecord) {
      form.setFieldsValue({
        title: dataRecord.title ? dataRecord.title : "",
        body: dataRecord.body ? dataRecord.body : "",
      });
    }
  }, [dataRecord, form]);

  const onSaveDocument = () => {
    form.validateFields().then(async (val) => {
      console.log("values", val);
      try {
        const { title, body } = val;

        const payload = {
          title,
          body,
        };
        console.log("payload", payload);
      } catch (error) {
        console.log("error while save document", error);
        message.error("error while saving document!");
      } finally {
        handleCancel();
      }
    });
  };

  return (
    <>
      <Modal
        title="Update a text."
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
          <Form.Item labelCol={{ span: 24 }} name="title" label="Title">
            <Input placeholder={""} />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }} name="body" label="Body">
            <Input placeholder={""}></Input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModals;
