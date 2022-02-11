import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
 
const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #EBE645;
    height: 100vh;   
`

const Head = styled.div`
    display: flex;
`

export default function ImportSpec() {
    var { id } = useParams();
    id = Number(id);

    const [resp, setResp] = useState({items: [], imports: []});
    const import_load = new Array(0);

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

    return (
        <Page>
            <Head>
                <Link to={`/import/${id}`} style={{position:'absolute',left:'0'}}>
                    <Button>Back</Button>
                </Link>
                <h1 style={{marginTop:'40px'}}>Lịch sử nhập</h1>
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
                    <td>{i.masoTB}</td>
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