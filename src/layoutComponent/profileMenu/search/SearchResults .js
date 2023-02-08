import React, { useEffect, useState } from "react";
import { /*  message, */ Input, message } from "antd";
import { UseGlobalContext } from "../../../context/AppProvider";
const { Search } = Input;
export const SearchResults = () => {
  const { name, searchPost } = UseGlobalContext();
  // console.log(name, "SearchResults");
  return (
    <>
      <Search
        placeholder="input search text"
        value={name}
        onChange={(e) => searchPost(e.target.value)}
        enterButton
      />
    </>
  );
};
