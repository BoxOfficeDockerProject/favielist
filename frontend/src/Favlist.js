import React from 'react'
import Comments from './Comments'
import Form from './Form'
import axios from 'axios'
import default_Img from './images/error.png';
;
export default function Favlist({item,userId}) {
    const btnHeart = (movieSeq) => {
        alert(`${item.movieNm}가 관심 목록에서 삭제되었습니다!`);
        
        axios.delete(`/movie/`+item.movieSeq+`?userId=${userId}`).then(function(){
            window.location.reload();
        }).catch(function(error){
            window.location.reload();
        });
        
    }

    const onErrorImg = (e) => {
        e.target.src = default_Img;
      }
    
  return (
    <li class="px-7 py-5 mb-[25px] bg-[#ffffff] rounded-[14px]">
        <div class="flex">
            
            <img src={item.thumbnail} onError={onErrorImg} alt="Err" class=" mr-5 float-left w-[85px]"></img>
            <div class="w-full">
                <p class="font-extrabold w-full text-[15pt]">{item.movieNm}</p>
                <p class="font-medium text-[#888888] text-[12pt] mt-1">{`${item.openDt} 개봉`}</p>
                <div class="mt-1">
                    <span class="bg-[#ffffff] w-full rounded-md shadow-sm mr-2 px-[5px]
            text-[#888888] ring-[#FF6F6F]/[0.4] ring-[2px] text-[12px] font-medium align-middle">All</span>
                    <span class="text-[#FFD177] text-[16pt] align-middle">★</span>
                    <span class="font-medium text-[14pt] align-middle">{item.rating}</span>
                </div>
            </div>

            <div>
                <p class="cursor-pointer text-[#FF6F6F] text-[20pt]" onClick={()=>btnHeart(item)}>♥︎</p>
            </div>
            
        </div>
        <Comments item={item}></Comments>
        <Form userId={userId} item={item}></Form>
    </li>
  )
}
