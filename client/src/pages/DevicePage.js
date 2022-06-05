import React, {useState, useEffect} from 'react'
import { Container, Image, Col, Row, Card, Button } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceAPI'

export default function DevicePage() {

  const [device, setDevice] = useState({info: []})
  const {id} = useParams()

  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  }, [])

  return (
    <Container className='mt-3'>
      <Row>
        <Col md={4}>
          <Image width={300} src=''></Image>
        </Col>
        <Col md={12}>
          <Row width={300}>
            <h2>{device.name}</h2>
            <div>
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card>
            <h3>{device.price}</h3>
            <Button>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className='mt-3'>
        <h1>Характеристики</h1>
         {device.info.map((info, index) =>
            <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent'}}>
              {info.title}: {info.description}
            </Row>
         )}
      </Row>
    </Container>
  )
}
