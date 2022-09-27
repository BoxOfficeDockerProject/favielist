import axios from 'axios';
import {React, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
    
    const [loginId,setLoginId]= useState('');
    const [loginPw,setLoginPw]= useState('');
    

    const navigate = useNavigate();

    //input handle
    const getloginId=(e)=>{
        setLoginId(e.target.value);
    }

    const getloginPw=(e)=>{
        setLoginPw(e.target.value);        
    }

    //onclick login button
    const btnLogin = () => {
        axios.get('/user/login', {
            params: { 
                userName : `${loginId}`,
                password : `${loginPw}`
            }  
        })
        .then(function (response) {
             let result = response.data;
             if(Object.keys(result).length === 0){
                alert('Does not exist..');
             }else{
                navigate('/main', 
                { state:result });
             }
        }).catch(function (error) {
            alert('Fail to Login');
            console.log(error);  
        });
    }
    
  return (
  <div className=" bg-[url('./images/loginBg.png')] bg-full bg-center w-full h-screen items-center justify-center ">
            <form className="py-[15rem] px-[20rem]" >
            <label className="block my-8">
                <input type='text' placeholder='ID'
                className="form-input block w-full py-3 rounded-md border-[#D9D9D9] shadow-m
                focus:border-[#64A2BD] focus:ring focus:ring-[#64A2BD] focus:ring-opacity-50 placeholder:font-medium"                
                onChange={getloginId}/>

            </label>
                    
            <label className="block my-8">
                <input type='password' placeholder='PW'
                className="form-input block w-full py-3 rounded-md border-[#D9D9D9] shadow-m
                focus:border-[#64A2BD] focus:ring focus:ring-[#64A2BD] focus:ring-opacity-50 placeholder:font-medium"
                onChange={getloginPw}/>
            </label>
            <button type="button"
                className="bg-[#FFD177] w-full rounded-md shadow-sm px-4 py-3
                text-white text-[18px] font-medium text-center"
                onClick={btnLogin}>
               Login
            </button>
          
            <Link to="/signup" className="no-underline">
                <p className="text-[#FFD177] text-[18px] underline font-medium text-center my-5">
                    Signup
                </p>
            </Link>
            
        </form>
    </div>
    
  )
}
