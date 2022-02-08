import React, { useEffect, useState } from 'react'
import './App.css';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import mainLogo from './2.png';
import { FiSettings } from 'react-icons/fi';
import { Button } from 'react-bootstrap'

const Page = styled.div`
  display: flex;
  background-color: #EBE645;
  background-size: cover;
`

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Welcome = styled.div`
  display: flex;
  margin-left: 35vw;
`

const UserToggle = styled.div`
  background-color: #577BC1;
  height: 100vh;
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainInfo = styled.div`
  margin-top: 8vh;
  background-color: #577BC1;
  opacity: 80%;
  border-radius: 3%;
`

const Toggle = styled(Link)`
  color: black;
  margin-bottom: 3vh;
  margin-top: 2vw;
`

function App() {
  var { id } = useParams();
  id = Number(id);
  const [resp, setResp] = useState({items: [], imports: [], users: []});
  const fetchItems = async() => {
    try {
      const items = await (await fetch("http://127.0.0.1:8000/items")).json()
      const imports = await (await fetch("http://127.0.0.1:8000/imports")).json()
      const users = await (await fetch("http://127.0.0.1:8000/users")).json()
      setResp({items: items, imports: imports, users: users})
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchItems(); 
  });
  
  var userName = "Thanh";

  for (var i = 0 ; i < resp.users.length; i++) {
    if (resp.users[i].masoTV === id) {
      userName = resp.users[i].hoTen
    }
  }

  const handleAdd = async(id) => {
    const newImport = {
      "maPhieuNhap": resp.imports.length,
      "masoTB": id,
      "soluongNhap": 1,
      "hanSD": "2022-01-30T09:54:52.464Z",
      "ghiChu": null,
      "ngayNhap": "2022-01-30T09:54:52.464Z"
    }

    fetch("http://127.0.0.1:8000/create_import", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Origin": "http://localhost:3000"
      },  
      body: JSON.stringify(newImport)
    })
  }
  
  const handleRemove = (id) => {
    console.log(id);
  }
  return (
    <Page style={{ backgroundImage: `url(${mainLogo})` }}>
      <UserToggle>
        <FiSettings size={30} style={{marginTop:"2vh"}}/>
        <Toggle to={`/user_info/${id}`}>Thông tin người dùng</Toggle>
        <Toggle to={`/pills_info/${id}`}>Nhập thông tin thiết bị</Toggle>
        <Toggle to={`/import/${id}`}>Nhập thuốc</Toggle>
        <Toggle to={`/export/${id}`}>Xuất thuốc</Toggle>
        <Toggle to={`/order/${id}`}>Nhập đơn thuốc</Toggle>
        <Toggle to={`/message/${id}`}>Thông báo</Toggle>
        <Toggle to={'/'}>Đổi người dùng</Toggle>
      </UserToggle>
      <ItemInfo>
        <Welcome>
          <h1>Tủ thuốc</h1>
          <h5 style={{marginLeft:"15vw"}}>Xin chào {userName} </h5>
        </Welcome>
        <MainInfo>
          <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table style={{width: '50vw', opacity: "100%"}} className="table table-bordered table-striped mb-0">
              <tr>
                <th>Danh sách thuốc</th>
                <th>Số lượng còn lại</th>
              </tr>
              {resp.items.map((i) => (<tr><th>{i.tenTB}</th><th>{i.soLuong} {i.donViTinh}</th><th><Button style={{width:"30px"}} size="sm" onClick={() => handleAdd(i.masoTB)}>+</Button></th><th><Button style={{width:"30px"}} size="sm" onClick={() => handleRemove(i.masoTB)}>-</Button></th></tr>))}
            </table>
          </div>
        </MainInfo>
      </ItemInfo>
    </Page>
  );
}

export default App;
