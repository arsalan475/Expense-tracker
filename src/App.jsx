import React, { useState } from 'react'
import {ExpensContext, useExpense} from './Context/ExpensContext'
import AddQuery from './layout/AddQuery'
import Record from './layout/Record'
import Summary from './layout/Summary'
import { BrowserRouter, Outlet, Route, Router, Routes } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Nav from './layout/Nav.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import AppNav from './layout/AppNav.jsx'
import AllData from './pages/AllData.jsx'
import Home from './pages/Home.jsx'
import Loader from './components/Loader.jsx'
import ProtectedRoute from './protect route/ProtectedRoute.jsx'

// export const endpoint = 'https://expense-track-backend-staging.up.railway.app'
export const endpoint = 'http://localhost:3000'

export default function App() {

  
const {loading,user} = useExpense()

  return   <BrowserRouter>
<Nav/>
      <Routes>
 <Route path='/' index element={<Home/>}/>
        <Route path='/app' element={<ProtectedRoute>
            <main>
              <AppNav/>
                 <Outlet/>
            </main>
            </ProtectedRoute> }>
          
          <Route path='tracker'  element={
            
              <>
            <div className='flex flex-col items-center'>
          <AddQuery/>
          {loading ? <Loader/> :  <Record />}
                
                 </div>
                 </>
            }/>
          <Route path='alldata' element={<AllData/>}/>


        </Route>
     <Route path='/profile' element={
      <ProtectedRoute>
       <Profile/>
      </ProtectedRoute>
      }/>

      {!user && <>
     <Route path='/register' element={<Register/>}/>
     <Route path='/login' element={<Login/>}/>
     </>
      }
    </Routes>
    </BrowserRouter> 
    
   
  
}
