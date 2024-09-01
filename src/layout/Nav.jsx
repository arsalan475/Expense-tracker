import React from 'react'
import { Link } from 'react-router-dom'
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
            <li><Link to='/'>Home</Link></li>
            
           {user && <>
           <li><Link to='/app/tracker'>App</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <button className={button} onClick={()=>logOut()}>log out</button>
            </>}
            {!user && <>
            <li> <Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
            </>
}
        </ul>
    </div>
  )
}
