import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserInfo from '../src/components/UserInfo';
import UserInfoChange from './components/UserInfoChange';
import Pills from '../src/components/Pills';
import Import from '../src/components/Import';
import Export from '../src/components/Export';
import Order from '../src/components/Order';
import Message from '../src/components/Message';
import OrderSpec from './components/OrderSpec';
import Register from './components/Register';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user_info/:id" element={<UserInfo />} />
      <Route path="/user_info/update/:id" element={<UserInfoChange />} />
      <Route path="/pills_info/:id" element={<Pills />} />
      <Route path="/import/:id" element={<Import />} />
      <Route path="/export/:id" element={<Export />} />
      <Route path="/order/:id" element={<Order />} />
      <Route path="/message/:id" element={<Message />} />
      <Route path="/order/spec/:id" element={<OrderSpec />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
