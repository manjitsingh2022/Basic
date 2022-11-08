import { Button, Modal } from 'antd';
import React, { useState } from 'react';
const DeleteModal = ({ open,  handleCancel, handleOk ,loading}) => {
  return (
    <>
      <Modal title="Confirmation" loading={loading} open={open} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure you want to delete?</p>
      </Modal>
    </>
  );
};
export default DeleteModal;