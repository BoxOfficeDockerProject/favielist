import { useEffect, React } from 'react';
import axios from'axios';
import default_Img from './images/error.png';

export default function Lists({data,setData,user}) {
    
    const KEY = 'ac733e4361119585d5f69a529226d016';
    var today = new Date();
    var yesterday = new Date(today.setDate(today.getDate() - 7));
    let targetDT = yesterday.getFullYear()+(yesterday.getMonth()+1).toString().padStart(2,0)+(yesterday.getDate()).toString().padStart(2,0);
    
    const btnHeart = (item) => {
       
        //console.log(item);
        axios.post(`/movie?userId=${user.userId}`, {
            movieCd:`${item.movieCd}`,
            movieNm: `${item.title}`,
            openDt : `${item.openDt}`,
            audiAcc : `${item.audiAcc}`,
            thumbnail : `${item.poster}`,
            rating : `${item.rating}`,
            comment : "",
            userRating : 0
        })
        .then(function (response) {
             console.log(response);
             alert(`${item.title} 가 관심 영화에 등록되었습니다!`);
        }).catch(function (error) {
            alert("이미 보관 중인 영화입니다!");
        });
    }

    useEffect(() => {
        const getMovies = async(movie) => {
            const json = await (
                await fetch(`/v1/search/movie.json?query=${movie.movieNm}`, {
                    method: 'GET',
                    headers: {
                        "X-Naver-Client-Id":"rkuFsJw7BejTzImF1dlV",
                        "X-Naver-Client-Secret":"vjda43t2Pd"
                    }
                })
            ).json();
            return {
                "rank":movie.rank,
                "poster":json.items[0].image,
                "movieCd":movie.movieCd,
                "title":movie.movieNm,
                "subtitle":json.items[0].subtitle,   
                "openDt":movie.openDt.replaceAll("-","."),
                "audiAcc":movie.audiAcc,
                "rating":json.items[0].userRating,
                "like":false   
            }
        }
        const getBoxOffice = async() => {
            const response = await(await (
                await fetch(
                    `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KEY}&targetDt=${targetDT}`
                )
            ).json()).boxOfficeResult.dailyBoxOfficeList;
            const boxOffice = response.map((movie) => getMovies(movie));
            
            await Promise.all(boxOffice).then((result) => {
                //console.log(result);
                setData(result);
            });
        }
        getBoxOffice();
    }, [targetDT, setData]);

    const onErrorImg = (e) => {
        e.target.src = default_Img;
      }
    

    return (
    <div className="px-[10rem] pt-[5px] pb-[20px]">
        <ul>
            {data.map((item)=>(
            <li className="px-8 py-5 mb-[25px] bg-[#ffffff] rounded-[14px]">
            <div className="flex" id={item.movieCd}>
                <img src={item.poster} onError={onErrorImg} alt="" className="mr-5 float-left"></img>
                <div className="w-full">
                    <p className="font-extrabold w-full text-[15pt]">{item.title}</p>
                    <p className="font-medium w-full text-[13pt]">{item.subtitle}</p>
                    <p className="font-medium text-[#888888] text-[12pt] mt-1">{`${item.openDt} 개봉`}</p>
                    
                    
                    {
                        Number(item.audiAcc) === 0 ||isNaN(item.audiAcc)
                        ?<p></p>
                        :<div>
                        <svg width="20" height="20" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle mx-[0px]">
                            <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" fill="#888888"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 15.5C16 12.309 13.314 10 10 10C6.686 10 4 12.309 4 15.5L4.002 17C4.002 17.2652 4.10736 17.5196 4.29489 17.7071C4.48243 17.8946 4.73678 18 5.002 18H15C15.2652 18 15.5196 17.8946 15.7071 17.7071C15.8946 17.5196 16 17.2652 16 17V15.5Z" fill="#888888"/>
                        </svg>
                        <span className="font-medium text-[#888888] text-[12pt] mt-1 align-middle">
                        {`${Number(item.audiAcc).toLocaleString('ko-KR')}`}</span>
                        </div>
                    }
                    <div className="mt-1">
                        <span className="text-[#FFD177] text-[16pt]">★</span>
                        <span className="font-bold text-[14pt]"> {item.rating}</span>
                    </div>
                </div>
                <div >
                <p className="cursor-pointer bg-[#ffffff] w-full rounded-md shadow-sm px-4 py-1
            text-black ring-[#FF6F6F]/[0.4] ring-[2px] text-[15px] font-medium text-center"
            onClick={()=>btnHeart(item)}>
                Add
            </p>
                </div>
            </div>
        </li>
            ))}
        </ul>
    </div>
    )
}
