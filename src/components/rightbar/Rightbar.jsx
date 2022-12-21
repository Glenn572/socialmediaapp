import React from 'react'
import './Rightbar.css'
import Online from './online/Online'
import {users} from '../../DummyData'
import { useEffect,useState } from 'react'
import axios from 'axios'
import pro1 from '../../assests/pro1.jpg'
import pro4 from '../../assests/pro4.jpg'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {SlUserFollow,SlUserUnfollow} from 'react-icons/sl'
import Update from '../update/Update'
const PF=process.env.REACT_APP_PUBLIC_FOLDER

const HomeRightbar =({user})=>{
 
  return (
    <>
     <div className="birthdaycontainer">
        <div className="birthday">
          <span className='birthdaytext'>
            Suggestions for you 
          </span>
          <div className="rightbartitle">
            <div className="user">
                <div className="userinfo">
<img className="suggestionimg"src={pro1} alt="" />
<span>John Doe</span>
                </div>
                <div className='buttons'>
                  <button>Follow</button>
                  <button>Dismiss</button>
                </div> 
              </div>
              <div className="user">
                <div className="userinfo">
<img className="suggestionimg"src={pro4} alt="" />
<span>Jaden Smith</span>
                </div>
                <div className='buttons'>
                  <button>Follow</button>
                  <button>Dismiss</button>
                </div> 
              </div>
         
        </div>
        </div>
        <div className='birthday'>
          <span>Latest Activities</span>
          <div className="activites">
                <div className="userinfo">
<img className="activityimg"src={pro1} alt="" />
<p>
<span>John Doe</span> sends you a request
</p>
<div className="time">
<span className='time'>1 min ago</span></div>
                </div>
                 </div>
                 <div className="activites">
                <div className="userinfo">
<img className="activityimg"src={pro1} alt="" />
<p>
<span>John Doe</span> liked your profile
</p>
<div className="time">
<span >30 mins ago</span>
</div>

                </div>
                 </div>
                 <div className="activites">
                <div className="userinfo">
<img className="activityimg"src={pro1} alt="" />
<p>
<span>John Doe</span> liked a post
</p>
<div className="time">
<span className='time'>1 hour ago</span></div>
                </div>
                 </div>
                 <div className="activites">
                <div className="userinfo">
<img className="activityimg"src={pro1} alt="" />
<p>
<span>John Doe</span> unfollowed you
</p>
<div className="time">
<span className='time'>2 hour ago</span></div>
                </div>
                 </div>
        </div>
        <div className="birthday">
        <h4 className='onlinefriendsheading mt-4'>Online Friends</h4>
        <div className="rightbartitle">
        <ul className="onlinefriendlists">
          {users.map(u=>(
            <Online key={u.id} user={u}/>
          ))}
          
        </ul>
        </div>
        </div>
        </div>
             
    </>
  )
}

const ProfileRightbar =({user})=>{
    const [friends,setFriends]=useState([])
    const [openupdate,setOpenupdate]=useState(false)
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
          {followed ? "Following" :"Follow"}
          {followed ? <SlUserUnfollow /> : <SlUserFollow /> } </button>
      )
    }
     <button onClick={()=>setOpenupdate(true)} className='updatebutton'>Update</button>
      {openupdate && <Update setOpenupdate={setOpenupdate}/>}
    <div className="profilecontainer">
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
    </div>
    <div className='friendscontainer'>
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