import React, { useState, useEffect } from "react";
import { Button, message, Space, Table } from "antd";
import axios from "../../api/axios";
import {  DeleteOutlined,EditOutlined } from "@ant-design/icons";
import EditAdvertisementDetail from "./component/editAdvertisementDetail";
const AdvertisementDetail = () => {
  const [adsRecord, setAdsRecord] =useState([]);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalRecord, setShowModalRecord] = useState(false);

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
              <Button  key="submit" type="primary" onClick={() => onCategoryEdit(record)}>
                <EditOutlined
                  style={{
                    width: 20,
                  }}
                />
              </Button>
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
  const onCategoryEdit = (record) => {
    console.log("onCategoryEdit", record);
    setShowModalRecord(record);
    setShowModalEdit(true);
  };
  const onComfirmEdit = async () => {
    setShowModalEdit(false);
  };
  return (
    <>
      <Table dataSource={adsRecord} columns={columns} />
      <EditAdvertisementDetail
        // loading={loading}
        open={showModalEdit}
        categoryRecord={showModalRecord}
        handleCancel={() => setShowModalEdit(false)}
        handleOk={onComfirmEdit}
        getData={getData}
      />
    </>
  );
};
export default AdvertisementDetail;
