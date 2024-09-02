import React from 'react'
import { Link } from 'react-router-dom'


const button = 'hover:bg-orange-200 hover:text-orange-500 hover:ring hover:ring-orange-400 hover:ring-offset-2 bg-orange-100 font-semibold capitalize rounded-lg py-1 sm:py-2 px-4 text-sm md:py-2 md:px-6 md:text-2xl text-orange-600  focus:outline-none focus:ring focus:ring-orange-300 focus:ring-offset-2'
   
export default function Home() {
  return (
    <div>

    <div className='absolute inset-0 flex justify-center items-center text-3xl sm:text-5xl md:text-7xl lg:text-8xl  '>
        <div id='main-heading ' className='p-3 sm:p-1 text-center flex flex-col gap-y-4 sm:gap-y-5 md:gap-y-9 lg:gap-y-12'>
        <h1 className='tracking-wide font-semibold  text-orange-600 sm:font-extralight'>Expense Tracker App</h1>
       
        <h4 className=' sm:py-1 text-sm md:text-lg  lg:text-xl tracking-widest bg-orange-400 text-white  sm:font-semibold rounded-lg'>Track your expenses with ease</h4>
      <div className='-mt-[.5rem] md:-mt-[2.7rem] lg:-mt-[4rem] sm:-mt-[1rem]'>
       <button className={button}><Link to='/register'>Explore Now</Link></button>
       </div>
        </div>
    </div>


    </div>
  )
}
