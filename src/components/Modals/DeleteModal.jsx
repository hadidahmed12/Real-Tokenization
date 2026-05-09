import React from "react";
import { Modal } from "react-bootstrap";

const DeleteModal = ({
  show,
  handleClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
}) => {
  return (
    <Modal backdrop='static' show={show} onHide={handleClose} centered>
      <Modal.Body>
        <Modal.Title className='modal-title mt-2'>{title}</Modal.Title>
        <p className='modal-description mt-3'>{description}</p>
        <div className='d-flex justify-content-end gap-3 mt-4'>
          <button
            className='modal-cancel btn btn-outline-secondary mr-3'
            onClick={handleClose}
          >
            {cancelText}
          </button>
          <button className='modal-confirm btn btn-danger' onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
