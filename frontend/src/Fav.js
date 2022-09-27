import {React, useState, useEffect} from 'react'
import axios from 'axios'
import Favlists from './Favlists'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Fav() {
  
  const [fav, setFav] =useState([]);
  // 1. useLocation 훅 취득
    const location = useLocation();
    // 2. location.state 에서 파라미터 취득
    let nowuser = location.state;
    console.log(nowuser);

    useEffect(() => {
      
      axios.get(`/movie?userId=${nowuser.userId}`)
      .then(function (response) {
        //  console.log(response.data);
         let favList = response.data;
         console.log(favList);
         setFav(favList);
        }).catch(function (error) {
          alert('Fail to Load');
        });
    },[nowuser]);
    
    const navigate = useNavigate();
    const btnHome = () => {
      navigate('/main',{
        state: nowuser 
      });
      window.location.reload();
    }
    return (
    <div class="bg-[#598A9E]/[0.43] min-h-screen ">
      <p className="mx-[30rem] px-[5rem] py-[1rem] bg-[url('./images/header.png')] bg-contain cursor-pointer text-[22pt] font-extrabold  text-[#FFD177] text-center bg-no-repeat bg-center" onClick={btnHome}>FavieList</p>
      <Favlists fav={fav} userId={nowuser.userId}></Favlists>
    </div>  
  )
}
