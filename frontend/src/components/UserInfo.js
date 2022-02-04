import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
 
const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function UserInfo() {

    var { id } = useParams();
    id = Number(id);
    const [user, setUser] = useState([]);
    const fetchUser = async() => {
        const users = await (await fetch("http://127.0.0.1:8000/users")).json()
        setUser(users)
    }
    useEffect(() => {
        fetchUser();
    }, [])

    var userName = 'NaN'
    var dob = '2000-11-22'
    var pathology = 'NaN'

    console.log(user[1])

    for (var i = 0 ; i < user.length; i++) {
        if (user[i].masoTV === id) {
          userName = user[i].hoTen
          dob = user[i].namSinh
          pathology = user[i].tienSuBL
        }
    }
    
    const handleChange = () => {

    }

    return (
        <Page>
            <h1>Thông tin người dùng</h1>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" value={userName} onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="formDOB">
                    <Form.Label>Năm sinh</Form.Label>
                    <Form.Control type="date" value={dob} />
                </Form.Group>
                <Form.Group controlId="formPathology">
                    <Form.Label>Bệnh lý</Form.Label>
                    <Form.Control type="text" value={pathology} />
                </Form.Group>
            </Form>
        </Page>
    );
}