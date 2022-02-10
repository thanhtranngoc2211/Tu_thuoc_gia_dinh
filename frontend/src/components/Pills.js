import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Form, Button, Modal } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
 
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

export default function Pills() {

    var { id } = useParams();
    id = Number(id);

    const [pill, setPill] = useState({type: '', name: '', unit: '', note: null});
    const [pillsLength, setPillsLength] = useState(0);
    const [show, setShow] = useState(false);

    const fetchPills = async() => {
        try {
          const items = await (await fetch("http://127.0.0.1:8000/items")).json()
          setPillsLength(items.length)
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(() => {
        fetchPills();
      });

    const handleChangeType = (event) => {
        setPill({type: event.target.value, name: pill.name, unit: pill.unit, note: pill.note})
    }

    const handleChangeName = (event) => {
        setPill({type: pill.type, name: event.target.value, unit: pill.unit, note: pill.note})
    }

    const handleChangeUnit = (event) => {
        setPill({type: pill.type, name: pill.name, unit: event.target.value, note: pill.note})
    }

    const handleChangeNote = (event) => {
        setPill({type: pill.type, name: pill.name, unit: pill.unit, note: event.target.value})
    }

    const handleClick = () => {
        const pillCreate = {
            "masoTB": pillsLength,
            "loaiTB": pill.type,
            "tenTB": pill.name,
            "soLuong": 0,
            "donViTinh": pill.unit,
            "ghiChu": pill.note,
        }

        fetch("http://127.0.0.1:8000/create_items/", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Origin": "http://localhost:3000"
            },  
            body: JSON.stringify(pillCreate)
        })
        setShow(true);
    }

    const handleClose = () => setShow(false);

    return (
        <Page>
            <Head>
                <Link to={`/${id}`} style={{position:'absolute',left:'0'}}>
                    <Button>Back</Button>
                </Link>
                <h1 style={{marginTop:'40px'}}>Nhập thông tin thiết bị y tế</h1>
            </Head>
            <Form style={{display: 'flex', flexDirection: 'column', marginTop:'70px'}}>
                <Form.Group controlId="formType">
                    <Form.Label>Loại thiết bị</Form.Label>
                    <Form.Control type="text" value={pill.type} onChange={handleChangeType}/>
                </Form.Group>
                <Form.Group controlId="formNam">
                    <Form.Label>Tên thiết bị</Form.Label>
                    <Form.Control type="text" value={pill.name} onChange={handleChangeName}/>
                </Form.Group>
                <Form.Group controlId="formUnit">
                    <Form.Label>Đơn vị tính</Form.Label>
                    <Form.Control type="text" value={pill.unit} onChange={handleChangeUnit}/>
                </Form.Group>
                <Form.Group controlId="formNote">
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control type="text" value={pill.note} onChange={handleChangeNote}/>
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