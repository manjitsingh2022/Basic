import React, { useEffect, useState } from "react";
// import { useNavigate  } from "react-router-dom";
import axios from "../../api/axios";
// import About from "../about/About";
import CategorySeclect from "./CategorySeclect";
const Home = () => {
  // let navigate = useNavigate();
  const [selectCatgory, setSelectCatgory] = useState([]);

  console.log("selectCatgory", selectCatgory);
  const getData = async () => {
    await axios.get("/categories").then((response) => {
      setSelectCatgory(response?.data?.response);
      console.log("catss", response?.data?.response);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
        {/* {selectCatgory ?<> <CategorySeclect categoryList={selectCatgory} /></>
      
        : <About />
      
      } */}
    <CategorySeclect categoryList={selectCatgory} />
    </>
  );
};

export default Home;
