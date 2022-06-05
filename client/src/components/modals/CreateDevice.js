import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form, Dropdown, Row, Col } from 'react-bootstrap'
import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';

import { fetchTypes, fetchBrands, fetchDevices, createDevice } from '../../http/deviceAPI'

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const [info, setInfo] = useState([])

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [brand, setBrand] = useState(null)
    const [type, setType] = useState(null)

    const addInfo = () => {
      setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
      setInfo(info.filter(i => i.number !== number))
    }

    const selectFile = e => {
      setFile(e.target.files[0])
    }


    const changeInfo = (key, value, number) => {
      debugger
      setInfo(info.map(item => item.number === number ? {...item, [key]: value} : item))
    }

    const addDevice = e => {
      // console.log(info)
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', `${price}`)
      formData.append('img', file)
      formData.append('brandId', device.selectedType.id)
      formData.append('typeId', JSON.stringify(info))
      formData.append('info', name)
      createDevice(formData).then(data => onHide())
    }

    useEffect(() => {
      fetchTypes().then(data => device.setTypes(data))
      fetchBrands().then(data => device.setBrands(data))
    }, [])
  


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
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='mt-3'>
            <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type =>
                <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>{type.name}</ Dropdown.Item>
              )}
            </Dropdown.Menu> 
          </Dropdown>
          <Dropdown className='mt-3'>
            <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand =>
                <Dropdown.Item onClick={() => device.setSelectedBrand(brand)} key={brand.id}>{brand.name}</ Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control className="mt-3" placeholder="Введите название устройства"/>
          <Form.Control className="mt-3" placeholder="Введите стоимость устройства" type="number"/>
          <Form.Control className="mt-3" onChange={selectFile} placeholder="Введите название устройства" type="file"/>
          <hr/>
          <Button variant={'outline-dark'} onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map(item =>
            <Row key={item.number} className="mt-2">
              <Col md={4}>
                <Form.Control value={item.name} onChange={e => {changeInfo('title', e.target.value, item.number)}} placeholder="Введите название свойства"/>
              </Col>
              <Col md={4}>
                <Form.Control value={item.description} onChange={e => {changeInfo('description', e.target.value, item.number)}} placeholder="Введите описание свойства"/>
              </Col>
              <Col md={4}>
                <Button onClick={() => removeInfo(item.number)} variant={"outline-danger"}>
                  Удалить
                </Button>
              </Col>
            </Row>
          )}
          {/* <Form.Control placeholder='Введите название типа' /> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice
