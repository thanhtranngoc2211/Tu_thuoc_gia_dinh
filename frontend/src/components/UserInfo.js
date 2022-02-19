import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link }  from 'react-router-dom';
import { motion } from 'framer-motion';

const Head = styled.div`
    display: flex;
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

    for (var i = 0 ; i < user.length; i++) {
        if (user[i].masoTV === id) {
          userName = user[i].hoTen
          dob = user[i].namSinh
          pathology = user[i].tienSuBL
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}  
            className="UserInfoPage"
        >
            <Head>
                <Link to={`/${id}`} style={{position:'absolute',left:'0'}}>
                    <Button size="lg" variant="danger">Back</Button>
                </Link>
                <h1 style={{marginTop:'40px'}}>Thông tin người dùng</h1>
            </Head>
            <Form style={{display: 'flex', flexDirection: 'column', marginTop:'70px'}}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" value={userName} readOnly/>
                </Form.Group>
                <Form.Group controlId="formDOB">
                    <Form.Label>Năm sinh</Form.Label>
                    <Form.Control type="date" value={dob} readOnly/>
                </Form.Group>
                <Form.Group controlId="formPathology">
                    <Form.Label>Bệnh lý</Form.Label>
                    <Form.Control type="text" value={pathology} readOnly/>
                </Form.Group>
                <Link to={`/user_info/update/${id}`}>
                    <Button variant="outline-primary" style={{marginTop:'30px', width: '100%'}}>Chỉnh sửa</Button>
                </Link>
            </Form>
        </motion.div>
    );
}