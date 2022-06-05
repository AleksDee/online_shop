import React, {useState} from 'react'
import { Container, Button } from 'react-bootstrap'
import CreateType from '../components/modals/CreateType'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'

export default function Admin() {
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)
  return (
    <Container className='d-flex flex-column'>
      <Button className='mt-2' onClick={() => setTypeVisible(true)}>
        Добавить тип
      </Button >
      <Button className='mt-2' onClick={() => setBrandVisible(true)}>
        Добавить бренд
      </Button>
      <Button className='mt-2' onClick={() => setDeviceVisible(true)}>
        Добавить устройство
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
    </Container>
  )
}
