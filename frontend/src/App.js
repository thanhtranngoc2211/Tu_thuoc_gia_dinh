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
      const exports = await (await fetch("http://127.0.0.1:8000/exports")).json()
      setResp({items: items, imports: imports, users: users, exports: exports})
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchItems();
  });
  
  var userName = "Thanh";
  var user_id = 0;

  for (var i = 0 ; i < resp.users.length; i++) {
    if (resp.users[i].masoTV === id) {
      userName = resp.users[i].hoTen;
      user_id = i;
    }
  }

  //Define expiry date for pills
  const dates = new Array(resp.items.length);
  const expireD = [];
  for (var j = 0; j < dates.length; j++) {
    dates[j] = new Array(1);
  }
  for (var ite = 0; ite < resp.imports.length; ite++) {
    dates[resp.imports[ite].masoTB].push(resp.imports[ite].hanSD)
  }
  for (var iter = 0; iter < resp.items.length; iter++) {
    for (var itera = 0; itera < dates[iter]; itera++) {
      var minTemp = new Date(dates[iter][0]);
      if (minTemp > dates[iter][itera]) {
        minTemp = dates[iter][itera]
      }
      minTemp = expireD[iter];
    }
  }

  const handleRemove = async(id) => {
    const export_req = {
      "maPhieuXuat": resp.exports.length,
      "masoTV": resp.users[user_id].masoTV,
      "masoTB": id,
      "soluongXuat": 1,
      "ngayXuat": "2022-01-30T09:54:52.464Z"
    }

    await fetch("http://127.0.0.1:8000/create_export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(export_req)
    })

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
            <table style={{width: '50vw', opacity: "100%"}} className="table-bordered mb-0">
              <tr>
                <th>Danh sách thuốc</th>
                <th>Số lượng còn lại</th>
                <th>Hạn sử dụng</th>
                <th>Ghi chú</th>  
              </tr>
              {resp.items.map((i) => (<tr><th>{i.tenTB}</th><th>{i.soLuong} {i.donViTinh}</th><th>{i.hanSD}</th><th>{i.ghiChu}</th><th></th><th><Button style={{width:"30px"}} size="sm" onClick={() => handleRemove(i.masoTB)}>-</Button></th></tr>))}
            </table>
          </div>
        </MainInfo>
      </ItemInfo>
    </Page>
  );
}

export default App;
