import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
 
const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Head = styled.div`
    display: flex;
`

export default function UserInfoChange() {

    var { id } = useParams();
    id = Number(id);

    const [userName, setUserName] = useState('')
    const [dob, setDob] = useState('')
    const [pathology, setPathology] = useState('')
    
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
        console.log("Ok")
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
            </Form>
        </Page>
    );
}