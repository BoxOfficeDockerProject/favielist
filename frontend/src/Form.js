import {React, useState} from 'react'
import axios from 'axios';
export default function Form({userId,item }) {

    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState("");
    
    const inputComment = (e) => {
        setComment(e.target.value);
    }
    
    const btnStar = (e) =>{
        //console.log(e.target.value);
        setRating(e.target.value);
    }
    
    const btnReply = (e) =>{
        console.log(userId);
        console.log(rating);
        console.log(comment);
        console.log(item.movieSeq);
        if(rating===0||comment.length===0){
            alert('별점 혹은 한줄평은 반드시 입력해주세요~')
        }else{
            axios.put('/movie/'+item.movieSeq+`?userId=${userId}`,{
                movieCd: `${item.movieCd}`,
                movieNm: `${item.movieNm}`,
                openDt: `${item.openDt}`,
                audiAcc: `${item.audiAcc}`,
                thumbnail: `${item.thumbnail}`,
                rating: `${item.rating}`,
                comment: `${comment}`,
                userRating: `${rating}`
        }).then(function (response) {
            window.location.reload();
        }).catch(function (error) {
            alert('다시 입력해주세요..');
        });
        }
        
    }
    const handleComment = (e) => {
        e.preventDefault();
        console.log(userId);
        console.log(rating);
        console.log(comment);
        console.log(item.movieSeq);
        if(rating===0||comment.length===0){
            alert('별점 혹은 한줄평은 반드시 입력해주세요~')
        }else{
            axios.put('/movie/'+item.movieSeq+`?userId=${userId}`,{
                movieCd: `${item.movieCd}`,
                movieNm: `${item.movieNm}`,
                openDt: `${item.openDt}`,
                audiAcc: `${item.audiAcc}`,
                thumbnail: `${item.thumbnail}`,
                rating: `${item.rating}`,
                comment: `${comment}`,
                userRating: `${rating}`
        }).then(function (response) {
            window.location.reload();
        }).catch(function (error) {
            alert('다시 입력해주세요..');
        });
        }
    }

    return (
    <div>
        <form class="group relative w-full" onSubmit={handleComment}>
            <div class="star-rating" id={item.movieCd}>
                <input type="radio" id={`5-${item.movieCd}`} name="rating" value="5" onChange={btnStar}/>
                <label for={`5-${item.movieCd}`} class="star" >&#9733;</label>
                <input type="radio" id={`4-${item.movieCd}`} name="rating" value="4" onChange={btnStar}/>
                <label for={`4-${item.movieCd}`} class="star">&#9733;</label>
                <input type="radio" id={`3-${item.movieCd}`} name="rating" value="3" onChange={btnStar}/>
                <label for={`3-${item.movieCd}`} class="star">&#9733;</label>
                <input type="radio" id={`2-${item.movieCd}`} name="rating" value="2" onChange={btnStar}/>
                <label for={`2-${item.movieCd}`} class="star">&#9733;</label>
                <input type="radio" id={`1-${item.movieCd}`} name="rating" value="1" onChange={btnStar}/>
                <label for={`1-${item.movieCd}`} class="star">&#9733;</label>
            </div>
            
            <div class="flex items-center justify-between">
            
                <input type='text' placeholder='한줄평을 입력해주세요'
                className="form-input w-full rounded-md border-[#D9D9D9] shadow-m
                font-medium text-[#000000] placeholder:font-medium placeholder:text-[#888888]
                focus:border-[#64A2BD] focus:ring focus:ring-[#64A2BD] focus:ring-opacity-50"
                onChange={inputComment}/>
                <button type="button"
                className="form-input hover:bg-[#598A9E] rounded-md bg-[#64A2BD] border-[#64A2BD] 
                text-white text-sm font-medium align-center ml-2 py-2.5 px-3 shadow-m"
                onClick={btnReply}>
                Reply
            </button>
            </div>     
        </form>         
    </div>
  )
}
