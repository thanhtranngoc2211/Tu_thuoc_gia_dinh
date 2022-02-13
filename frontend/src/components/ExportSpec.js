import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
 
const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFEFEF;
  height: 100vh;   
  color: #FF2C2C;
  font-size: 20px;  
`

const Head = styled.div`
    display: flex;
`

export default function ExportSpec() {
    var { id } = useParams();
    id = Number(id)

    const [resp, setResp] = useState({items: [], exports: [], users: []});
    const items_load = new Array(0);
    const users_load = new Array(0);

    const fetchItems = async() => {
      try {
        const items = await (await fetch("http://127.0.0.1:8000/items")).json()
        const exports = await (await fetch("http://127.0.0.1:8000/exports")).json()
        const users = await (await fetch("http://127.0.0.1:8000/users")).json() 
        setResp({items: items, exports: exports, users: users})
      } catch (error) {
        console.log(error)
      }
      }
      useEffect(() => {
        fetchItems();
      }, []);

      for (var ite = 0; ite < resp.items.length; ite++) {
        items_load.push(resp.items[ite].tenTB)
      }

      for (var j = 0; j < resp.users.length; j++) {
        users_load.push(resp.users[j].hoTen)
      }

      console.log(users_load)

    return (
      <Page>
        <Head>
            <Link to={`/export/${id}`} style={{position:'absolute',left:'0'}}>
                <Button size="lg" variant='danger'>Back</Button>
            </Link>
            <h1 style={{marginTop:'40px', fontSize:'50px'}}>Lịch sử xuất</h1>
        </Head>
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
          <table className="table table-bordered table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên thiết bị</th>
                <th scope="col">Thành viên</th>
                <th scope="col">Số lượng xuất</th>
                <th scope="col">Ngày xuất</th>
              </tr>
            </thead>
            <tbody>
              {resp.exports.map((i) => (
                <tr>
                <th scope="row">{i.maPhieuXuat}</th>
                <td>{items_load[i.masoTB]}</td>
                <td>{users_load[i.masoTV - 1]}</td>
                <td>{i.soluongXuat}</td>
                <td>{i.ngayXuat}</td>
                </tr>)
              )}    
            </tbody>
          </table>

        </div>
  </Page>
    );
}