import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useExpense } from '../Context/ExpensContext'
import { endpoint } from '../App'

import Loader from '../components/Loader'



const button = 'bg-orange-100 font-semibold capitalize rounded-lg py-1  px-4 text-xs sm:text-sm  md:text-{20px} text-orange-400  focus:outline-none focus:ring focus:ring-orange-300 focus:ring-offset-2'
    

export default function Profile() {


const {dispatch,user,setUser} = useExpense()


const [profile,setProfile] = useState(()=> user)

console.log(profile)

const creationDate = new Date(profile?.createdAt).toDateString()



async function deactivateAccount() {

const disclaimer = confirm(`${user.userName} Are you sure you want to deactivate`)

if(!disclaimer) return

  try{
  const res = await axios.get(`${endpoint}/deactivate`,{
    withCredentials: true, 
  })
 
  dispatch({type:'deactivated'})
  setUser('')
  }catch(err){
    alert(err.message)
  }
  

}

  return (
    <div className='flex justify-center items-center ring ring-orange-300 py-6 px-4 mt-32 mx-4 rounded-lg text-orange-500 text-xs   font-semibold capitalize'>
    <div  className='flex flex-col gap-y-8 w-full items-center'>
      <div className='flex justify-center w-full text-lg items-center flex-col gap-3'>
        <h1>Profile details</h1>
        <div  className='w-40 h-40 rounded-full flex justify-center bg-orange-300' > </div>
      </div>
      
      <div className=' w-full flex justify-center '>

        <div  className='flex flex-col gap-y-8 w-full sm:w-1/2    sm:text-lg  ' >
           <div className='flex justify-between'> <span className='w-32 mx-8  inline-block'>Name</span> <span>{profile?.userName}</span> </div> 
           <div className='flex justify-between'> <span className='w-32 mx-8 inline-block'>Email</span>  <span className='lowercase'>{profile?.email}</span> </div>
           <div className='flex justify-between'> <span className='w-32 mx-8'>Created At</span>  <span>{creationDate  }</span> </div>
           <button className={button} onClick={()=> deactivateAccount()}>Deactivate Account</button>
        </div>
      </div>
        
    </div>
 
    </div>
  )
}
