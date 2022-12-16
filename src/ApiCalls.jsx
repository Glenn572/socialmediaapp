import axios from 'axios'

export const LoginCall=async(userCredential,dispatch)=>{
dispatch({type:"LOGIN_START"})
try {
    const res=await axios.post('http://localhost:8800/api/auth/login',userCredential)
    dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    localStorage.getItem('userDetails',[res])
  
} catch (error) {
    dispatch({type:"LOGIN_FAILURE",payload:error})
}
}