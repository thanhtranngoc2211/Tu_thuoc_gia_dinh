import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion'

const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFEFEF;
    height: 100vh;   
    font-size: 20px;
`

const Head = styled.div`
    display: flex;
`

const ViewnoAdd = styled.div`
    display: flex;
`

export default function Order() {

    var { id } = useParams();
    id = Number(id);

    const [resp, setResp] = useState({items: [], orders: [], spec: []})
    const [pill, setPill] = useState({name: '', quantity: 0, pathology: null})
    const [show, setShow] = useState(false);
    const [add, setAdd] = useState(true);
    const [choose, setChoose] = useState(0);

    const fetchItems = async() => {
        try {
          const orders = await (await fetch("http://127.0.0.1:8000/orders")).json()
          const orders_spec = await (await fetch("http://127.0.0.1:8000/orders_spec")).json()
          const items = await (await fetch("http://127.0.0.1:8000/items")).json()
          setResp({items: items, orders: orders, spec: orders_spec})
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(() => {
      fetchItems();
    }, []);

    const handleChangeName = (event) => {
        setPill({name: event.target.value, quantity: pill.quantity, exportDate: pill.exportDate})
    }
    const handleChangeQuantity = (event) => {
        setPill({name: pill.name, quantity: event.target.value, exportDate: pill.exportDate})
    }
    const handleChangePathology= (event) => {
        setPill({name: pill.name, quantity: pill.quantity, pathology: event.target.value})
    }

    const handleClick = async() => {
        var date = new Date();

        const order_req = {
            "item": {
                "maDonThuoc" : resp.orders.length,
                "masoTV": id,
                "ngayTao": date,
            },
            "infor": {
                "maso": resp.spec.length,
                // Check ??
                "maDonThuoc": choose,
                // search masoTB NOT DONE
                "masoTB": pill.name,
                "lieuLuong": 0,
                "benhAn": null,
          }
        }
      
        await fetch("http://127.0.0.1:8000/create_order/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(order_req)
        })

        setShow(true)
    }

    const handleClose = () => setShow(false);

    const handleAdd = () => {
        setAdd(false);
    }

    const handleBack = () => {
        setAdd(true);
    }

    const handleChoose = (event) => {
        setChoose(event.target.value)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}  
            className="UserInfoPage"
        >
            <Head>
                {add 
                    ? <Link to={`/${id}`} style={{position:'absolute',left:'0'}}>
                        <Button size="lg" variant="danger">Back</Button>
                    </Link>
                    : <Button size="lg" variant="danger" onClick={handleBack} style={{position:'absolute',left:'0'}}>Back</Button>
                }
                
                <h1 style={{marginTop:'40px', fontSize:'50px', color: '#7386D5'}}>Nhập đơn thuốc</h1>
            </Head>
            {add
                    ? <ViewnoAdd>
                        <Button size="lg" variant="danger" onClick={handleAdd} style={{marginTop: '240px'}}>Tạo đơn thuốc mới</Button>
                        <Button size="lg" variant="danger" style={{marginTop: '240px', marginLeft: '30px'}}>
                            <Link style={{textDecoration:'none', color:'white'}} to={`/order/spec/${id}`}>Xem đơn thuốc</Link>
                        </Button>
                    </ViewnoAdd>
                    : null
            }
            {!add 
                ? <Form style={{display: 'flex', flexDirection: 'column', marginTop:'70px'}}>
                    <select title="Mã đơn thuốc" onChange={handleChoose}>
                        <option value="0" selected="selected">Đơn mới</option>
                        <option value="1">Đơn thuốc 1</option>                       
                    </select> 
                    <Form.Group controlId="formName">
                    <Form.Label>Tên thiết bị</Form.Label>
                        <Form.Control type="text" value={pill.name} onChange={handleChangeName} />
                    </Form.Group>                    
                    <Form.Group controlId="formQuantity">
                        <Form.Label>Liều lượng</Form.Label>
                        <Form.Control type="text" value={pill.quantity} onChange={handleChangeQuantity} />
                    </Form.Group>
                    <Form.Group controlId="formExp">
                        <Form.Label>Bệnh án</Form.Label>
                        <Form.Control type="text" value={pill.pathology}  onChange={handleChangePathology}/>
                    </Form.Group>
                    <Button onClick={handleClick} variant="outline-primary" style={{marginTop:'30px', width: '100%'}}>Chỉnh sửa</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Đã thêm thành công!</Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
            : null}
        </motion.div>
    );
}