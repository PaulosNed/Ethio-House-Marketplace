import { getAuth } from 'firebase/auth'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Signin from '../pages/Signin'

function PrivateRoute() {
  const auth = getAuth()
  return auth.currentUser ? <Outlet /> : <Signin />
}

export default PrivateRoute