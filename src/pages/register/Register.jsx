import axios from 'axios'
import { useRef } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import './Register.css'

function Register() {
  const username=useRef()
  const email=useRef()
  const password=useRef()
  const passwordAgain=useRef()
  const navigate =useNavigate()

  const handleClick=async(e)=>{
e.preventDefault()
if(passwordAgain.current.value !== password.current.value){
  password.current.setCustomValidity("password don't match")
}else{
 const user={
  username:username.current.value,
  email:email.current.value,
  password:password.current.value
 }
 try {
  if (username === "" || email === "" || password ==="" || passwordAgain.current.value === "" ) return 
  await axios.post('http://localhost:8800/api/auth/reg',user)
  navigate('/login')
 } catch (error) {
  console.log(error)
 }
}
  }
  return (
    <div className='login'>
        <div className="loginwrapper">
            <div className="loginleft">
                <h3 className="loginlogo">Quickie</h3>
                <span className="loginlogodesc">Connect with firends in a quickie way</span>
            </div>
            <div className="loginright">
                <form className="loginbox" onSubmit={handleClick}>
                <input type="username" placeholder='Username' ref={username} className="logininput" />
                <input type="email" placeholder='Email' ref={email} className="logininput" />
                <input type="password" placeholder='password'  ref={password} className="logininput" />
                <input type="password" placeholder='Confirm Password'  ref={passwordAgain} className="logininput" />
                <button className='loginbutton'>Sign Up</button>
                <Link to={`/login`}>
                <button className='newaccount'>Log into Account</button>
                </Link>
               
            </form>
            </div>
        </div>
    </div>
  )
}

export default Register