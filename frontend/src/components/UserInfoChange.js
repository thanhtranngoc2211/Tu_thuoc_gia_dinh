import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
 
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

export default function UserInfoChange() {

    var { id } = useParams();
    id = Number(id);
    let navigate = useNavigate();

    const [userName, setUserName] = useState('')
    const [dob, setDob] = useState('')
    const [pathology, setPathology] = useState('')
    const [show, setShow] = useState(false);
    
    const handleChangeUserName = (event) => {
        setUserName(event.target.value)
    }   

    const handleChangeDOB = (event) => {
        setDob(event.target.value)
    }   

    const handleChangePathology = (event) => {
        setPathology(event.target.value)
    }   

    const handleClick = async() => {
        const userUpdate = {
            "masoTV": id,
            "hoTen": userName,
            "namSinh": dob,
            "tienSuBL": pathology
        }

        fetch("http://127.0.0.1:8000/users/update/", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Origin": "http://localhost:3000"
            },  
            body: JSON.stringify(userUpdate)
        })
        setShow(true);
    }

    const handleDelete = async() => {
        const userId = {
            "masoTV": id,
        }
        
        await fetch("http://127.0.0.1:8000/users/delete/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userId)
        })
        setShow(true);
        setTimeout(() => {
            navigate("/")
        }, 2000)
    }

    const handleClose = () => {
        setShow(false);
        navigate("/")
    }

    return (
        <Page>
            <Head>
                <Link to={`/${id}`} style={{position:'absolute',left:'0'}}>
                    <Button>Back</Button>
                </Link>
                <h1>Thông tin người dùng</h1>
            </Head>
            <Form style={{display: 'flex', flexDirection: 'column'}}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" value={userName} onChange={handleChangeUserName}/>
                </Form.Group>
                <Form.Group controlId="formDOB">
                    <Form.Label>Năm sinh</Form.Label>
                    <Form.Control type="date" value={dob} onChange={handleChangeDOB}/>
                </Form.Group>
                <Form.Group controlId="formPathology">
                    <Form.Label>Bệnh lý</Form.Label>
                    <Form.Control type="text" value={pathology} onChange={handleChangePathology}/>
                </Form.Group>
                <Button variant="outline-primary" style={{marginTop:'30px'}} onClick={handleClick}>Chỉnh sửa</Button>
                <Button variant="danger" style={{marginTop:'20px'}} onClick={handleDelete}>Xóa thành viên</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Đã xử lý thành công!</Modal.Body>
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