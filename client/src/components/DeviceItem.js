import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Col, Card, Image } from 'react-bootstrap';
import { DEVICE_ROUTE } from '../utils/consts';

export default function DeviceItem({device}) {
  const navigate = useNavigate();
  console.log(navigate)
  return (
    <Col md={3} className={"mt-3"} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
      <Card style={{width:150, cursor: 'pointer'}} border={"light"}>
        <Image style={{width:150, cursor: 'pointer'}}></Image>
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>
            Samsung...
          </div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image style={{width:18, height:18}}></Image>
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  )
}
