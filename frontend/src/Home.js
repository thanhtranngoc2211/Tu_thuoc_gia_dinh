import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GrNext } from 'react-icons/gr'
import mainLogo from './1.png'
import { Button, DropdownButton } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'

const Login = styled.h1`
    margin-bottom: 20vh;
`

const HomePage = styled.div`
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: #EBE645;
    background-size: cover;
    background-attachment: fixed; 
    font-family: 'Arial', sans-serif;
    font-size: 22px;
    font-weight: lighter;
    color: #577BC1;
`

const User = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LinkSubmit = styled(Link)`
    text-decoration: none;
`

const SubmitForm = styled.div`
    margin-top: 5vh;
    display: flex;

`


export default function Home() {
    const [userId, setUserId] = useState(1);
    const [users, setUsers] = useState([]);
    const handleChange =(e) => {
        setUserId(e)
    }

    const fetchItems = async() => {
        try {
          const users = await (await fetch("http://127.0.0.1:8000/users")).json()
          setUsers(users)
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(() => {
      fetchItems();
    }, []);

    return (
        <HomePage style={{ backgroundImage: `url(${mainLogo})`}}>
            <Login>TỦ THUỐC GIA ĐÌNH</Login>
            <User>
                <h2>Tên đăng nhập:</h2>
                <SubmitForm>
                    <DropdownButton title="Chọn người sử dụng" style={{marginLeft:"80px"}}>
                        {users.map((i) => (<DropdownItem onClick={() => handleChange(i.masoTV)}>{i.hoTen}</DropdownItem>))}
                    </DropdownButton>
                    <LinkSubmit to={`${userId}`}>
                        <Button variant="primary" style={{width:"5vw", height:"5.6vh", marginLeft:"30px"}}>
                            <GrNext color="white" />
                        </Button>
                    </LinkSubmit>
                </SubmitForm>
                <LinkSubmit to="/register" usersLength={users.length}>
                    <Button style={{marginTop:'20px'}}>Thêm thành viên</Button>
                </LinkSubmit>
            </User>
        </HomePage>
    )
}