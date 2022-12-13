import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CatagoryItems from '../components/CatagoryItems'
import { db } from '../firebase.config'

function Offers() {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState([])

    useEffect(() => {
        const fetchListings = async() => {
            const listingRef = collection(db, "listings")
            const q = query(listingRef, where('offer', "==", true), orderBy("timestamp", "desc"))
            const result = await getDocs(q)
            let listingMock = []
            result.forEach((item) => {
                // console.log(item.data())
                return listingMock.push({
                    id: item.id,
                    data: item.data()
                })
            })
            setListings(listingMock)
            setLoading(false)
        }

        fetchListings()
    }, [])

  return (
   <div>
    <p className='text-4xl font-extrabold mb-8'>Offers</p>
    {loading ? <h3> Loading...</h3> : listings.length === 0 ? <h3>No Offers Found</h3> : (
      <div>
          <div className='w-full flex flex-col gap-5'>
              {listings.map((item) => <CatagoryItems key={item.id} data={item.data} id={item.id}/> )}
          </div>
      </div>)}
   </div> 
  )
}


export default Offers