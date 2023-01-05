import React, { useState, useEffect } from "react";
import { Button, message, Space, Table } from "antd";
import axios from "../../api/axios";
import {  DeleteOutlined } from "@ant-design/icons";
const AdvertisementDetail = () => {
  const [adsRecord, setAdsRecord] =useState([]);
  // console.log("adsRecord", adsRecord);
  const getData = async () => {
    try {
      await axios.get("/advertisements").then((response) => {
        setAdsRecord(response?.data?.response);
        console.log("adsRecord", response?.data?.response);
      });
    } catch (error) {
      message.error("Select category error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onConfirmDelete = async (_id) => {
    console.log("delete",_id)
    try {
      await axios.delete(`/advertisement/${_id}`).then((res) => {
        console.log(res.data,"deletedelete");
        getData();
        message.success("Sucessfully Delete a Category");
      });
    } catch (error) {
      console.log("dsdsddsdsdddsdsdd", error);
      message.error("error while delete content!");
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: "80px",
      render: (_, record) => {
        return (
          <Space direction="horizontal">
            <>
              {/* <Button  key="submit" type="primary" onClick={() => onCategoryEdit(record)}>
                <EditOutlined
                  style={{
                    width: 20,
                  }}
                />
              </Button> */}
              <Button
               key="cancel"
                type="primary"
                danger
                onClick={() => onConfirmDelete(record._id)}
              >
                <DeleteOutlined
                  style={{
                    width: 20,
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
      <Table dataSource={adsRecord} columns={columns} />
    </>
  );
};
export default AdvertisementDetail;
