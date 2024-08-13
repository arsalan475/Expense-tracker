import React from 'react'
import { Link } from 'react-router-dom'






export default function AppNav() {
  return (
    <div className='fixed w-full top-12 md:top-14 z-10'>
        <ul className='flex justify-evenly bg-orange-100 py-4 font-bold text-orange-500 text-sm md:text-lg'>
         
            
            <li><Link to='tracker'>Tracker</Link></li>
            <li><Link to='alldata'>All Data</Link></li>
            {/* <li> <Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li> */}
        </ul>
    </div>
  )
}
