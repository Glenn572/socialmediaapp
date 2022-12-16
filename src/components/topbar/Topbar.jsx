import React, { useContext } from 'react'
import './Topbar.css'
import {BsSearch} from 'react-icons/bs'
import {BsFillPersonFill,BsChatFill} from 'react-icons/bs'
import {MdOutlineNotifications,MdLogout} from 'react-icons/md'
import {Link, } from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'


const PF=process.env.REACT_APP_PUBLIC_FOLDER

function Topbar() {
    const {user}=useContext(AuthContext)
    
    const handleLogout=()=>{
        localStorage.clear()
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
                   <span className="topbarlink">Home</span>
                   <span className="topbarlink">Timeline</span>
                </div>
                <div className="topbaricons">
                    <div className="topbariconitems">
                        <BsFillPersonFill />
                        <span className="person-badge badges">3</span>
                    </div>
                    <div className="topbariconitems">
                    <Link  to ="/msg"  style={{color:"white"}}>
                        <BsChatFill />
                        <span className="chat-badge badges" >2</span>
                        </Link>
                    </div>
                    <div className="topbariconitems">
                        <MdOutlineNotifications />
                        <span className="notifications-badge badges">10</span>
                    </div>
                    <div className="topbariconitems">
                        <MdLogout style={{fontSize:"18px"}} onClick={handleLogout}/>                       
                    </div>
                </div>
                <Link to ={`/profile/${user.username}`}>
                <img crossorigin="anonymous" src={`${PF}${user.profilePicture}`} alt="" className='topbar-image'/>
                </Link>
                
            </div>
        </div>
    
  )
}

export default Topbar