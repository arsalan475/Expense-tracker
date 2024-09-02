import React from 'react'
import { NavLink } from 'react-router-dom'
import { useExpense } from '../Context/ExpensContext'
import axios from 'axios'
import { endpoint } from '../App'




const button = 'bg-orange-100 font-semibold capitalize rounded-lg py-1  px-4 text-xs sm:text-sm  md:text-{20px} text-orange-400  focus:outline-none focus:ring focus:ring-orange-300 focus:ring-offset-2'
    


export default function Nav() {



  const {user,setUser} = useExpense()


  async function logOut() {

    try{
    const res = await axios.get(`${endpoint}/logout`,{
      withCredentials: true, 
    })
   
    setUser('')
    }catch(err){
      alert(err.message)
    }
    
  
  }

  return (
    <div className='fixed w-full top-0 z-10'>
        <ul className=' border-b-2 border-orange-200 flex justify-evenly bg-orange-400 py-4 tracking-wide text-white text-xs md:text-lg'>
            <li className='hover:text-orange-100'><NavLink to='/'>Home</NavLink></li >
            
           {user && <>
           <li className='hover:text-orange-100'><NavLink to='/app/tracker'>App</NavLink></li >
            <li className='hover:text-orange-100'><NavLink to='/profile'>Profile</NavLink></li >
            <button className={button} onClick={()=>logOut()}>log out</button>
            </>}
            {!user && <>
            <li className='hover:text-orange-100'> <NavLink to='/login'>Login</NavLink></li >
            <li className='hover:text-orange-100'><NavLink to='/register'>Register</NavLink></li >
      
            </>
}
        </ul>
    </div>
  )
}
