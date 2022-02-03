import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Login = styled.h1`
    margin-top: 20vh;
    margin-bottom: 30vh;
`

const Submit = styled.button`
    background-color: cyan;
    height: 5vh;
    width: 6vw;
    border-radius: 8%;
    margin-top: 10vh;
`

const HomePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SelectUser = styled.select`
    width: 60vw;
    margin-bottom: 5vh;
    height: 5vh;
`

const LinkSubmit = styled(Link)`
    text-decoration: none;
`

export default function Home() {
    const [userId, setUserId] = useState(1);
    const handleChange =(event) => {
        setUserId(event.target.value)
    }
    return (
        <HomePage>
            <Login>Login</Login>
            <SelectUser onChange={handleChange} value={userId}>
                <option value="1">User_1</option>
                <option value="2">User_2</option>
            </SelectUser>
            <Submit>
                <LinkSubmit to={`${userId}`}>Login</LinkSubmit>
            </Submit>
        </HomePage>
    )
}