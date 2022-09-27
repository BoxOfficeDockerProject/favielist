import React from 'react'

export default function Comments({item}) {
  return (
    <div>
        <div className="flex items-center mt-3">
        <p className="font-[450] text-[16px] text-bold align-center">{item.comment}</p>
    </div>
    <div className="mt-1 ">
            <span className="bg-[#FF6F6F]/[0.4] w-full rounded-md shadow-sm mr-2 px-[5px]
            text-[#ffffff] ring-[#FF6F6F]/[0.4] ring-[2px] text-[12px] font-bold align-middle">My</span>
            <span class="font-bold text-[#FFD177] text-[14pt] align-middle">★</span>
            <span class="font-bold text-[12pt] align-middle">{item.userRating}</span>
        </div>
    </div>
  )
}
