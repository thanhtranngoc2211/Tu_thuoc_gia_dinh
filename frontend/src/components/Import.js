import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Button, Form, Modal, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { motion } from 'framer-motion';

const Head = styled.div`
    display: flex;
`

export default function Import() {

    var { id } = useParams();
    id = Number(id);

    const [pill, setPill] = useState({masoTB: -1, name: '', quantity: 0, expiryDate: null, importDate: ''})
    const [show, setShow] = useState(false);
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

    const handleChangeQuantity = (event) => {
        setPill({masoTB: pill.masoTB, name: pill.name, quantity: event.target.value, expiryDate: pill.expiryDate, importDate: pill.importDate})
    }
    const handleChangeExp = (event) => {
        setPill({masoTB: pill.masoTB, name: pill.name, quantity: pill.quantity, expiryDate: event.target.value, importDate: pill.importDate})
    }

    const handleClick = async() => {
        var dateImport = new Date();
    
        const import_req = {
            "maPhieuNhap": resp.imports.length,
            "masoTB": pill.masoTB,
            "soluongNhap": pill.quantity,
            "hanSD": pill.expiryDate,
            "ghiChu": pill.note,
            "ngayNhap": dateImport,
          }
      
        await fetch("http://127.0.0.1:8000/create_import/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(import_req)
        })
        setShow(true);
    }

    const handleClose = () => setShow(false);

    const handleChangePill = (id) => {
        setPill({masoTB: id, name: pill.name, quantity: pill.quantity, expiryDate: pill.expiryDate, importDate: pill.importDate})
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}  
        className="UserInfoPage"
      >
            <Head>
                <Link to={`/${id}`} style={{position:'absolute',left:'0'}}>
                    <Button size="lg" variant="danger">Back</Button>
                </Link>
                <h1 style={{marginTop:'40px', fontSize:'60px'}}>Nh???p thu???c</h1>
                <Link to={`/imports_spec/${id}`} style={{position:'absolute', right: '0'}}>
                    <Button size="lg" variant="danger">L???ch s??? nh???p</Button>
                </Link>
            </Head>
            <Form style={{display: 'flex', flexDirection: 'column', marginTop:'70px'}}>
                <DropdownButton title="T??n thi???t b???">
                    {resp.items.map((i) => (<DropdownItem onClick={() => handleChangePill(i.masoTB)}>{i.tenTB}</DropdownItem>))}
                </DropdownButton>
                <Form.Group controlId="formQuantity" style={{marginTop:'20px'}}>
                    <Form.Label>S??? l?????ng</Form.Label>
                    <Form.Control type="text" value={pill.quantity} onChange={handleChangeQuantity} />
                </Form.Group>
                <Form.Group controlId="formExp">
                    <Form.Label>H???n s??? d???ng</Form.Label>
                    <Form.Control type="date" value={pill.expiryDate}  onChange={handleChangeExp}/>
                </Form.Group>
                <Button onClick={handleClick} variant="outline-primary" style={{marginTop:'30px', width: '100%'}}>Th??m</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>???? th??m th??nh c??ng!</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </motion.div>
    );
}