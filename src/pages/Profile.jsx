import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase.config'
import {ReactComponent as HomeIcon} from '../assets/svg/homeIcon.svg'
import {ReactComponent as RightArrowIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import { toast } from 'react-toastify'
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { getAuth, updateProfile } from 'firebase/auth'
import CatagoryItems from '../components/CatagoryItems'

function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [userListings, setUserListings] = useState([])
  const [formData, setFormData] = useState({
      name: auth.currentUser.displayName,
      email: auth.currentUser.email
    })
  const [changeDetails, setChangeDetails] = useState(false)
  const navigate = useNavigate()
  
  const logout = () => {
    auth.signOut()
    navigate("/")
  }
  const handleSubmit = async (e) => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid)
      await updateDoc(userRef, {
        name: formData.name,
      })
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
      })
    } catch (error) {
      toast.error("Invalid name or email")
    }
  }
  const handleChange = (e) => {
    setFormData((prevState) =>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  useEffect(() => {
    const fetchListings = async() => {
        const listingRef = collection(db, "listings")
        const q = query(listingRef, where('userRef', "==", auth.currentUser.uid), orderBy("timestamp", "desc"))
        const result = await getDocs(q)
        let listingMock = []
        result.forEach((item) => {
            return listingMock.push({
                id: item.id,
                data: item.data()
            })
        })
        setUserListings(listingMock)
        setLoading(false)
    }

    fetchListings()
}, [auth.currentUser.uid])


  if (!auth.currentUser){
    return <h3>Loading...</h3>
  }
  return (
    <>
      <header className='flex justify-between'>
        <h1 className='text-3xl font-extrabold'>My Profile</h1>
        <button className='bg-green-400 text-white rounded-full px-6' onClick={logout}>Logout</button>
      </header>
      <main className='mt-8 mx-auto md:mx-0 md:max-w-xl'>
        <div className='flex justify-between'>
          <h1 className='text-sm'>Personal Details</h1>
          <h1 className='font-bold text-green-400 text-sm cursor-pointer' onClick={() => {
            if (changeDetails){
              handleSubmit()
            }
            setChangeDetails((prev)=> !prev)
          }}>{changeDetails ? 'done' : 'change'}</h1>
        </div>
        {changeDetails && (
          <div className='bg-white rounded-xl px-3 py-2 mx-1 mt-4'>
            <input type='text' id="name" className='w-full focus:outline-none bg-gray-100 my-2' value={formData.name} onChange = {handleChange}/>
            <p id="email" className='w-full bg-gray-100 mb-2'>{formData.email}</p>
          </div>
        )}
        {!changeDetails && (<div className='bg-white rounded-xl px-3 py-2 mx-1 mt-4'>
          <h1 className='font-bold my-2'>{formData.name}</h1>
          <p className='mb-2 text-sm'>{formData.email}</p>
        </div>)}
        <div className='bg-white rounded-xl px-3 py-2 mx-1 mt-6 flex justify-between cursor-pointer hover:scale-105 duration-500' onClick={() => navigate("/createListing")}>
          <HomeIcon />
          <h1 className='text-sm font-bold'>sell or rent your home</h1>
          <RightArrowIcon />
        </div>
        <div className='mt-8'>
          <h1 className='font-bold'>Your Listing</h1>
          <div className='w-full mt-4'>
            {loading ? <h1>Loading</h1> : userListings.length === 0 ? <h1>No posted Ad</h1> : <div className='flex flex-col gap-5'>
              {userListings.map((item) => <CatagoryItems key={item.id} data={item.data} id={item.id}/> )}
            </div>
            }
          </div>
        </div>
      </main>

    </>
  ) 
}

export default Profile