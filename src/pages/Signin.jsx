import React from 'react'
import { useNavigate } from 'react-router-dom'
import {ReactComponent as RightArrowIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import {ReactComponent as GoogleIcon} from '../assets/svg/googleIcon.svg'
import {ReactComponent as PersonIcon} from '../assets/svg/personIcon.svg'
import {ReactComponent as LockIcon} from '../assets/svg/lockIcon.svg'
import { useState } from 'react'

function Signin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className='mx-5 my-7'>
      <p className='text-3xl font-extrabold'>Welcome Back!</p>
      <form>
        <div className='flex flex-col space-y-5 mt-5'>
          <div className='p-2 pl-4 rounded-full bg-white flex justify-start gap-2'>
            <PersonIcon />
            <input type="email" className='focus:outline-none flex-auto' placeholder='Email' onChange={changeEmail} value={email}/>
          </div>
          <div className='p-2 pl-4 rounded-full bg-white flex justify-start gap-2'>
            <LockIcon />
            <input type="password" className='focus:outline-none flex-auto' placeholder='Password' onChange={changePassword} value={password}/>
          </div>
          <p className='text-green-400 self-end cursor-pointer text-sm font-bold' onClick={() => navigate("/forgotPassword")}>Forgot Password</p>
        </div>
        <div className='w-full flex justify-between md:justify-start md:gap-9 self-start mt-8'>
          <p className='text-2xl font-extrabold'>Sign In</p>
          <button className='bg-green-400 rounded-full p-1 transform hover:scale-105 duration-200'>
            <RightArrowIcon fill='#FFFFFF' width='30' height='30'/>
          </button>
        </div>
      </form>
      <div className='flex flex-col space-y-9 items-center mt-8'>
        <p className='text-sm'>sign in with:</p>
        <button className='bg-white rounded-full p-3 hover:scale-105 duration-200'>
          <GoogleIcon width='25' height='25'/>
        </button>
        <p className='text-green-400 text-sm font-bold cursor-pointer' onClick={() => navigate('/signup')}>Sign Up Instead</p>
      </div>
    </div>

  )
}

export default Signin