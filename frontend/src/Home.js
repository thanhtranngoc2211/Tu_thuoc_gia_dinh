import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { GrNext } from 'react-icons/gr'
import { Button, DropdownButton } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import toast, { Toaster } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'

const Login = styled.h1`
    margin-bottom: 10vh;
`

const User = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonGo = styled(Button)`
    width: 60px;
    margin-left: 20px;    
`

const LinkSubmit = styled(Link)`
    text-decoration: none;
`

const SubmitForm = styled.div`
    margin-top: 5vh;
    display: flex;

`

const Footer = styled.footer`
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 15px;
`


export default function Home() {
    const [userId, setUserId] = useState(1);
    const [users, setUsers] = useState([]);
    const handleChange =(e) => {
        setUserId(e)
    }

    let navigate = useNavigate();
    const notify = () => toast.success('Successfully login!');

    const handleGo = (user_id) => {
        notify();
        setTimeout(() => {
            navigate(`/${user_id}`)
        }, 1000)
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}    
            className="homePage"
        >
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
            <Login>TỦ THUỐC GIA ĐÌNH</Login>
            <User>
                <h2>Tên đăng nhập:</h2>
                <SubmitForm>
                    <DropdownButton title="Chọn người sử dụng" size="lg" style={{marginLeft:"80px"}}>
                        {users.map((i) => (<DropdownItem onClick={() => handleChange(i.masoTV)}>{i.hoTen}</DropdownItem>))}
                    </DropdownButton>
                    <ButtonGo onClick={() => handleGo(userId)}><GrNext /></ButtonGo>
                </SubmitForm>
                <LinkSubmit to="/register" usersLength={users.length}>
                    <Button style={{marginTop:'20px'}}>Thêm thành viên</Button>
                </LinkSubmit>
            </User>
            <Footer>Nhóm 15 Kĩ thuật phần mềm ứng dụng</Footer>
        </motion.div>
    )
}