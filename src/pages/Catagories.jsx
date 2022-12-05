import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CatagoryItems from '../components/CatagoryItems'
import { db } from '../firebase.config'

function Catagories() {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState([])

    useEffect(() => {
        const fetchListings = async() => {
            const listingRef = collection(db, "listings")
            const q = query(listingRef, where('type', "==", params.catagoryName), orderBy("timestamp", "desc"))
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
    }, [params.catagoryName])

  return (
   <div>
    <p className='text-4xl font-extrabold mb-8'>{`Places for ${params.catagoryName}`}</p>
    {loading ? <h3> Loading...</h3> : listings.length === 0 ? <h3>No Listing Found</h3> : (
      <div>
          <div className='w-full flex flex-col gap-3'>
              {listings.map((item) => <CatagoryItems key={item.id} data={item.data}/> )}
          </div>
      </div>)}
   </div> 
  )
}

export default Catagories