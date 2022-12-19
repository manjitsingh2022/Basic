import { Card, Col, Input, message, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
const imageUrl = "`http://localhost:8080/upload`";
const { Meta } = Card;
const { Text } = Typography;
const AdvertisementList = () => {
  const [list, setList] = useState([]);

  const getData = async () => {
    try {
      await axios.get("/advertisements").then((response) => {
        setList(response?.data?.response);
      });
    } catch (error) {
      message.error("Select category error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const searchItems = (value) => {
    if (value === "") {
      getData();
    } else {
      const filteredData = list?.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      console.log("searchTerms", filteredData);
      setList(filteredData);
    }
    console.log("value", value);
  };

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: "10px" }}>
        <Col span={5}>
          {list && (
            <div>
              <Input
                placeholder="Search Advertisement"
                onChange={(e) => searchItems(e.target.value.toLowerCase())}
              />
            </div>
          )}
        </Col>
        <Col span={19}>
          <Row gutter={[16, 16]}>
            {list?.map((items, index) => {
            
              return (
                <>
                  <Col span={6} key={index} style={{ display: "flex" }}>
                    <Card
                      size="default"
                      hoverable
                      style={{
                        width: "auto",
                      }}
                      cover={
                        <img
                          alt="example"
                          style={{
                            minHeight: 180,maxHeight:200
                          }}
                          src={`http://localhost:8080/${items.image}`}
                        />
                      }
                      // src={`${process.env.NODE_APP_URL}${items.image}`} />}
                    >
                      <Meta
                        className="metaCustom"
                        title={items.name}
                        description={
                          <Text className="customer--address">
                            {items.description}
                          </Text>
                        }
                      />
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default AdvertisementList;
