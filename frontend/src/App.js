import React, { useEffect, useState } from 'react'
import './App.css';
import { useParams } from 'react-router-dom';

function App() {
  var { id } = useParams();
  id = Number(id);
  const [resp, setResp] = useState({items: [], imports: [], users: []});
  const fetchItems = async() => {
    const items = await (await fetch("http://127.0.0.1:8000/items")).json()
    const imports = await (await fetch("http://127.0.0.1:8000/imports")).json()
    const users = await (await fetch("http://127.0.0.1:8000/users")).json()
    setResp({items: items, imports: imports, users: users})
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
    console.log(id);
  }
  const handleRemove = (id) => {
    console.log(id);
  }
  return (
    <div>
      <div className="Navbar">
        <h1>TỦ THUỐC GIA ĐÌNH {id}</h1>
        <h3>Xin chào {userName} </h3>
      </div>
      <div className="itemsContainer">
        <table className="items">
          <tr>
            <th>Danh sách thuốc</th>
            <th>Số lượng còn lại</th>
          </tr>
          {resp.items.map((i) => (<tr><th>{i.tenTB}</th><th>{i.soLuong}</th><th><button onClick={() => handleAdd(i.masoTB)}>+</button></th><th><button onClick={() => handleRemove(i.masoTB)}>-</button></th></tr>))}
        </table>
      </div>
    </div>
  );
}

export default App;
