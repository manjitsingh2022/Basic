import React, { useEffect, useState } from "react";
import { Button, Form, message, Modal, Select } from "antd";
import axios from "../../api/axios";
const CategorySeclect = ({ categoryList }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  // console.log("categorySelect", categoryList);
  const [form] = Form.useForm();
  // useEffect(() => {
  //   if (categoryList) {
  //     form.setFieldsValue({
  //       category: categoryList.category ? categoryList.category : "",
  //     });
  //   }
  // }, [categoryList, form]);
  const handleOk = () => {
    setIsModalOpen(true);
    form.validateFields().then(async (val) => {
      console.log("response", val);
      try {
        const userIdkey = localStorage.getItem("userkey");
        console.log(userIdkey, "userId");
        const { category } = val;
        const payload = {
          category: category ? category : "",
        };
        console.log(payload, "userkey");
        const response = await axios.patch(
          `/api/auth/update/${userIdkey}`,
          payload
        );
        if (response) {
          message.success("Successfully select category user!");
          setIsModalOpen(false);
        }
      } catch (error) {
        console.log("error while category", error);
        message.error("Please select a category!");
      }
    });
  };

  const onSelectChange = (name, val) => {
    form.setFieldsValue({
      [name]: val,
    });
    console.log("category", form);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Select Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={onCancel}
        footer={[
          <>
            <Button key={"Cancel"} danger type="primary" onClick={onCancel}>
              Cancel
            </Button>
            <Button  key="submit" type="primary" onClick={handleOk}>
              Ok
            </Button>
          </>
        ]}
      >
        <Form form={form}>
          <Form.Item
            name="category"
            allowClear
            showArrow
            label="Please Select category"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please select Type" }]}
          >
            <Select
              onChange={(val) => onSelectChange("category", val)}
              placeholder="Please choose category"
              rules={[{ required: true, message: "Please select Type" }]}
            >
              {categoryList?.map((items, key) => {
                console.log("first,", items.category);
                return (
                  <Select.Option key={key} value={items.category}>
                    {items.category}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CategorySeclect;
