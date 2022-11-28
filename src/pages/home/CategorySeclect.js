import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, message, Modal, Select, Space } from "antd";
// import axios from "../../api/axios";
// import { DownOutlined } from '@ant-design/icons';
const CategorySeclect = ({ categoryList }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  // const items = [
  //   {categoryList}
  // ];

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const onChange = (value) => {
  //   console.log(`selected ${value}`);
  // };
  // const onSearch = (value) => {
  //   console.log('search:', value);
  // };
  return (
    <>
      <Modal
        title="Select Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, options) =>
      console.log("first",options)
      (options?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={[
      {categoryList}
    ]} */}
        {/* // defaultValue={[categoryList]} */}
        {/* /> */}

        <Form>
          <Select
            allowClear
            showArrow
            style={{ width: "100%" }}
            placeholder="Please choose category"
          >
            {categoryList.map((items, key) => {
              // console.log(first)
              return (
                <Select.Option key={key} value={items._id}>
                  {items.category}
                </Select.Option>
              );
            })}
          </Select>
        </Form>
      </Modal>
    </>
  );
};
export default CategorySeclect;
