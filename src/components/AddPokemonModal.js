import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Redirect } from 'react-router-dom';

const AddPokemonModal = ({ showModal, id, handle }) => {

  const [value, setValue] = useState()


  const onInput = ({target:{value}}) => setValue(value)

  const addPokemon = async (id) => {
    const convId = parseInt(id, 10);
    const opt = {
      headers: {'Content-Type': 'application/json'}
    };
    await axios.post(`http://localhost:8081/api/v1/user/pokemon`, {'name': value, 'pokemon_id': convId}, opt);
  }
 
  return (
    <>
      <Modal show={showModal} onHide={handle}>
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
          <Button variant="primary" onClick={ () => addPokemon(id)} type='submit' onSubmit={ () => addPokemon(id)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddPokemonModal;