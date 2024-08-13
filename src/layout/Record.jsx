import React, { useEffect, useState } from 'react'
import { useExpense } from '../Context/ExpensContext'
import axios from 'axios'
import Summary from './Summary'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '../components/Loader'






const button = 'bg-white font-semibold mt-2 capitalize rounded-lg py-1 px-2 sm:py-3 sm:px-4  md:py-2 md:text-lg text-orange-400  focus:outline-none focus:ring focus:ring-orange-300 focus:ring-offset-2'

const delteButton = 'bg-orange-400 font-semibold capitalize rounded-lg py-1   px-4 text-sm md:py-1 text-xs sm:text-sm  text-white  focus:outline-none focus:ring focus:ring-orange-300 focus:ring-offset-2'


export default function Record({total,setTotal}) {

   const {data,dispatch,saving,income,loading} = useExpense()
   
  

  
  
if(data?.length === 0 ) return

async function handleDelete(id){


  try {
  const res = await axios.post(`http://localhost:3000/remove/${id}`)
   console.log(res.data.msg)
  dispatch({type:'delete/entry',payload:id})
  toast.success('Successfully Deleted',{
    position:'bottom-center',
    style:{
      background:'red',
      color:'white'
    }
  })
  } catch (error) {
    console.error('Error deleting entry:', error.message)
  }
}

async function handleCloseRecord(){
  try {
    const res = await axios.post('http://localhost:3000/closerecord',
       {
        saving,
        income
       },
       {
         withCredentials:true,
       }
     )
   
     setTotal('')
     dispatch({type:'cleanUp/entry'}) 

   
     console.log(res)
  } catch (error) {

    console.log(error.message)
    
  }
 }
 



  return (
            <div className='mt-[18rem]  sm:mt-[22rem] md:mt-[24rem] lg:mt-[20rem] w-full '>
      <div id='recordContainer' className=' py-8 bg-orange-300 w-full flex flex-col mt-4 items-center  '>
         <div className='w-[95%] text-[10px] sm:text-sm mx-2 flex justify-between items-center ring ring-orange-100  md:w-2/3 lg:text-lg lg:w-2/3 mb-4 py-1 px-4 md:px-4 md:py-2 ' >
          <Summary/>
         <button className={button} onClick={handleCloseRecord}>Close Record</button>
         </div>
           <table className='border text-xs sm:text-sm border-white w-[95%] md:w-2/3 lg:w-2/3 lg:text-lg'>
          
          <thead className='border border-white text-white'>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Actions</th>
            </tr>
          </thead>
            <tbody className='text-center text-white'>

                {data.length > 0 && data?.map((entry,i)=>{
               return          <tr key={i}>
                         <td>{entry.title}</td>
                           <td>{entry.amount}</td>
                           <td>{entry.date}/{entry.month}/{entry.year}</td>
                           {/* <td>{entry.fullDate}</td> */}
                           <td>{entry.category}</td>
                           <td><button className={delteButton} id={entry._id} onClick={(e)=>handleDelete(e.target.id)}>Delete</button></td>
                       </tr>
                })}
           
            </tbody>
         </table>
        
    </div>

    <Toaster/>
    
    </div>
  )
}
