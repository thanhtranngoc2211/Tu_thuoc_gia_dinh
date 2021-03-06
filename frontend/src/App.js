import React, { useEffect, useState } from 'react'
import './App.css';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiSettings } from 'react-icons/fi';
import { Button } from 'react-bootstrap'
import image from './assets/1.jpg';
import { motion } from 'framer-motion';

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  right: 0;
`

const Welcome = styled.div`
  display: flex; 
`

const UserToggle = styled.div`
  background-color: #A0B6F5;
  height: 100vh;
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainInfo = styled.div`
  margin-top: 4vh;
  background-color: #A0B6F5;
  opacity: 80%;
  border-radius: 3%;
`

const Toggle = styled(Link)`
  color: black;
  margin-bottom: 5vh;
  margin-top: 2vw;
  text-decoration: none;
  font-size: 25px;
  &:hover {
    color: #FF2C2C;
    transition: 0.6s;
  }
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
    console.log(resp.exports.length)

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
    <motion.div 
      className="appPage" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}  
    >
      <UserToggle>
        <FiSettings size={30} style={{marginTop:"2vh"}}/>
        <Toggle to={`/user_info/${id}`}>Th??ng tin ng?????i d??ng</Toggle>
        <Toggle to={`/pills_info/${id}`}>Nh???p th??ng tin thi???t b???</Toggle>
        <Toggle to={`/import/${id}`}>Nh???p thu???c</Toggle>
        <Toggle to={`/export/${id}`}>Xu???t thu???c</Toggle>
        <Toggle to={`/order/${id}`}>Nh???p ????n thu???c</Toggle>
        <Toggle to={'/'}>?????i ng?????i d??ng</Toggle>
      </UserToggle>
      <ItemInfo>
        <Welcome>
          <h1 style={{fontSize: '50px'}}>T??? thu???c</h1>
          <h5 style={{position:'absolute', right: '20px', }}>Xin ch??o {userName} </h5>
        </Welcome>
        <MainInfo>
          <div class="table-wrapper-scroll-y my-custom-scrollbar" style={{height: '80vh'}}>
            <table style={{width: '61vw', opacity: "100%", border: "2px solid", borderCollapse: "collapse", fontSize:'20px'}} className="mb-0">
              <tr style={{border: "2px solid"}}>
                <th style={{border: "2px solid"}}>Danh s??ch thu???c</th>
                <th style={{border: "2px solid"}}>S??? l?????ng c??n l???i</th>
                <th style={{border: "2px solid"}}>H???n s??? d???ng</th>
                <th style={{border: "2px solid"}}>Ghi ch??</th>  
              </tr>
              {resp.items.map((i) => (<tr style={{border: "2px solid"}}><th style={{border: "2px solid"}}><p title={i.loaiTB}>{i.tenTB}</p></th><th style={{border: "2px solid"}}>{i.soLuong} {i.donViTinh}</th><th style={{border: "2px solid"}}>{i.hanSD}</th><th style={{border: "2px solid"}}>{i.ghiChu}</th><th></th><th><Button style={{width:"30px"}} size="sm" variant="danger" onClick={() => handleRemove(i.masoTB)}>-</Button></th></tr>))}
            </table>
          </div>
        </MainInfo>
      </ItemInfo>
    </motion.div>
  );
}

export default App;
