import React from 'react'

export default function Home() {
  return (
    <div>

    <div className='absolute inset-0 flex justify-center items-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl  '>
        <div id='main-heading ' className='text-center flex flex-col gap-y-4 sm:gap-y-5 md:gap-y-9 lg:gap-y-12'>
        <h1 className='tracking-wide text-orange-600 font-extralight'>Expense Tracker App</h1>
        <h4 className='text-sm md:text-lg  lg:text-xl tracking-widest bg-orange-400 text-white font-semibold rounded-lg'>Track your expenses with ease</h4>
        </div>
    </div>


    </div>
  )
}
