import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form, Dropdown } from 'react-bootstrap'
import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { createType } from '../../http/deviceAPI';

export default function CreateType({show, onHide}) {
  const [value, setValue] = useState('')
  const addType = () => {
    createType({name: value}).then(data => setValue(''))
    onHide()
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={value} placeholder={"Введите название типа"} onChange={(e) => setValue(e.target.value)}>

          </Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addType}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}