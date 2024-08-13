import React, { useEffect } from 'react'
import { useExpense } from '../Context/ExpensContext'

export default function Summary() {

  const {income,data,setSaving} = useExpense()

  const totalExpenses = data.reduce((acc,curr)=> acc + curr.amount ,0)

  let saving = income - totalExpenses

useEffect(() => {
setSaving(saving)
},[saving])






if(!totalExpenses)  return 

  return (
    <div>
      {saving > 0 ? <h1 className='text-white font-semibold'>Total expense {totalExpenses}  income left {saving}</h1>
    :   <h1 className='text-white font-bold'> You expensed more then your income {Math.abs(saving)}</h1>
    }
       </div>
  )
}
