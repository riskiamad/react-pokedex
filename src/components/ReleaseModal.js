import Modal from 'react-bootstrap/Modal';

const ReleaseModal = ({message, showModal, handle}) => {
  return (
      <Modal show={showModal} onHide={handle}>
        <Modal.Header closeButton>
          <Modal.Title>Pokemon</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
  );
};

export default ReleaseModal;