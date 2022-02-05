import React, { useState } from 'react';
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

export default function OrderSpec() {

    var { id } = useParams();
    id = Number(id);

    const [pill, setPill] = useState({name: '', quantity: 0, exportDate: null})
    const [show, setShow] = useState(false);

    const handleChangeName = (event) => {
        setPill({name: event.target.value, quantity: pill.quantity, exportDate: pill.exportDate})
    }
    const handleChangeQuantity = (event) => {
        setPill({name: pill.name, quantity: event.target.value, exportDate: pill.exportDate})
    }
    const handleChangeExport= (event) => {
        setPill({name: pill.name, quantity: pill.quantity, exportDate: event.target.value})
    }

    const handleClick = () => {
        console.log(pill)
        setShow(true)
    }

    const handleClose = () => setShow(false);

    return (
        <Page>
            <Head>
                <Link to={`/order/${id}`} style={{position:'absolute',left:'0'}}>
                    <Button>Back</Button>
                </Link>
                <h1 style={{marginTop:'40px'}}>Đơn thuốc</h1>
            </Head>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table table-bordered table-striped mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>

            </div>
        </Page>
    );
}