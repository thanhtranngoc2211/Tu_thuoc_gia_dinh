import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Button, Form, Modal, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

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

export default function Import() {

    var { id } = useParams();
    id = Number(id);

    const [pill, setPill] = useState({name: '', quantity: 0, expiryDate: '', importDate: ''})
    const [show, setShow] = useState(false);

    const handleChangeQuantity = (event) => {
        setPill({name: pill.name, quantity: event.target.value, expiryDate: pill.expiryDate, importDate: pill.importDate})
    }
    const handleChangeExp = (event) => {
        setPill({name: pill.name, quantity: pill.quantity, expiryDate: event.target.value, importDate: pill.importDate})
    }
    const handleChangeImport = (event) => {
        setPill({name: pill.name, quantity: pill.quantity, expiryDate: pill.expiryDate, importDate: event.target.value})
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
                <Form.Group controlId="formExp">
                    <Form.Label>Hạn sử dụng</Form.Label>
                    <Form.Control type="date" value={pill.expiryDate}  onChange={handleChangeExp}/>
                </Form.Group>
                <Form.Group controlId="formImport">
                    <Form.Label>Ngày nhập</Form.Label>
                    <Form.Control type="date" value={pill.importDate} onChange={handleChangeImport} />
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