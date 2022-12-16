import React from 'react'
import './Rightbar.css'
import {AiOutlineGift} from 'react-icons/ai'
import Online from './online/Online'
import {users} from '../../DummyData'
import { useEffect,useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {SlUserFollow,SlUserUnfollow} from 'react-icons/sl'
const PF=process.env.REACT_APP_PUBLIC_FOLDER

const HomeRightbar =({user})=>{
 
  return (
    <>
     <div className="birthdaycontainer">
        <div className="birthday">
        <AiOutlineGift className='logo' />
          <span className='birthdaytext'>
            <b>Pablo Eschar</b> and <b>3 others </b> have a birthday today
          </span>
        </div>
        </div>
        <img crossorigin="anonymous" src={`${PF}ad.jpg`} alt="" className='adimage'/>
        <h4 className='onlinefriendsheading mt-4'>Online Friends</h4>
        <div className="rightbartitle">
        <ul className="onlinefriendlists">
          {users.map(u=>(
            <Online key={u.id} user={u}/>
          ))}
          
        </ul>
        </div>
    </>
  )
}

const ProfileRightbar =({user})=>{
    const [friends,setFriends]=useState([])
    const {user:currentUser}=useContext(AuthContext)
    const [followed,setFollowed]=useState(currentUser.following.includes(user?._id))
useEffect(()=>{
  setFollowed(currentUser.following.includes(user?._id))
},[currentUser,user._id])
  useEffect(()=>{
    const getFriends=async()=>{
try {
  const friendList=await axios.get("http://localhost:8800/api/users/friends/"+user._id)

  setFriends(friendList.data) 
} catch (error) {
  console.log("Error in while fetching the friendlist",error)
} 
    }
    getFriends()
  },[user._id])
   const handleClick=async()=>{
    try {
      if(followed){
        await axios.put('http://localhost:8800/api/users/'+user._id+'/unfollow',{userId:currentUser._id})
      }
      else{
        await axios.put('http://localhost:8800/api/users/'+user._id+'/follow',{userId:currentUser._id})
      }
      
    } catch (error) {
      console.log(error)
    }
    setFollowed(!followed)
   }
  return (
    <>
    {
      user.username !==currentUser && (
        <button className='rightbarfollowbutton' onClick={handleClick}>
          {followed ? "Unfollow" :"Follow"}
          {followed ? <SlUserUnfollow /> : <SlUserFollow /> } </button>
      )
    }
    <h2 className='profilerightbartitle'> About</h2>
    <div className="profilerightbarinfo">
      <div className="profilerightbarinfoitem">
        <span className="key">City:</span>
        <span className="value">{user.city}</span>
      </div>
      <div className="profilerightbarinfoitem">
        <span className="key">From:</span>
        <span className="value">{user.from}</span>
      </div>
      <div className="profilerightbarinfoitem">
        <span className="key">Relationship:</span>
        <span className="value">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "In Relationship" :"Gang"}</span>
      </div>
    </div>
    <h2 className="rightbarfriends">Friends</h2>
    <div className="rightbarfollowings">
      {friends.map(friend=>(
        <Link to={'/profile/'+friend.username} style={{textDecoration:"none",color:"black"}}>
   <div className="rightbarfollowing">
   <img crossorigin="anonymous" src={ friend.profilePicture ?`${PF}${friend.profilePicture}` : `${PF}noavatar.png`} className='rightbarfollowingimage' alt="" />
   <span className='rightbarfollowingname'>{friend.username}</span>
 </div>
 </Link>
      ))}
   
        
    </div>
    </>
  )
}

function Rightbar({user}) {
  
  return (
    <div className='rightbar'>
      <div className="rightbarwrapper">
     {user ? <ProfileRightbar user={user} /> : <HomeRightbar user={user} />}
      </div>
    </div>
  )
}

export default Rightbar