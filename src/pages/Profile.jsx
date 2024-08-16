import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useExpense } from '../Context/ExpensContext'
import { endpoint } from '../App'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../components/Loader'

export default function Profile() {


const {dispatch} = useExpense()
const [loading,isLoading] = useState(true)

const [profile,setProfile] = useState(null)

useEffect(function(){

  try{
   async function getProfile(){
    const res = await axios.get(`${endpoint}/getProfile`,{
        withCredentials: true,
    })

   
    setProfile(res.data.data)
   
    }

    getProfile()
  }catch(e){
    console.log(e.message)
  }finally{
   isLoading(false)
  }

},[])


if(loading && !profile?.email){
  console.log('im running')
  return <Loader/>
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
           <div className='flex justify-between'> <span className='w-32 mx-8'>Created At</span>  <span>{profile?.createdAt ? new Date(profile.createdAt).toLocaleString():''}</span> </div>
        </div>
      </div>
        
    </div>
    <Toaster/>
    </div>
  )
}
