import React,{useState,useEffect} from 'react'
import './Profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const PF=process.env.REACT_APP_PUBLIC_FOLDER
function Profile() {
    const [user,setUser]=useState({})
    // const {user:currentUser}= useContext(AuthContext)
    const username=useParams().username

    useEffect(()=>{
        const fetchUser=async ()=>{
          const res=await axios.get(`http://localhost:8800/api/users?username=${username}`)
          setUser(res.data)
        }
    fetchUser()
      },[username]) 
   
  return (
    <>
        <Topbar />
        <div className="profile">
        <Sidebar />
<div className="profileright">
    <div className="profilerighttop">
        <div className="profilecover">
        <img crossorigin="anonymous" src={ user.coverPicture ? `${PF}${user.coverPicture}` : `${PF}post3.jpg`} alt="" className='profilecoverimage'/>
        <img crossorigin="anonymous" src={user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}pro3.jpg`} alt="" className='profileimage'/>
        </div>
        <div className="profileinfo">
            <h3 className='profileinfoname'>{user.username}</h3>
            <span className="profileinfodesc">{user.desc}</span>
        </div>
    </div>
    <div className="profilerightbottom">
        <Feed username={username}/>
        <Rightbar user={user}/>
    </div>
        
        </div>   
        
        </div> 
        
    </>
  )
}

export default Profile