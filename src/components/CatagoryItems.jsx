import React from 'react'
import {ReactComponent as BedIcon} from "../assets/svg/bedIcon.svg"
import {ReactComponent as BathIcon} from "../assets/svg/bathtubIcon.svg"
import { useNavigate } from 'react-router-dom'

function CatagoryItems({data, id}) {
  const navigate = useNavigate()
  return (
    <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate("/")}>
      <img src={data.imageUrls[0]} alt="house-img" className='w-44 h-36 rounded-3xl'/>
      <div>
        <p className='text-xs'>{data.location}</p>
        <p className='text-2xl font-extrabold -mt-1'>{data.name}</p>
        <p className='my-1 text-green-400 text-sm font-extrabold'>{`$${data.discountedPrice ? data.discountedPrice : data.regularPrice} ${data.type === "rent" ? "/ Month" : "" }`}</p>
        <div className='flex w-full justify-between items-center'>
          <BedIcon fill='#000000' />
          <p className='text-xs'>{`${data.bedrooms} bedrooms`}</p>
          <BathIcon />
          <p className='text-xs'>{`${data.bathrooms} bathrooms`}</p>
        </div>
      </div>
    </div>
  )
}

export default CatagoryItems