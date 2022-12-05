import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {ReactComponent as ExploreIcon} from "../assets/svg/exploreIcon.svg"
import {ReactComponent as OfferIcon} from "../assets/svg/localOfferIcon.svg"
import {ReactComponent as ProfileIcon} from "../assets/svg/personOutlineIcon.svg"

function Navbar() {
    const location = useLocation()
    const matchRoute = (route) => {
        if (route === location.pathname) {
            return true
        }
        return false
    }
  return (
    <footer className='bg-white '>
        <nav className='flex items-center py-1 md:py-2 justify-around'>
            <Link to="/" className="flex flex-col justify-center items-center gap-1">
                <ExploreIcon fill={matchRoute("/") ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px"/>
                <p className={`text-xs ${matchRoute("/") ? 'font-bold' : 'font-normal'}`}>Explore</p>
            </Link>
            <Link to="/offers" className="flex flex-col justify-center items-center gap-1">
                <OfferIcon fill={matchRoute("/offers") ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px"/>
                <p className={`text-xs ${matchRoute("/offers") ? 'font-bold' : 'font-normal'}`}>Offers</p>
            </Link>
            <Link to="/profile" className="flex flex-col justify-center items-center gap-1">
                <ProfileIcon fill={matchRoute("/profile") ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px"/>
                <p className={`text-xs ${matchRoute("/profile") ? 'font-bold' : 'font-normal'}`}>Profile</p>
            </Link>
        </nav>
    </footer>
  )
}

export default Navbar