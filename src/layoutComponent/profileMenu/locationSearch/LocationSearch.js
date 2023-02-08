import { AutoComplete, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { UseGlobalContext } from "../../../context/AppProvider";

const LocationSearch = () => {
  const { SearchAddress,address } = UseGlobalContext();
  console.log("addressssssd",address)
  // console.log("SearchAddress",SearchAddress);
  const [inputValue, setInputValue] = useState("");
  // console.log("inputValue", inputValue);
  const [options, setOptions] = useState([]);
  const [latlon, setLatlon] = useState({});
  // console.log("latlon", latlon);
  const handleSearch = async (value) => {
    try {
      await axios.get(`/getlocation?city=${value}`).then((response) => {
        // console.log("location", response);
        const valueLocation = response?.data?.data.map((value) => {
          return {
            key: value._id,
            value: value.city,
            label: value.city,
            lat: value.lat,
            lng: value.lng,
          };
        });

        setOptions(valueLocation);
      });

      // console.log("first", options);
      // console.log(value, "dfdfdfdfdf");
    } catch (error) {
      message.error("location getlocation error");
    }
  };

  const onSelect = (value, option) => {
    // console.log("onSelectvalue", option);
    setLatlon(option);
    setInputValue(option.label);
    const a={"lat":option.lat,"lng":option.lng}
    SearchAddress(a);
    // const b=option.lat;
    console.log(a,"latlngSelect")
  };
  useEffect(() => {
    handleSearch()
  }, [latlon]);
  return (
    <>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
          width: 250,
        }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        filterOption={(inputValue, option) =>
          option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      >
        <Input.Search
          value={address}
          size="large"
          placeholder=" Search city"
        />
      </AutoComplete>
    </>
  );
};

export default LocationSearch;
