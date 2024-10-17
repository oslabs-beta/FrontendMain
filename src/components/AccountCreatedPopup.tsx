import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
interface ModalProps {
  modalShow: boolean,
  handleModalClose: () => void
}
const AccountCreatedModal: React.FC<ModalProps> =({modalShow, handleModalClose}) => {
  return (
    <>
      <Modal show={modalShow} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height:"200px" }}>
          <p style={{fontSize:'20px'}}>Your account has been successfully created.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AccountCreatedModal;