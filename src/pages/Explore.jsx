import React from 'react'
import { Link } from 'react-router-dom'
import RentImage from '../assets/jpg/rentCategoryImage.jpg'
import SellImage from '../assets/jpg/sellCategoryImage.jpg'

function Explore() {
  return (
    <div>
      <p className='text-4xl font-extrabold'>Explore</p>
      {/* slider */}
      <div className='mt-12'>
        <p className='font-extrabold'>Catagories</p>
        <div className='mt-5 flex w-full gap-4 md:max-w-lg'>
          <Link to="/catagories/rent" className="flex-auto max-h-36 w-full hover:scale-105 duration-500">
            <img src={RentImage} alt="" className='rounded-2xl w-full h-full'/>
            <p className='mt-3 text-sm font-bold'>Place for rent</p>
          </Link>
          <Link to="/catagories/sale" className='flex-auto max-h-36 w-full hover:scale-105 duration-500'>
            <img src={SellImage} alt="" className='rounded-2xl w-full h-full'/>
            <p className='mt-3 text-sm font-bold'>Place for sale</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Explore