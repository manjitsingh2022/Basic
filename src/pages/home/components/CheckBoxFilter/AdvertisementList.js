import {
  Avatar,
  Card,
  Checkbox,
  Col,
  Input,
  message,
  Row,
  Space,
  Tag,
  /*  Tag, */ Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { getProduct } from "../../../reactRedux/actions/productAction";
// import { useDispatch } from "react-redux";
import axios from "../../../../api/axios";
import { GithubOutlined, LinkOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import "./style.css";
import { StyledCard } from "../../../../shared/commonStyle";
import InfiniteScroll from "react-infinite-scroll-component";
const { Meta } = Card;
const { Text } = Typography;
const AdvertisementList = ({ categoryList }) => {
  const style = {
    background: "#0092ff",
    padding: "8px 0",
    display: "block",
    flex: "0 0 50%",
    maxidth: "25%",
  };
  // const dispatch = useDispatch();
  // const [list, setList] = useState([]);
  const [list, setList] = useState(Array({ length: 4, hasMore: true }));
  console.log("items", Array({ length: 8 }));
  // useEffect(() => {
  // console.log(Array.from({ length: 8 }), "itemsitems");
  // }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filterList, setFilterList] = useState(null);

  const onCheck = (checkedValues) => {
    console.log("categoryList main", categoryList);
    console.log("categoryList list main", list);
    console.log("checkked ", checkedValues.target.checked);
    console.log("checkked value", checkedValues.target.value.category);

    let rowKeys = [...selectedRowKeys];
    if (checkedValues.target.checked) {
      rowKeys = [...selectedRowKeys, checkedValues.target.value.category];
    } else {
      rowKeys.splice(selectedRowKeys.indexOf(checkedValues.target.value), 1);
    }
    console.log("rowKeys", rowKeys);
    setSelectedRowKeys(rowKeys);

    if (rowKeys.length > 0) {
      const newval = list.filter((ite) => rowKeys.includes(ite.category));
      console.log("newval", newval);
      setFilterList(newval);
    } else {
      setFilterList(null);
    }
  };

  // useEffect(() => {
  //   console.log("selectedRowKeys", selectedRowKeys);
  // }, [selectedRowKeys]);
  // useEffect(() => {
  //   console.log("setFilterList", filterList);
  // }, [filterList]);
  const getData = async () => {
    try {
      await axios.get("/advertisements").then((response) => {
        setList(response?.data?.response);
        console.log("response", response);
      });
    } catch (error) {
      message.error("Select category error");
    }
  };
  useEffect(() => {
    getData();
  }, [categoryList]);
  const searchItems = (value) => {
    console.log("value", value);
    if (value == "") {
      getData();
    } else if (value) {
      const filteredData = list?.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      console.log("searchTerms", filteredData);
      setList(filteredData);
    } else {
      console.log("value", value);
    }
  };
  const fetchMoreData = () => {
    //   // a fake async api call like which sends
    //   // 20 more records in 1.5 secs
    setTimeout(() => {
      setList(list.concat(Array({ length: 4 })));
    }, 500);
    console.log("length", Array({ length: 4 }));
  };
  return (
    <>
      <Row
        gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        style={{ marginTop: "10px" }}
      >
        <Col className="gutter-row" span={5}>
          <div /* style={style} */>
            {list && (
              <>
                <Input
                  placeholder="Search Advertisement"
                  onChange={(e) => searchItems(e.target.value.toLowerCase())}
                />

                <Title level={5}>Categories</Title>
                <Space direction="vertical">
                  {categoryList.map((item, index) => {
                    return (
                      <>
                        <Checkbox key={index} value={item} onChange={onCheck}>
                          {item.category}
                        </Checkbox>
                      </>
                    );
                  })}
                </Space>
              </>
            )}
          </div>
        </Col>
        <Col span={19}>
          <div id="scrollableDiv" style={{ height: 500, overflow: "auto" }}>
            <InfiniteScroll
              dataLength={list.length}
              next={fetchMoreData}
              hasMore={list.hasMore}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <Row gutter={[24, 24]}>
                {(filterList === null ? list : filterList).map(
                  (items, index) => (
                    <Col span={6}>
                      <Link key={index} to={`/advertisement/${items._id}`}>
                        <StyledCard>
                          <Card
                            className="cardMeta"
                            size="default"
                            hoverable
                            cover={
                              <img
                                alt="images"
                                style={{
                                  maxHeight: 150,
                                  minHeight: 150,
                                }}
                                src={`http://localhost:8080/${items.image}`}
                                actions={[
                                  <GithubOutlined key="github" type="link">
                                    <Tag>
                                      <a href="https://ant.design/components/card/"></a>
                                    </Tag>
                                  </GithubOutlined>,
                                  <LinkOutlined key="link" href="" />,
                                ]}
                              />
                            }
                          >
                            <Meta
                              avatar={
                                <Avatar
                                  src={`http://localhost:8080/${items.image}`}
                                />
                              }
                              title={items.name}
                              description={<p>{items.description}</p>}
                            />
                          </Card>
                        </StyledCard>
                      </Link>
                      {/* </div> */}
                    </Col>
                  )
                )}
              </Row>
            </InfiniteScroll>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AdvertisementList;
