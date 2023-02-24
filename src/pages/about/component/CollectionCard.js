import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import Loading from "../../../components/spin/Loading";
import { UseGlobalContext } from "../../../context/AppProvider";

import "./CollectionCard";
const CollectionCard = () => {
  const { hits, page, isloading, removePost } = UseGlobalContext();

  console.log("page", page);
  if (isloading) {
    return <Loading />;
  }
  return (
    <>
      <div>
        {hits.map((data) => {
          return (
            <>
              <div>{data.name}</div>
              <button onClick={() => removePost(data._id)}>remove</button>
            </>
          );
        })}
      </div>
      <div className="collectionCard">
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      </div>
    </>
  );
};

export default CollectionCard;
