import React, { useEffect, useState } from 'react'
import { useExpense } from '../Context/ExpensContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import Error from '../components/Error';
import { endpoint } from '../App';

export default function AddQuery() {

  const [record,setRecord] = useState(null)
 
const [title,setTitle] = useState('');
const [amount,setAmount] = useState('');
const [category,setCategory] = useState('');
const [btnLoading1,setBtnLoading1] = useState(false);
const [btnLoading2,setBtnLoading2] = useState(false);

const {dispatch,income,setError,error,total,setTotal,setUser} = useExpense()

// useEffect(()=>{
//   dispatch({type:'add/income',payload:total})

// },[total  ])


// useEffect(function(){

    
//   async function getData(){
// try {
  
//   isLoading(true)
//       const profileRes = await axios.get('http://localhost:3000/getProfile',{
//         withCredentials: true,
//     })
     
//         const res = await axios.get('http://localhost:3000/currentdata',{
//           withCredentials:true,
//         })
  
     
  
//         if(!res.data.data.length) return 
  
//         const recordRes = await axios.get(`http://localhost:3000/singlerecord/${profileRes.data?.data.userRecords.at(-1)}`,{
//           withCredentials:true,
//         })
       
//         dispatch({type:'add/income',payload:recordRes.data?.data?.income})
//        setTotal(recordRes.data?.data?.income)
//        return  res.data?.data?.map((entry) =>{ dispatch({type:'add/entry',payload:entry})  })
// } catch (error) {
//  console.log(error.message) 
// }finally{
//   isLoading(false)
// }
   
  
//   }
  
//   getData()
 
  
//  return function(){
  
//   dispatch({type:'cleanUp/entry'}) 
//  }
//   },[])



useEffect(function(){

    
        
  async function getData(){
    
try {
  
  
      const profileRes = await axios.get(`${endpoint}/getProfile`,{
        withCredentials: true,
    })
     

    

        const res = await axios.get(`${endpoint}/currentdata`,{
          withCredentials:true,
        })
  
     
  
        if(!res?.data?.data?.length) throw new Error('Add New Entries')
  
          console.log(res.data.data.length)
        const recordRes = await axios.get(`${endpoint}/singlerecord/${profileRes.data?.data.userRecords.at(-1)}`,{
          withCredentials:true,
        })
       
        dispatch({type:'add/income',payload:recordRes.data?.data?.income})
       setTotal(recordRes.data?.data?.income)
      
        res.data?.data?.map((entry) =>{ dispatch({type:'add/entry',payload:entry})  })
        
} catch (error) {
setError(error.message)
console.log(error.message)
}finally{
  dispatch({type:'loading/entry'}) 
}
   
  
  }
  
  getData()
 
  
 return function(){
  setError('')
  dispatch({type:'cleanUp/entry'}) 
 }
  },[])
 

async function handleAddRecord(){
 try {

  setBtnLoading1(true)
   const res = await  axios.post(`${endpoint}/addincome`,{
       income:total
     },{
       withCredentials:true
     })

     
     dispatch({type:'add/income',payload:total})
     toast.success('New Record Added Successfully')
     
 } catch (error) {
   toast(error.message)
 }finally{
  setBtnLoading1(false)
 }
  }

async function handleEntries(){
 if(!income){
  alert('please add income information')
  return
 }

  if(!title || !amount || !category || !total) {
    alert("Pleass Make Sure all fields are filled")
    return
  }

  if(amount < 0) {
    alert("Pleass Make Sure amount must be possitive Number")
    return
  }

  // if(amount > income) {
  //     alert('now your expanding more than your income')
  // }



  try{

    setBtnLoading2(true)
    
    const res = await axios.post(`${endpoint}/add`,
      {
        title,
        amount,
        category,
      },
      {
        withCredentials:true,
      }
     )
    const data = {
      title,
      amount:Number(amount),
      category,
      fullDate:res.data.data.fullDate,
      date:res.data.data.date,
      month:res.data.data.month,
      year:res.data.data.year,
      _id:res.data.data._id,
    }
    
   
    dispatch({type:'add/entry',payload:data})

    toast.success('Added Successfully')
    
    
  }catch(e){
    toast.error(e.message)
    
  }finally{
    setBtnLoading2(false)
  }
   

   
}



const inputContainer = 'w-full sm:px-4 mt-6 flex gap-4 justify-center flex-wrap'
const input = 'text-xs sm:text-sm md:text-lg sm:w-auto rounded-md placeholder:px-1 p-1 sm:p-2 sm:placeholder:px-2 ring ring-orange-100  focus:outline-none focus:ring focus:ring-orange-300 '
const button = 'bg-orange-400 font-semibold capitalize rounded-lg py-1 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-lg text-white'





  return (

    <>
    <div className='fixed w-full top-24 sm:top-28 bg-orange-300 py-8 z-10'>





    <div className={inputContainer}>
      <input type="Number" name="TotalIncome" value={total} id="totalIncome"  placeholder='Monthly Income'  onChange={(e)=> {
      setTotal(e.target.value)
      }}  className={`${input} sm:w-auto`}/>

    <button className={button} onClick={handleAddRecord}>{btnLoading1? 'loading...': 'Add Income'}</button>

    </div>

    <div className={inputContainer}>

    <input className={input} type="Number" name='currentExpense' placeholder='Today Expense' onChange={(e)=> setAmount(e.target.value)}/>
    <input className={input} type='text' name='expenseTitle' placeholder='Expense Title' onChange={(e)=> setTitle(e.target.value)}/>
    <select className={`${input} `} name="category" id="category" onChange={(e)=> setCategory(e.target.value)}>
    <option className=' focus-visible:bg-orange-400 focus-visible:text-white focus-visible:font-semibold' value="SelectGategory">Select Gategory of  your Expense</option>
    <option value="Grocery">Grocery</option>
    <option value="Food">Food</option>
    <option  value="Shoping">Shoping</option>
    <option value="Transport">Transport</option>
    <option value="Event">Event</option>
    <option value="Others">Others</option>
    </select>
    <button className={button} onClick={handleEntries}>{btnLoading2? 'loading...': 'Add'}</button>
    </div>
    <Toaster/>
   
    </div>
    <div className=' position absolute inset-0 flex -z-40 justify-center items-center'>

{error && <Error errorName={error}/>}
</div>
    </>
  )
}
