import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import"./CollectionCard"
const CollectionCard = () => {
  return (
    <>
    <div className='collectionCard'>
    <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
    </div>
    </>
  )
}

export default CollectionCard