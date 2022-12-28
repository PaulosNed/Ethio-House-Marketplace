import { doc, getDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase.config'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ListingDetails() {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [userLoading, setUserLoading] = useState(true)
    const [listing, setListing] = useState({})
    const [showContact, setShowContact] = useState(false)
    const [landlord, setLandlord] = useState({})
    const [message, setMessage] = useState("")
    
    useEffect(()=>{
        const fetchListing = async() => {
            const listingSnap = await getDoc(doc(db, "listings", params.listingId))
            setListing(listingSnap.data())
            setLoading(false)
        }
        fetchListing()
    }, [params.listingId])
    
    const contactLandlord = async() => {
        setShowContact((prev)=> !prev)
        try {
            const userRef = await getDoc(doc(db, "users", listing.userRef))
            setLandlord(userRef.data())
            setUserLoading(false)
        } catch (error) {
            
        }
    }
    const handleChange = (e) => {
        setMessage(e.target.value)
    }


  return loading ? <h1>Loading...</h1> : (
    <div className=''>
        {/* <Swiper slidesPerView={1} pagination={{clickable: true}}>
            {listing.imageUrls.map((item, index) =>  (
                    <SwiperSlide key={index}>
                        <img src={item} alt="HouseImg" className='w-full md:max-w-3xl md:mx-auto md:h-96 rounded-xl '/>
                    </SwiperSlide>
                    )
                )
            }
        </Swiper> */}

        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        >
            {listing.imageUrls.map((item, index) =>  (
                    <SwiperSlide key={index}>
                        <img src={item} alt="HouseImg" className='w-full md:max-w-3xl md:mx-auto h-72 md:h-96 rounded-xl '/>
                    </SwiperSlide>
                    )
                )
            }
        </Swiper>

        <div className='flex flex-col md:mx-10 mt-10'>
            <p className='font-extrabold text-2xl'>{`${listing.name} - $${listing.offer ? listing.discountedPrice : listing.discountedPrice} ${listing.type==="rent"?"/Month" : ""}`}</p>
            <p className='font-extrabold'>{listing.location}</p>
            <div className='my-3 flex gap-3'>
                <div className='bg-green-400 text-white rounded-full px-3 py-1 text-sm capitalize'>{`for ${listing.type}`}</div>
                {listing.offer && <div className='bg-black text-white rounded-full px-3 py-1 text-sm'>{`$${listing.regularPrice - listing.discountedPrice} discount`}</div>}
            </div>
            <p className='capitalize'>{`${listing.bedrooms} bedrooms`}</p>
            <p className='capitalize'>{`${listing.bathrooms} bathrooms`}</p>
            {listing.parking && <p className='capitalize'>Parking spot</p>}
            {listing.furnished && <p className='capitalize'>furnished</p>}
        </div>
        <div className='md:mx-4 mt-7'>
            <button className='md:mx-auto bg-black text-white py-1 px-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl duration-200' onClick={contactLandlord}>{showContact ? "Hide info" : "Contact info"}</button>
        </div>
        <div className='md:mx-10 mt-5 duration-500'>    
            {showContact && userLoading && <p>Loading...</p>}
            {showContact && !userLoading && (
                <div >
                    <p className='font-extrabold text-2xl'>{`Contact ${landlord.name}`}</p>
                    <div className='my-4'>
                        <label htmlFor="" className='block'>Message</label>
                        <textarea rows="8" className='my-1 w-full md:w-1/2' value={message} onChange={handleChange}></textarea>
                    </div>
                    <a href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`} className='w-full mx-4 mt-7'>
                        <button className='w-52 md:max-w-lg mx-auto bg-green-400 text-white py-2 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl duration-200'>Contact Landlord</button>
                    </a>
                </div>
            )}
        </div>
    </div>
  )
}

export default ListingDetails