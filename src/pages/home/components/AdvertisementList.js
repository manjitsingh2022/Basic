import {
  Avatar,
  Card,
  Checkbox,
  Col,
  Input,
  message,
  Row,
  Space,
  /*  Tag, */ Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { getProduct } from "../../../reactRedux/actions/productAction";
// import { useDispatch } from "react-redux";
import axios from "../../../api/axios";
import { GithubOutlined, LinkOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
const { Meta } = Card;
const { Text } = Typography;
const AdvertisementList = ({ categoryList }) => {
  // const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [selection, setSelection] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // useEffect(() => {
  //   dispatch(getProduct());
  // }, [dispatch]);
  // const onChange = (checkedValues) => {
  // console.log("checked = ", checkedValues.target.value);
  // let rowKeys = [...selectedRowKeys];
  // console.log("rowKeysrowKeys", rowKeys);
  // if (checkedValues.target.value) {
  //   rowKeys = [...selectedRowKeys, { ...checkedValues.target.value }];
  // } else {
  //   rowKeys.splice(selectedRowKeys.indexOf(checkedValues.target.value), 1);
  // }
  // setSelectedRowKeys(rowKeys);
  // };
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

    if (rowKeys) {
      const newval = list.filter((ite) => rowKeys.includes(ite.category));
      console.log("newval", newval);
      setList(newval);
    } 

    // if (rowKeys.length > 0 && rowKeys) {
    //   const singleKey = rowKeys.map((item) => {
    //   return list.filter(itm => itm.category===item).map((itms)=>{

    //       return itms

    //     // else{
    //     //   return itm
    //     // }
    //     });
    //     // console.log('tts',dds)
    //   });
    //   console.log(singleKey, "filteredgData");
    //   // setList(singleKey)
    // }

    // const selectCatgory = list.map((items) => {
    //   if (item.category === items.category) {
    //     return { items };
    //   }
    // });
    // setList(selectCatgory)
    // console.log("selectCatgory", selectCatgory);
    // if (selection.includes(item)) {
    //   setSelection(selection.filter(v => v !== item.target.value))
    // } else {
    //   setSelection([...selection, item.target.value])
    // }

    // const selectCatgoryNew = list.map((item) => {
    //   console.log("selectCatgoryNew item", item);
    //   console.log("selectCatgoryNew vv", e.target.value);
    //   if (item.category === e.target.value) {
    //     return {
    //       ...item,
    //     };
    //   }
    //   // setList()
    // });
    // console.log("selectCatgoryNew", selectCatgoryNew);
    // setList(selectCatgoryNew)
  };
  useEffect(() => {
    console.log("selection", selection);
    setSelection(selection);
  }, [selection]);
  useEffect(() => {
    console.log("selectedRowKeys", selectedRowKeys);
  }, [selectedRowKeys]);

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
  }, [categoryList]);

  const searchItems = (value) => {
    console.log("value", value);
    if (value === "") {
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
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: "10px" }}>
        <Col span={5}>
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
                      {/* <Checkbox.Group  key={index} options={item} onChange={onChange}>
                        {item.category}
                      </Checkbox.Group> */}

                      <Checkbox key={index} value={item} onChange={onCheck}>
                        {item.category}
                      </Checkbox>
                    </>
                  );
                })}
              </Space>
            </>
          )}
        </Col>
        <Col span={19}>
          <Row gutter={[16, 16]}>
            {list?.map((items, index) => {
              return (
                <>
                  <Col span={6} className="gutter-row">
                    <Link key={index} to={`/advertisement/${items._id}`}>
                      <Card
                        size="default"
                        hoverable
                        cover={
                          <img
                            alt="images"
                            style={{
                              minHeight: 150,
                              maxHeight: 150,
                            }}
                            src={`http://localhost:8080/${items.image}`}
                            actions={[
                              <GithubOutlined key="github" type="link">
                                {/* <Tag>
                                  <a href="https://ant.design/components/card/"></a>
                                </Tag> */}
                              </GithubOutlined>,
                              <LinkOutlined key="link" href="" />,
                            ]}
                          />
                        }
                        // src={`${process.env.NODE_APP_URL}${items.image}`} />}
                      >
                        <Meta
                          avatar={
                            <Avatar
                              src={`http://localhost:8080/${items.image}`}
                            />
                          }
                          title={items.name}
                          description={<Text>{items.description}</Text>}
                        />
                      </Card>

                      {/* <Card
            style={{ width: 300 }}
            cover={
              <img alt="example" src={`http://localhost:8080/${items.image}`} />
            }
            actions={[
              <GithubOutlined key="github" type="link">
                <Tag>
                  <a href="https://ant.design/components/card/"></a>
                </Tag>
              </GithubOutlined>,
              <LinkOutlined key="link" href="" />,
            ]}
          >
            <Meta
              avatar={<Avatar src={`http://localhost:8080/${items.image}`} />}
              title={items.name}
              description={items.description}
            />
          </Card> */}
                    </Link>
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
