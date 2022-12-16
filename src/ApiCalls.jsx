import axios from 'axios'

export const LoginCall=async(userCredential,dispatch)=>{
dispatch({type:"LOGIN_START"})
try {
    const res=await axios.post('http://localhost:8800/api/auth/login',userCredential)
    // dispatch({type:"LOGIN_SUCCESS",payload:res.data})
localStorage.setItem('userDetails',JSON.stringify(res.data))
const userData=localStorage.getItem('userDetails')
const userDataObj=JSON.parse(userData)
 dispatch({type:"LOGIN_SUCCESS",payload:userDataObj})
  
} catch (error) {
    dispatch({type:"LOGIN_FAILURE",payload:error})
}
}