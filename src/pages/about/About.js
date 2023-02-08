import React from "react";
import { UseGlobalContext } from "../../context/AppProvider";
// import CollectionCard from './component/CollectionCard';

const About = () => {
  const { hits ,removePost} = UseGlobalContext();
  return (
    <>
      {hits.map((cutElem) => {
        return (
          <>
            <h2 key={cutElem._id}>{cutElem.name}</h2>
            <button onClick={() => removePost(cutElem._id)}>remove</button>
          </>
        );
      })}
      {/* <CollectionCard/> */}
    </>
  );
};
export default About;

