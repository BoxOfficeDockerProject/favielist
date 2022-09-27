import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

export default function Header({setData, user}) {
  const [search,setSearch] = useState("");

  //input handle
  const inputSearch = (e) => {
    setSearch(`${e.target.value}`);
  }
  
  //submit search
  const handleSubmit = (e) => {
    e.preventDefault();
    nagivate('/main',{
      state: user }
      );
    
    axios.get(`/v1/search/movie.json?query=${search}`,{
      headers: {
        "X-Naver-Client-Id":"rkuFsJw7BejTzImF1dlV",
        "X-Naver-Client-Secret":"vjda43t2Pd"
      }
    }).then(function(response){
      console.log(response.data.items);
      let result=response.data.items
      let searchRes = result.map((item)=>{
        if (item.image === ""){
          return {
            "poster":"./images/profile_sample.png",
            "movieCd":item.link.slice(-6),
            "title":item.title.replace("<b>","").replace("</b>",""),
            "subtitle":item.subtitle,   
            "openDt":item.pubDate,
            "rating":item.userRating
          }
        }else{
          return {
            "poster":item.image,
            "movieCd":item.link.slice(-6),
            "title":item.title.replace("<b>","").replace("</b>",""),
            "subtitle":item.subtitle,   
            "openDt":item.pubDate,
            "rating":item.userRating,
            "audiAcc":0
          }
        }
       
      });
      console.log(searchRes);
      setData(searchRes);
  
    })
    
  };
  
  const nagivate = useNavigate();
  
  const btnHome = () => {
    nagivate('/main',{
      state: user 
    });
    window.location.reload();
  }
  const btnList = () => {
    nagivate('/favlist',{
      state: user 
    });
    window.location.reload();
  }

  return (
  <div className="flex flex-row px-[10rem] py-[15px]  items-center">
    <span className="cursor-pointer text-[22pt] font-extrabold w-fit text-[#FFD177]" onClick={btnHome}>FavieList</span>
    <div className="w-full">
      <form className="group relative mx-5" onSubmit={handleSubmit}>
        <svg width="20" height="20" className=" fill-[#D9D9D9] absolute left-2 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:fill-[#64A2BD]" aria-hidden="true">
          <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
        <input className="form-input inline-block
        py-2 pl-10 w-full
        rounded-md border-[#D9D9D9] shadow-m font-medium text-[#000000]
          focus:border-[#64A2BD] focus:ring focus:ring-[#64A2BD] focus:ring-opacity-50
          placeholder:font-medium placeholder:text-[#888888]"
          type="text" placeholder="Search"
          onChange={inputSearch}/>
           
        </form>
      </div>
      
      <span className="cursor-pointer text-[30pt] text-[#FF6F6F] font-medium w-fit" onClick={btnList}>♥︎</span>
      
    </div>
  )
}