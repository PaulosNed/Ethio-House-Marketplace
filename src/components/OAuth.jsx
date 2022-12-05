import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {ReactComponent as GoogleIcon} from '../assets/svg/googleIcon.svg'
import { db } from '../firebase.config'

function OAuth() {
    const navigate = useNavigate()

    const googleSubmit = async() => {
        try {
          const auth = getAuth()
          const provider = new GoogleAuthProvider()
          const result = await signInWithPopup(auth, provider)
          const user = result.user

          const docRef = doc(db, "users", user.uid)
          const docSnap = await getDoc(docRef)
          if (!docSnap.exists){
              await setDoc(docRef, {
                name: user.displayName,
                email: user.email,
                timestamp: serverTimestamp()
              })
          }
          navigate("/")
        } catch (error) {
          toast.error("Could not authorize with google")
        }
      }


  return (
    <button className='bg-white rounded-full p-3 hover:scale-105 duration-200' onClick={googleSubmit}>
        <GoogleIcon width='25' height='25'/>
    </button>
  )
}

export default OAuth