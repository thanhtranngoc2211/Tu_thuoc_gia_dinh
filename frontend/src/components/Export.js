import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Modal, DropdownButton } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
 
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

export default function Export() {

    var { id } = useParams();
    id = Number(id);

    const [pill, setPill] = useState({name: '', quantity: 0, exportDate: null})
    const [show, setShow] = useState(false);

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

    const handleChangePill = () => {
        
    }

    return (
        <Page>
            <Head>
                <Link to={`/${id}`} style={{position:'absolute',left:'0'}}>
                    <Button>Back</Button>
                </Link>
                <h1 style={{marginTop:'40px'}}>Nhập thuốc</h1>
            </Head>
            <Form style={{display: 'flex', flexDirection: 'column', marginTop:'70px'}}>
                <DropdownButton title="Tên thiết bị">
                    <DropdownItem onClick={() => handleChangePill}>Panadol</DropdownItem>
                </DropdownButton>
                <Form.Group controlId="formQuantity">
                    <Form.Label>Số lượng</Form.Label>
                    <Form.Control type="text" value={pill.quantity} onChange={handleChangeQuantity} />
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
        </Page>
    );
}