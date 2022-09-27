import React from 'react'
import Favlist from './Favlist'

export default function Favlists({fav,userId}) {

  return (
    <div class="px-[10rem] pt-[15px] pb-[20px]">
        <ul >
          {
            fav.map((item)=>(
              <Favlist item={item} userId={userId}></Favlist>
            ))
          }
        </ul>
    </div>
    
    
  )
}
