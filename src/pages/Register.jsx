import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { endpoint } from '../App'
import { useNavigate } from 'react-router-dom'
import { useExpense } from '../Context/ExpensContext'

export default function Register() {
  const navigate = useNavigate()

    const [userName,setUserName] = useState(null)
    const {setUser} = useExpense()
    const [email,setEmail] = useState(null)

    const [password,setPassword] = useState(null)

    const [btnLoading,setBtnLoading] = useState(false)


   


   async function handleRegigistration(){
     
    
     try {

      setBtnLoading(true)
      
      
    const res = await axios.post(`${endpoint}/register`,{
         userName,
         email,
         password
      },
     {withCredentials:true})


     if(res.data.status === 400) throw new Error(res.data.errors)

      console.log(res.data.user)
     setUser(res.data.user)

     if(res.data.user)  navigate('/app/tracker')
    
    
     } catch (error) {
      console.log(error )
      toast.success(error.message ,{
        position:'bottom-right',
        style:{
         textTransform:'capitalize',
          color:'#333'
        },
      duration:2000
      })
     }finally{
      setBtnLoading(false)
     }
    }

    const inputContainer = ' py-12 px-8 rounded-lg flex flex-col gap-8  items-center bg-orange-100 ring ring-orange-400 ring-offset-4 w-3/4 md:w-2/4 lg:w-1/3 text-sm sm:text-lg md:text-xl'
    const input = 'w-full p-2 rounded-md sm:w-3/4 md:w-3/4   placeholder:px-2  placeholder:uppercase placeholder:text-sm sm:placeholder:text-lg md:placeholder:text-xl  ring ring-orange-300  focus:outline-none focus:ring focus:ring-orange-400 '
    const button = ' hover:ring hover:ring-orange-400 hover:ring-offset-2 bg-orange-400 font-semibold capitalize rounded-lg py-1 sm:py-3 px-4 text-sm md:py-2 md:text-lg text-white  focus:outline-none focus:ring focus:ring-orange-300 focus:ring-offset-2'
    
  return (
    <div className='inset-0 z-[-10] absolute flex justify-center items-center '>
      <div className={inputContainer}>
        <h1 className='text-orange-500  uppercase font-semibold text-sm sm:text-lg md:text-xl tracking-wider'>Registration form</h1>
        <input className={input} type="text" placeholder='Name' onChange={(e)=> setUserName(e.target.value)}/>
        <input className={input} type="text" placeholder='email' onChange={(e)=>    setEmail(e.target.value)}/>
        <input className={input}  type="text" placeholder='password' onChange={(e)=> setPassword(e.target.value)}/>
        <div className='w-full flex justify-end  sm:w-3/4  md:w-3/4'> 
        <button  className={button} onClick={handleRegigistration}>{btnLoading ? 'loading...':'Register'}</button>
        </div>
        
      </div>
      <Toaster/>
    </div>
  )
}
