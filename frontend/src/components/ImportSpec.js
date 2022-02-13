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

export default function ImportSpec() {
    var { id } = useParams();
    id = Number(id);

    const [resp, setResp] = useState({items: [], imports: []});

    const fetchItems = async() => {
      try {
        const items = await (await fetch("http://127.0.0.1:8000/items")).json()
        const imports = await (await fetch("http://127.0.0.1:8000/imports")).json()
        setResp({items: items, imports: imports})
      } catch (error) {
        console.log(error)
      }
      }
      useEffect(() => {
        fetchItems();
      }, []);

      const items_load = new Array(0);
      for (var ite = 0; ite < resp.items.length; ite++) {
        items_load.push(resp.items[ite].tenTB)
      }

    return (
        <Page>
            <Head>
                <Link to={`/import/${id}`} style={{position:'absolute',left:'0'}}>
                    <Button size="lg" variant='danger'>Back</Button>
                </Link>
                <h1 style={{marginTop:'40px', fontSize:'50px'}}>Lịch sử nhập</h1>
            </Head>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table table-bordered table-striped mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên thiết bị</th>
                    <th scope="col">Số lượng nhập</th>
                    <th scope="col">Hạn sử dụng</th>
                    <th scope="col">Ngày nhập</th>
                  </tr>
                </thead>
                <tbody>
                  {resp.imports.map((i) => (
                    <tr>
                    <th scope="row">{i.maPhieuNhap}</th>
                    <td>{items_load[i.masoTB]}</td>
                    <td>{i.soluongNhap}</td>
                    <td>{i.hanSD}</td>
                    <td>{i.ngayNhap}</td>
                    </tr>)
                  )}    
                </tbody>
              </table>

            </div>
        </Page>
    );
}