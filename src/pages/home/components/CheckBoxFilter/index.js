import React, { useState } from "react";
import { Checkbox, Space ,Typography} from "antd";
const { Title } = Typography;
const CheckBoxFilter = ({ categoryList,searchItems}) => {
 const [category,setCategory]=useState('')
 
 const onChange = (item) => {
    // console.log("category",item.category)
    if (item.category === "category") {

    const updateList = categoryList?.filter((x)=>x === item)
    searchItems(updateList)
    // console.log("updatelList",updateList)
    }
  };
  return (
    <>
     <Title level={5}>Categories</Title>
      <Space direction="vertical">
        {categoryList.map((item,index) => {
          return (
            <>
              <Checkbox key={index} value={item} onClick={(e) => onChange(item)} >
                {item.category}
              </Checkbox>
            </>
          );
        })}
      </Space>
    </>
  );
};

export default CheckBoxFilter;
