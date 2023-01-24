import React, { useState, useEffect } from "react";
import { Button, message, Space, Switch, Table } from "antd";
import axios from "../../api/axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EditAdvertisementDetail from "./component/editAdvertisementDetail";
const AdvertisementDetail = () => {
  const [adsRecord, setAdsRecord] = useState([]);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalRecord, setShowModalRecord] = useState(false);
  const [fixedTop, setFixedTop] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
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
    console.log("delete", _id);
    try {
      await axios.delete(`/advertisement/${_id}`).then((res) => {
        console.log(res.data, "deletedelete");
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
      width: 100,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 100,
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 100,
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: 20,
      render: (_, record) => {
        return (
          <Space direction="horizontal">
            <>
              <Button
                key="submit"
                type="primary"
                onClick={() => onCategoryEdit(record)}
              >
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
  // const adsRecord = [];
  for (let i = 0; i < 8; i++) {
    adsRecord.push({
      // name: `${adsRecord.name}`,
      // category: ` ${adsRecord.category}`,
    });
  }
  const onCategoryEdit = (record) => {
    console.log("onCategoryEdit", record);
    setShowModalRecord(record);
    setShowModalEdit(true);
  };
  const onComfirmEdit = async () => {
    setShowModalEdit(false);
  };
  const handleTableChange = (filters, sorter) => {
    console.log("pagination");
  };
  return (
    <>
      <Table
        dataSource={adsRecord}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{
          x: 1500,
        }}
        summary={() => (
          <Table.Summary fixed={fixedTop ? "top" : "bottom"}>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>
                <Switch
                  checkedChildren="Fixed Top"
                  unCheckedChildren="Fixed Top"
                  checked={fixedTop}
                  onChange={() => {
                    setFixedTop(!fixedTop);
                  }}
                />
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
        sticky
      />
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
