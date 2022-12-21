import React, { useContext } from 'react'
import './Topbar.css'
import {BsSearch} from 'react-icons/bs'
import {BsChatFill} from 'react-icons/bs'
import {MdLogout} from 'react-icons/md'
import {Link, useNavigate, } from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'


const PF=process.env.REACT_APP_PUBLIC_FOLDER

function Topbar() {
    const {user}=useContext(AuthContext)
    const navigate=useNavigate()
    const handleLogout=async()=>{
        await axios.post("http://localhost:8800/api/auth/logout")
        localStorage.clear()
        navigate('/login')
       window.location.reload()
    
          }

  return (
   
        <div className="topbar-container">
            <div className="topbar-left">
                <Link to='/' style={{textDecoration:"none"}}> <span className='topbarleft-logo'>Quickie</span></Link>
               
            </div>
            <div className="topbar-center">
                <div className="searchbar">
                    <BsSearch className='searchicon'/>
                <input type="text" className='search-input' placeholder='Search for friends,posts.....' />
                </div>          

            </div>
            <div className="topbar-right">
                <div className="topbarlinks">
                <Link to='/' style={{textDecoration:"none", color:"white"}}> 
                   <span className="topbarlink">Home</span>
                   </Link>
                   <Link to='/' style={{textDecoration:"none", color:"white"}}> 
                   <span className="topbarlink">Timeline</span>
                   </Link>
                </div>
                <div className="topbaricons">
                    
                    <div className="topbariconitems">
                    <Link  to ="/msg"  style={{color:"white"}}>
                        <BsChatFill />
                        <span className="chat-badge badges" >2</span>
                        </Link>
                    </div>
                    
                    <div className="topbariconitems">
                        <MdLogout style={{fontSize:"18px"}} onClick={handleLogout}/>                       
                    </div>
                </div>
                <div className='profilecontianer'>
                <Link to ={`/profile/${user.username}`} className="profilelink" style={{textDecoration:"none",color:"white"}}>
                <img crossorigin="anonymous" src={`${PF}${user.profilePicture}`} alt="" className='topbar-image'/>
                <span className='profilename'>{user.username}</span></Link>
                </div>
                
            </div>
        </div>
    
  )
}

export default Topbar