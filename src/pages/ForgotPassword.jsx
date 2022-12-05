import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {ReactComponent as RightArrowIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import {ReactComponent as PersonIcon} from '../assets/svg/personIcon.svg'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email, {
        url: 'http://localhost:3000/signin'
      })
      toast.success("Verification email sent succefully")
    } catch (error) {
      toast.error("Couldn't send Verification Email")
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-7 items-start'>
      <p className='text-3xl font-extrabold'>Forgot Password</p>
      <div className='w-full bg-white rounded-full flex items-center px-4 gap-1 py-2'>
        <PersonIcon />
        <input type="email" className='rounded-full flex-auto focus:outline-none pl-2' placeholder='Email' value={email} onChange={handleChange}/>
      </div>
      <Link to='/signin' className='self-end mr-0 text-green-400 text-sm font-bold'>sign in</Link>
      <div className='mt-3 flex justify-between w-full md:max-w-md items-center'>
        <p className='text-xl font-extrabold'>Send Reset Link</p>
        <button type='submit' className='bg-green-400 rounded-full p-1.5 hover:scale-110 duration-200'>
          <RightArrowIcon fill='#FFFFFF'/>
        </button>
      </div>
    </form>
  )
}

export default ForgotPassword