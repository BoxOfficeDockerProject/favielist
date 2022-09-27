import './App.css';
import { useState, React  } from 'react';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import Fav from './Fav';
import {Routes,Route } from 'react-router-dom';

function App() {
  const[data,setData]=useState([]);
  return (

    <Routes>
      
      <Route path="/" element={<Login/>}/>
      <Route path="/main" element={<Main data={data} setData={setData}/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/favlist" element={<Fav/>} />
      
    </Routes>

  );
}

export default App;