import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase.config'
import {ReactComponent as HomeIcon} from '../assets/svg/homeIcon.svg'
import {ReactComponent as RightArrowIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import { toast } from 'react-toastify'
import { doc, updateDoc } from 'firebase/firestore'
import { getAuth, updateProfile } from 'firebase/auth'

function Profile() {
  const auth = getAuth()
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

  if (!auth.currentUser){
    return <h3>Loading...</h3>
  }
  return (
    <>
      <header className='flex justify-between'>
        <h1 className='text-3xl font-extrabold'>My Profile</h1>
        <button className='bg-green-400 text-white rounded-full px-6' onClick={logout}>Logout</button>
      </header>
      <main className='mt-8 mx-auto md:mx-0 md:max-w-md'>
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
        <div className='bg-white rounded-xl px-3 py-2 mx-1 mt-6 flex justify-between'>
          <HomeIcon />
          <h1 className='text-sm font-bold'>sell or rent your home</h1>
          <RightArrowIcon />
        </div>
        <div className='mt-8'>
          <h1 className='font-bold'>Your Listing</h1>
          <div className='w-full ml-4'>
            {/* ListingItems components after fetching */}
          </div>
        </div>
      </main>

    </>
  ) 
}

export default Profile