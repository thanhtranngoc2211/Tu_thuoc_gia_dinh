import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Modal, DropdownButton } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { motion } from 'framer-motion'

const Head = styled.div`
    display: flex;
`

export default function Export() {

    var { id } = useParams();
    id = Number(id);

    const [pill, setPill] = useState({masoTB: -1, quantity: 0})
    const [show, setShow] = useState(false);
    const [resp, setResp] = useState({items: [], exports: []});
    const fetchItems = async() => {
        try {
          const items = await (await fetch("http://127.0.0.1:8000/items")).json()
          const exports = await (await fetch("http://127.0.0.1:8000/exports")).json()
          setResp({items: items, exports: exports})
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(() => {
      fetchItems();
    }, []);

    const handleChangeQuantity = (event) => {
        setPill({masoTB: pill.masoTB, quantity: event.target.value})
    }

    const handleClick = async() => {
        var dateExport = new Date();
        console.log(resp.exports.length)

        const export_req = {
            "maPhieuXuat": resp.exports.length,
            "masoTV": id,
            "masoTB": pill.masoTB,
            "soluongXuat": pill.quantity,
            "ngayXuat": dateExport,
          }
      
          await fetch("http://127.0.0.1:8000/create_export", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(export_req)
          })
        setShow(true)
        setPill({masoTB: -1, quantity: 0})
    }

    const handleClose = () => setShow(false);

    const handleChangePill = (id) => {
        setPill({masoTB: id, quantity: pill.quantity})
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
                <h1 style={{marginTop:'40px', fontSize:'60px'}}>Xu???t thu???c</h1>
                <Link to={`/exports_spec/${id}`} style={{position:'absolute', right: '0'}}>
                    <Button size="lg" variant="danger">L???ch s??? xu???t</Button>
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
                <Button onClick={handleClick} variant="outline-primary" style={{marginTop:'30px', width: '100%'}}>Ch???nh s???a</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>???? xu???t th??nh c??ng!</Modal.Body>
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