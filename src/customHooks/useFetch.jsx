import axios from "axios"
import { endpoint } from "../App"





export const useFetch =  (dispatch,isLoading,setError) => {


async function getData(){
   
         
        try {
          const res = await axios.get(`${endpoint}/alldata`,{
            withCredentials:true,
          })

         
    
          if(!res?.data?.data?.length) throw new Error('No Data Found')
         
            
         res.data?.data?.map((entry) =>{ dispatch({type:'add/entry',payload:entry})  }) 
        
        } catch (error) {
          
          
          setError(error.message)
        }finally{
          isLoading(false)
        }
}
 
getData()

  

}