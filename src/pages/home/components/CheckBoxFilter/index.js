import React from "react";
import { Checkbox, Space } from "antd";

const CheckBoxFilter = ({ list,searchItems}) => {
  const onChange = (value) => {
    if (value.name === "name") {
    const updateList = list?.filter((x)=>x.value === value.name)
    searchItems(updateList)
    console.log("updatelList",updateList)
    }
    console.log(value.name,"itemitem")
  };
  return (
    <>
      <Space direction="vertical">
        {list.map((item,index) => {
          return (
            <>
              <Checkbox key={index} value={item} onChange={(e) => onChange(e.target.value)} >
                {item.name}
              </Checkbox>
            </>
          );
        })}
      </Space>
    </>
  );
};

export default CheckBoxFilter;
