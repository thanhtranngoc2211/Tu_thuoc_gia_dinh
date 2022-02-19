import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import OrderSpecActivity from './OrderSpecActivity';
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

export default function OrderSpec() {

  var { id } = useParams();
  id = Number(id);

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}  
        className="UserInfoPage"
    >
          <Head>
              <Link to={`/order/${id}`} style={{position:'absolute',left:'0'}}>
                  <Button size="lg" variant="danger">Back</Button>
              </Link>
              <h1 style={{marginTop:'40px', color: '#FF2C2C', fontSize:'50px'}}>Đơn thuốc</h1>
          </Head>
          <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{height: '80vh'}}>   
            <OrderSpecActivity />
          </div>
      </motion.div>
  );
}