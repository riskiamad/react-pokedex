import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Redirect } from 'react-router-dom';

function AddPokemonModal(id) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState()

  const handleClose = () => setShow(false);

  const onInput = ({target:{value}}) => setValue(value)

  const addPokemon = async (id) => {
    const opt = {
      headers: {'Content-Type': 'application/json'}
    };
    const res = await axios.post(`http://localhost:8081/api/v1/user/pokemon`, {'name': value, 'pokemon_id': id}, opt);
    const url = `/mypokemon/${res.data.id}`;
    handleClose();
    <Redirect to={url} />
  }
 
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Gotcha, give your pokemon a name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Alias Name</Form.Label>
              <Form.Control
                type="input"
                autoFocus
                onChange={onInput}
                value={value}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} type='submit' onSubmit={ () => addPokemon(id)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPokemonModal;