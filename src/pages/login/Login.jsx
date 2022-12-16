import './Login.css'
import {useRef} from 'react'
import {LoginCall} from '../../ApiCalls'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {Link} from 'react-router-dom'

function Login() {
  const email=useRef()
  const password=useRef()
  const {user,isFetching,dispatch}=useContext(AuthContext)

  const handleClick=(e)=>{
e.preventDefault()
if(email.current.value === "" || password.current.value === "") return 
LoginCall({email:email.current.value,password:password.current.value},dispatch)
  }
  
  return (
    <div className='login'>
        <div className="loginwrapper">
            <div className="loginleft">
                <h3 className="loginlogo">Quickie</h3>
                <span className="loginlogodesc">Connect with firends in a quickie way</span>
            </div>
            <div className="loginright">
                <form className="loginbox" onClick={handleClick}>
                <input type="email" placeholder='Email' required className="logininput" ref={email}/>
                <input type="password" placeholder='password' required  className="logininput" ref={password}/>
                <button className='loginbutton'>{isFetching ? "Loading..." :"Login"}</button>
                <span className='forgotpassword'>Forgor Password?</span>
                <Link to ={`/reg`}>
                <button className='newaccount'>Create a New Account!</button></Link>
                
            </form>
            </div>
        </div>
    </div>
  )
}

export default Login