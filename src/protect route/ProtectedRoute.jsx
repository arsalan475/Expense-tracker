import React from 'react'
import { useExpense } from '../Context/ExpensContext'
import Register from '../pages/Register'

export default function ProtectedRoute({children}) {
 const {user} = useExpense()

if(!user) return <Register/>

return children

}
