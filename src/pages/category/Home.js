import { Button, Space, Table, Input } from 'antd'
import axios from 'axios';
// import axios from "../../api/axios";
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import DeleteModal from '../../components/Modals/DeleteModal';
import EditModals from '../../components/Modals/EditModals';


const Home1 = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataId, setDataId] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalRecord, setShowModalRecord] = useState([]);
  const params = useParams();
  const loadData = async () => {
    setLoading(true);
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(response.data);
    setLoading(false);
  }
  useEffect(() => {
    loadData();
  }, []);
 

  const onDelete = (id)=> {
    setDataId(id)
    setShowModalDelete(true)
    setLoading(false)
  }
  const onConfirmDelete =()=>{
    setLoading(true)
    try{
      const url = `https://jsonplaceholder.typicode.com/users/${params.id}`
      axios.delete(url).then(id => {
        const DeleteUser = data.filter(dataNew => dataId !== dataNew.id)
        setData(DeleteUser)
        setShowModalDelete(false);
        setLoading(false);
      })
    }catch(error){
      console.log("error",error);
    }
  }
  
 
  
  const onEdit = (record) => {
    console.log("record",record);
    setShowModalRecord(record)
    setShowModalEdit(true)
  }
  
  const onComfirmEdit=(id)=>{
    setShowModalEdit(false)
    try{
      ('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
    }catch(error){
      console.log("error in edit ", error)
    }
  }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text, index) => <a key={index}>{text}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (<>
        <Input
          autoFocus
          placeholder="Type text"
          value={selectedKeys[0]}
          onChange={(e) => { setSelectedKeys(e.target.value ? [e.target.value] : []) }}
          onPressEnter={() => { confirm() }}
          onBlur={() => { confirm() }}
        >
          
        </Input>
          <Button  onClick={() => { confirm() }} type='primary'>Search</Button>

          <Button onClick={() => { clearFilters() }} type='danger'>Reset</Button>
        </>)
      },

      onFilter: (value, record) => {
        return record.title.toLowerCase().includes(value.toLowerCase())
      },
      render: (record, index) => <a key={index}>{record}</a>,
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.body.length - b.body.length,
      render: (text, index) => <a key={index}>{text}</a>,
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (<>
        <Space size="middle">
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button onClick={() => onDelete(record.id)}>Delete</Button>
        </Space></>
      ),
    },
  ];
  return (
    <>
      <EditModals
       loading={loading}
        open={showModalEdit}
        dataRecord={showModalRecord}
        handleCancel={() => setShowModalEdit(false)}
        handleOk={onComfirmEdit}
      />
      <DeleteModal
        loading={loading}
        open={showModalDelete}
        dataId={dataId}
        handleCancel={() => setShowModalDelete(false)}
        handleOk={onConfirmDelete}
      />
      <Table  loading={loading} columns={columns} dataSource={data} />
    </>
  )
}
export default Home1