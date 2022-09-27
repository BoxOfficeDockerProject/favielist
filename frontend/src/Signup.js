import axios from 'axios';
import {React, useState} from 'react'
import {Link} from 'react-router-dom'

export default function Signup() {
    const [id,setId]= useState('');
    const [pw,setPw]= useState('');
    const inputId=(e)=>{
        setId(e.target.value);
    }

    const inputPw=(e)=>{
        setPw(e.target.value);        
    }

    const btnSignup = () => {
        // alert(`{id:${id},pw:${pw}}`);
        axios.post('/user/signup', {
            userName : `${id}`,
            password : `${pw}`
        })
        .then(function (response) {
             console.log(response.data);  
        }).catch(function (error) {
            alert('Fail to Signup');
            console.log(error);  
        });
    }
  return (
    
    <div className=" bg-[url('./images/signupBg.png')] bg-full bg-center w-full h-screen items-center justify-center ">
        
        <form className="py-[250px] px-[350px]">
            <label className="block my-8">
                <input type='text' placeholder='ID'
                className="form-input block w-full py-3 rounded-md border-[#D9D9D9] shadow-m
                focus:border-[#64A2BD] focus:ring focus:ring-[#64A2BD] focus:ring-opacity-50 placeholder:font-medium"                
                onChange={inputId}/>

            </label>
                    
            <label className="block my-8">
                <input type='password' placeholder='PW'
                className="form-input block w-full py-3 rounded-md border-[#D9D9D9] shadow-m
                focus:border-[#64A2BD] focus:ring focus:ring-[#64A2BD] focus:ring-opacity-50 placeholder:font-medium"
                onChange={inputPw}/>
            </label>
            <Link to="/" className="no-underline">
                <button type="button" className="bg-[#FFD177] w-full rounded-md shadow-sm px-4 py-3
                text-white text-[18px] font-medium text-center"
                onClick={btnSignup}>
                Signup
            </button>
            </Link>
            
            
        </form>            
      
    </div>
  )
}
