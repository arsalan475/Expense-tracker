

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'


const context = createContext()



const initialState = {
   
    data:[],
    income : null,
    loading:true,
    
}




function reducer(state,action){
    switch(action.type){

        case 'add/income':
            
            return {...state,income:action.payload,loading:false}
        case 'add/entry':
            console.log(action.payload)
            return {...state,data:[...state.data,action.payload],loading:false}

        case 'delete/entry' :
            console.log(action.payload)
            const deleteEntry = state.data.filter((el) =>  el._id !== action.payload )
            return {...state,data:deleteEntry}
            case 'cleanUp/entry':
                return {...initialState,loading:false}
                case 'loading/entry':
                return {...state,loading:false}
        default : return
    }
}

function ExpensContext({children}) {

const [state,dispatch] = useReducer(reducer,initialState)
 

const {data,income,loading} = state
const [saving,setSaving] = useState(null)
const [error,setError] = useState('')
const [user,setUser] = useState(null)

  return  <context.Provider value={{user,setUser,data,income,dispatch,saving,setSaving,loading,setError,error}}>
{children}
    </context.Provider>
  
}

function useExpense(){
    return useContext(context)
}


export {ExpensContext,useExpense}

