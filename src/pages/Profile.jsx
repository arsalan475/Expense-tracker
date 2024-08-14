import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useExpense } from '../Context/ExpensContext'
import { endpoint } from '../App'

export default function Profile() {


const {dispatch} = useExpense()

const [profile,setProfile] = useState(null)

useEffect(function(){
   async function getProfile(){
    const res = await axios.get(`${endpoint}/getProfile`,{
        withCredentials: true,
    })

    console.log(res.data.data)
    setProfile(res.data.data)
   
    }

    getProfile()
},[])


  return (
    <div className='flex justify-center items-center ring ring-orange-300 py-6 px-4 mt-32 mx-4 rounded-lg text-orange-500 text-xs   font-semibold capitalize'>
    <div  className='flex flex-col gap-y-8 w-full items-center'>
      <div className='flex justify-center w-full text-lg items-center flex-col gap-3'>
        <h1>Profile details</h1>
        <div  className='w-40 h-40 bg-orange-400 rounded-full flex justify-center ' > </div>
      </div>
      
      <div className=' w-full flex justify-center ring ring-red-400'>

        <div  className='flex flex-col gap-y-8 w-full sm:w-1/2    sm:text-lg  ring' >
           <div className='flex justify-between'> <span className='w-32 mx-8 ring inline-block'>Name</span> <span>{profile?.userName}</span> </div> 
           <div className='flex justify-between'> <span className='w-32 mx-8 ring inline-block'>Email</span>  <span className='lowercase'>{profile?.email}</span> </div>
           <div className='flex justify-between ring'> <span className='w-32 mx-8 ring'>Created At</span>  <span>{profile?.createdAt ? new Date(profile.createdAt).toLocaleString():''}</span> </div>
        </div>
      </div>
        
    </div>
    </div>
  )
}
