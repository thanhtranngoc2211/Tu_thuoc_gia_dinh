import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
 
const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #EBE645;
    height: 100vh;   
`

const Head = styled.div`
    display: flex;
`

const ViewnoAdd = styled.div`
    display: flex;
`

export default function Order() {

    var { id } = useParams();
    id = Number(id);

    const [pill, setPill] = useState({name: '', quantity: 0, exportDate: null})
    const [show, setShow] = useState(false);
    const [add, setAdd] = useState(true);

    const handleChangeName = (event) => {
        setPill({name: event.target.value, quantity: pill.quantity, exportDate: pill.exportDate})
    }
    const handleChangeQuantity = (event) => {
        setPill({name: pill.name, quantity: event.target.value, exportDate: pill.exportDate})
    }
    const handleChangeExport= (event) => {
        setPill({name: pill.name, quantity: pill.quantity, exportDate: event.target.value})
    }

    const handleClick = () => {
        console.log(pill)
        setShow(true)
    }

    const handleClose = () => setShow(false);

    const handleAdd = () => {
        setAdd(false);
    }

    const handleBack = () => {
        setAdd(true);
    }

    const handleChangeOrder = () => {

    }

    return (
        <Page>
            <Head>
                {add 
                    ? <Link to={`/${id}`} style={{position:'absolute',left:'0'}}>
                        <Button>Back</Button>
                    </Link>
                    : <Button onClick={handleBack} style={{position:'absolute',left:'0'}}>Back</Button>
                }
                
                <h1 style={{marginTop:'40px'}}>Nhập đơn thuốc</h1>
            </Head>
            {add
                    ? <ViewnoAdd>
                        <Button onClick={handleAdd} style={{marginTop: '240px'}}>Tạo đơn thuốc mới</Button>
                        <Link to={`/order/spec/${id}`}>
                            <Button style={{marginTop: '240px', marginLeft: '30px'}}>Xem đơn thuốc</Button>
                        </Link>
                    </ViewnoAdd>
                    : null
            }
            {!add 
                ? <Form style={{display: 'flex', flexDirection: 'column', marginTop:'70px'}}>
                    <select title="Mã đơn thuốc">
                        <option value="1" selected="selected">Đơn mới</option>
                        <option value="1">Đơn thuốc 1</option>                       
                    </select> 
                    <Form.Group controlId="formName">
                    <Form.Label>Tên thiết bị</Form.Label>
                        <Form.Control type="text" value={pill.name} onChange={handleChangeName} />
                    </Form.Group>                    
                    <Form.Group controlId="formQuantity">
                        <Form.Label>Liều lượng</Form.Label>
                        <Form.Control type="text" value={pill.quantity} onChange={handleChangeQuantity} />
                    </Form.Group>
                    <Form.Group controlId="formExp">
                        <Form.Label>Hạn sử dụng</Form.Label>
                        <Form.Control type="date" value={pill.expiryDate}  onChange={handleChangeExport}/>
                    </Form.Group>
                    <Button onClick={handleClick} variant="outline-primary" style={{marginTop:'30px', width: '100%'}}>Chỉnh sửa</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Đã thêm thành công!</Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
            : null}
        </Page>
    );
}