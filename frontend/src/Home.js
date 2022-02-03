import React, { useState } from 'react'
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

const SelectUser = styled.select`
    width: 30vw;
    height: 6vh;
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
    const handleChange =(event) => {
        setUserId(event)
    }
    return (
        <HomePage style={{ backgroundImage: `url(${mainLogo})`}}>
            <Login>TỦ THUỐC GIA ĐÌNH</Login>
            <User>
                <h2>Tên đăng nhập:</h2>
                <SubmitForm>
                    <DropdownButton title="Chọn người sử dụng" style={{marginLeft:"80px"}}>
                        <DropdownItem onClick={() => handleChange(1)}>Trần Ngọc Thành</DropdownItem>
                        <DropdownItem onClick={() => handleChange(2)}>Trần Mai Linh</DropdownItem>
                    </DropdownButton>
                    <LinkSubmit to={`${userId}`}>
                        <Button variant="primary" style={{width:"5vw", height:"5.6vh", marginLeft:"30px"}}>
                            <GrNext color="white" />
                        </Button>
                    </LinkSubmit>
                </SubmitForm>
            </User>
        </HomePage>
    )
}