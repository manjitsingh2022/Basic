import { Avatar, Card, Checkbox, Col, Input, Row, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { getProduct } from "../../../reactRedux/actions/productAction";
// import { useDispatch } from "react-redux";
import { GithubOutlined, LinkOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import "./style.css";
import { StyledCard } from "../../../../shared/commonStyle";
import InfiniteScroll from "react-infinite-scroll-component";
import { UseGlobalContext } from "../../../../context/AppProvider";
const { Meta } = Card;
const AdvertisementList = ({ categoryList }) => {
  // console.log(categoryList, "categoryList");
const data = UseGlobalContext();
  const { hits, address } = UseGlobalContext();
  console.log(address, "address");
  console.log(hits, "listHits");

  // console.log(data, "data");
  // const dispatch = useDispatch();
  // const [list, setList] = useState([]);
  const [addressValue, setAddressValue] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filterList, setFilterList] = useState(null);
  const [list, setList] = useState(Array({ length: 4, hasMore: true }));
  console.log("addressValue", addressValue);

  useEffect(() => {
    console.log("preitem address goes", address);
    // console.log('hits goes', hits)
    console.log("addressValue goes", addressValue);
    if (hits.length > 0) {
      const data = hits.filter((item, index) => {
        if (item.address && item.address != undefined) {
          console.log("addressssssss",address.lat , address.lng)
           return item.address.lat === address.lat && item.address.lng === address.lng 
          }
      });
      console.log("pre test", data);
      setList(data)
    }
  }, [address]);
 
  const onCheck = (checkedValues) => {
    // console.log("categoryList main", categoryList);
    // console.log("categoryList list main", list);
    // console.log("checkked ", checkedValues.target.checked);
    // console.log("checkked value", checkedValues.target.value.category);

    let rowKeys = [...selectedRowKeys];
    if (checkedValues.target.checked) {
      rowKeys = [...selectedRowKeys, checkedValues.target.value.category];
    } else {
      rowKeys.splice(selectedRowKeys.indexOf(checkedValues.target.value), 1);
    }
    // console.log("rowKeys", rowKeys);
    setSelectedRowKeys(rowKeys);

    if (rowKeys.length > 0) {
      const newval = list.filter((ite) => rowKeys.includes(ite.category));
      // console.log("newval", newval);
      setFilterList(newval);
    } else {
      setFilterList(null);
    }
  };

  useEffect(() => {
    if(!address){
      setList(hits);
      setAddressValue(address);
    }
  }, [categoryList, hits]);

  const searchItems = (value) => {
    // console.log("value", value);
    if (value === "") {
      return list;
    } else if (value) {
      const filteredData = list?.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      // console.log("searchTerms", filteredData);
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
    // console.log("length", Array({ length: 4 }));
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
                {/* {hits?.map( */}
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
