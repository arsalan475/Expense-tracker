import React from 'react'
import { Link } from 'react-router-dom'







export default function Nav() {
  return (
    <div className='fixed w-full top-0 z-10'>
        <ul className=' border-b-2 border-orange-200 flex justify-evenly bg-orange-400 py-4 tracking-wide text-white text-xs md:text-lg'>
            <li><Link to='/'>Home</Link></li>
            
            <li><Link to='/app/tracker'>App</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li> <Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
        </ul>
    </div>
  )
}
