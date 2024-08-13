import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useExpense } from '../Context/ExpensContext';
import { useFetch } from '../customHooks/useFetch';
import Loader from '../components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import Error from '../components/Error';



const inputContainer = ' py-12 px-8 rounded-lg flex flex-col gap-8  items-center bg-orange-100 ring ring-orange-400 ring-offset-4 w-3/4 md:w-2/4 lg:w-1/3 '
const input = 'w-full p-2 rounded-md sm:w-3/4 md:w-3/4   placeholder:px-2 placeholder:uppercase  ring ring-orange-300  focus:outline-none focus:ring focus:ring-orange-400 '
const button = 'bg-orange-400 font-semibold capitalize rounded-lg py-3 px-4 text-sm md:py-2 md:text-lg text-white  focus:outline-none focus:ring focus:ring-orange-300 focus:ring-offset-2'


export default function AllData() {
  const [loading,isLoading] = useState(true)
  
    const [searchByDate,setSearchByDate] = useState('');
    const [searchByMonth,setSearchByMonth] = useState('');
    const {data,dispatch,setError,error} = useExpense()
 
    useEffect(function(){

      
        useFetch(dispatch,isLoading,setError)        
        
       return function(){
        dispatch({type:'cleanUp/entry'}) 
        setError('')
       }
        },[])
    

      async  function filter(searchBy){

          if(!searchByDate && !searchByMonth) return
         
          const res = await axios.get(`http://localhost:3000/filter?${searchBy}`,{
            withCredentials:true
          }); 
        
          if(res.status !== 200) return new Error("don\'t find any entries according to this filter") ;  
          
            dispatch({type:'cleanUp/entry'}) 
          
             res.data?.data?.map((entry) =>{ dispatch({type:'add/entry',payload:entry})  }) 
        
        }

        async function handleFilterFullDate(){
          const date = searchByDate?.split('-').reverse()
               filter(`date=${Number(date[0])}&month=${Number(date[1])}&year=${Number(date[2])}`)
            }
            

            async function handleFilterMonth(){
              filter(`month=${searchByMonth}`)                
                }
                

              
                if(loading){
                  return <Loader/>
                }




    return (
        <div className='mt-32 w-full'>
           
          <div className='mb-4 flex gap-4 w-full justify-center px-4' id='byFullDate'>
          
<input className={input} type="date" name="searchByDate" id="searchByDate"  placeholder='Search By Date'  onInput={(e)=> {
          setSearchByDate(e.target.value)
          console.log(e.target.value)
          }}/>

<button className={button} onClick={handleFilterFullDate}>Search</button>
</div>

<div className='mb-4 flex gap-4 w-full justify-center px-4' id='byMonth'>

<input className={input} type="Number" name="searchByMonth" id="searchByMonth"  placeholder='Search By Month'  onChange={(e)=> {
          setSearchByMonth(e.target.value)
          console.log(e.target.value)
          }}/>

<button className={button} onClick={handleFilterMonth}>Search</button>
</div>

        <div id='recordContainer' className=" py-8 bg-orange-300 w-full flex flex-col  items-center ">
       

      {error ? <Error errorName={error}/> :  data.length === 0 ? <div>No Data Available</div> :
               <table  className='border text-white py-5 text-[10px] sm:text-sm border-white w-[95%] md:w-2/3 md:text-lg lg:w-2/3 lg:text-xl'>
              
              <thead className='border border-white'>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                {/* <th>Actions</th> */}
                </tr>
              </thead>

              
                 <tbody className='text-center '>
    
                    {data.length > 0 && data?.map((entry,i)=>{
                   return   <> <tr key={Math.random()}>

                               <td>{entry.title}</td>
                               <td>{entry.amount}</td>
                               <td>{entry.date}/{entry.month}/{entry.year}</td>
                               {/* <td>{entry.fullDate}</td> */}
                               <td>{entry.category}</td>
                             </tr>
                          {  entry.closeRecord && <>
                            
              <tr className='border border-white text-orange-500 font-semibold'>
                <th>closing Date</th>
                <th>Status</th>
                <th>Saving</th>
                <th>Income</th>
                {/* <th>Actions</th> */}
                </tr>
              <tr className='border border-white font-semibold'>
                            <td>{entry.fullDate}</td>
                            <td >closed record</td>
                            <td>{entry?.saving}</td>
                            <td >{entry?.monthlyIncome}</td>
                            </tr>
                            <h1 className='text-center'>Next Record ⬇</h1>
                        
              <tr className='border border-white'>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                {/* <th>Actions</th> */}
                </tr>
              
                            </>
                            }
                             </>
                    })}
               
                </tbody>

             </table>
}
             {/* <button onClick={handleCloseRecord}>Close Record</button> <button>Create New Record</button> */}
        </div>

        </div>
              )
  
}
