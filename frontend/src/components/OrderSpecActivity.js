import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
 
const Page = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 30px;
`

const Pills = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const Nav = styled.div`
  display: flex;
  justify-content: space-between
`

export default function OrderSpecActivity() {
  
  const [current_id, setCurrentId]  = useState(0);
  const [resp, setResp] = useState({orders: [], items: [], spec: [], user: []})
  
  

  useEffect(() => {
    const fetchItems = async() => {
      const orders_spec_req = {
        "id_donThuoc": current_id,
      }
      try {
        const orders = await (await fetch("http://127.0.0.1:8000/orders")).json()
        const items = await (await fetch("http://127.0.0.1:8000/items")).json()
        const users = await (await fetch("http://127.0.0.1:8000/users")).json()
        const orders_spec = await (await fetch("http://127.0.0.1:8000/orders_spec_id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orders_spec_req)
        })).json()
        setResp({orders: orders, items: items, spec: orders_spec, user: users})
      } catch (error) {
        console.log(error)
      }
    };
    fetchItems();
  }, [current_id]);

  console.log(resp.user)

  const items_load = new Array(0);
  for (var i = 0; i < resp.items.length; i++){
    items_load.push(resp.items[i].tenTB);
  }

  const orders_load = new Array(0);
  for (i = 0; i < resp.orders.length; i++) {
    orders_load.push(resp.orders[i].maDonThuoc)
  }

  const orders_user_load = new Array(0);
  for (i = 0; i < resp.orders.length; i++) {
    orders_user_load.push(resp.orders[i].masoTV)
  }

  const userName_load = new Array(0);
  for (i = 0; i < resp.user.length; i++) {
    userName_load.push(resp.user[i].hoTen)
  }

  const handleNext = async() => {
    if (current_id === orders_load.length-1) return;
    setCurrentId(current_id+1);
  }

  const handleBack = () => {
    if (current_id === 0) return
    setCurrentId(current_id-1);
  }

  return (
      <Page>
        <Nav>
          <Button size="lg" variant="danger" onClick={handleBack}>Back</Button>
          <h3>Đơn thuốc {current_id}</h3>
          <Button size="lg" variant="danger" onClick={handleNext}>Next</Button>
        </Nav>
        <Pills>
          Người dùng: {userName_load[orders_user_load[current_id]-1]}
        </Pills>
        <Pills>
          Bệnh án: {resp.spec.map((i) => (<>{i.benhAn}</>))}    
        </Pills>
        <div className="table-wrapper-scroll-y my-custom-scrollbar" >
            <table className="table table-bordered" style={{color: 'white'}}>
              <thead>
                <tr>
                  <th scope="col">Tên thiết bị</th>
                  <th scope="col">Liều lượng</th>
                </tr>
              </thead>
              <tbody>
                {resp.spec.map((i) => (
                  <tr>
                  <td>{items_load[i.masoTB]}</td>
                  <td>{i.lieuLuong}</td>
                  </tr>)
                )}    
              </tbody>
            </table>
          </div>
      </Page>
  );
}