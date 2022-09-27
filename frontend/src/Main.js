import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Lists from './Lists';

export default function Main({data,setData}) {
  
  let size = data.length;
  // 1. useLocation 훅 취득
  let location = useLocation();
  // 2. location.state 에서 파라미터 취득
  let user = location.state;

  console.log(user);
  

  return (
    
    <div className={size===0?"bg-[#598A9E]/[0.43] h-screen":" bg-[url('./images/mainBg.png')] bg-contain bg-center min-h-[120rem]"}>
      <Header setData={setData} user={user}></Header>
      <Lists data={data} setData={setData} user={user}></Lists>
    </div>    
  )
}
