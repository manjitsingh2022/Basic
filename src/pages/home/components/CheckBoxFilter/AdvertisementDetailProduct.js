import { Card, Carousel, Col, List, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../api/axios";
import { ShareAltOutlined, SearchOutlined } from "@ant-design/icons";
import Input from "antd/lib/input/Input";
import './style.css';
const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const AdvertisementDetailProduct = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(3);
  const { id } = useParams();
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  console.log("id", id);
  const getData = () => {
    axios.get(`/advertisement/${id}`).then((response) => {
      setData(response?.data?.product);
      console.log("advertisement", response?.data);
    });
  };
  useEffect(() => {
    getData();
  }, [id]);

  const cardsDisplay = [
    {
      title: (
        <>
          <div>
            {data.name} <ShareAltOutlined />
          </div>
        </>
      ),
      content: <p>{data.description}</p>,
    },
  ];
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col span={16}>
          {/* <Card
           
            hoverable
            cover={
              <img alt="images" src={`http://localhost:8080/${data.image}`} />
            }
          ></Card> */}
          <div>
            <Carousel afterChange={onChange}>
              <div style={contentStyle}>
                <img
                  alt="images"
                  src={`http://localhost:8080/${data.image}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit:"cover"
                  }}
                />
              </div>
            </Carousel>
          </div>
          <div>
            <span>
              <Rate tooltips={desc} onChange={setValue} value={value} />
              {value ? (
                <span className="ant-rate-text">{desc[value - 1]}</span>
              ) : (
                ""
              )}
            </span>
          </div>
          <div>
            <h1>{`₹${455}`}</h1>
            <div>
              <div className="detailsBlock-3-1-1" style={{ display: "flex" }}>
                <button>-</button>
                <Input readOnly type="number" value="value" />
                <button>+</button>
              </div>
              <button disabled={122 < 1 ? true : false}>Add to Cart</button>
            </div>

            <p>
              Status:
              <b className={122 < 1 ? "redColor" : "greenColor"}>
                {122 < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
        </Col>
        <Col span={8} className="column">
          <List 
            dataSource={cardsDisplay}
            renderItem={(item) => (
              <List.Item style={{ display: "contents" }} >
                <Card title={item.title} bordered={false}>
                  {item.content}
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default AdvertisementDetailProduct;
