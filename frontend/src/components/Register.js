import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';

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

export default function Register() {

    let navigate = useNavigate();

    const [users, setUsers] = useState({hoTen: '', namSinh: '', tienSuBL: ''})
    const [usersLength, setUsersLength] = useState(0);
    const [show, setShow] = useState(false);

    const fetchItems = async() => {
        try {
          const users = await (await fetch("http://127.0.0.1:8000/users")).json()
          setUsersLength(users.length)
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(() => {
      fetchItems();
    }, []);

    const handleClick = () => {
        const userUpdate = {
            "masoTV": usersLength + 1,
            "hoTen": users.hoTen,
            "namSinh": users.namSinh,
            "tienSuBL": users.tienSuBL
        }

        fetch("http://127.0.0.1:8000/users/create/", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Origin": "http://localhost:3000"
            },  
            body: JSON.stringify(userUpdate)
        })
        setShow(true);
        setTimeout(() => {
            navigate("/");
        }, 2000)
    }

    const handleClose = () => {
        setShow(false);
        navigate("/");
    }
    const handleChangeName = (event) => {
        setUsers({hoTen: event.target.value, namSinh: users.namSinh, tienSuBL: users.tienSuBL})
    }
    
    const handleChangeDOB = (event) => {
        setUsers({hoTen: users.hoTen, namSinh: event.target.value, tienSuBL: users.tienSuBL})
    }

    const handleChangePathology = (event) => {
        setUsers({hoTen: users.hoTen, namSinh: users.namSinh, tienSuBL: event.target.value})
    }

    return (
        <Page>
            <Head>
                <Link to={"/"} style={{position:'absolute',left:'0'}}>
                    <Button>Back</Button>
                </Link>
                <h1 style={{marginTop:'40px'}}>Nhập thông tin thành viên</h1>
            </Head>
            <Form style={{display: 'flex', flexDirection: 'column', marginTop:'70px'}}>
                <Form.Group controlId="formName">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control type="text" value={users.hoTen} onChange={handleChangeName} />
                </Form.Group>
                <Form.Group controlId="formQuantity">
                    <Form.Label>Năm sinh</Form.Label>
                    <Form.Control type="date" value={users.namSinh} onChange={handleChangeDOB} />
                </Form.Group>
                <Form.Group controlId="formExp">
                    <Form.Label>Tiền sử bệnh lý</Form.Label>
                    <Form.Control type="text" value={users.tienSuBL} onChange={handleChangePathology}/>
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