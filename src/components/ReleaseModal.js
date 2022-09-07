import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function ReleaseModal({message}) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal show={showModal} onHide={handleClose} fade={false}>
        <Modal.Header closeButton>
          <Modal.Title>Pokemon</Modal.Title>
        </Modal.Header>
        <Modal.Body>${message}</Modal.Body>
      </Modal>
    </>
  );
}

export default ReleaseModal;