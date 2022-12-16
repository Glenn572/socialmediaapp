import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './Chatonline.css'
const PF=process.env.REACT_APP_PUBLIC_FOLDER

const Chatonline = ({onlineusers,currentId,setCurrentChat}) => {
    const [friends,setFriends]=useState([])
const [onlineFriends,setOnlineFriends]=useState([])

useEffect(()=>{
    const getFriends=async()=>{
        try {
            const res=await axios.get('http://localhost:8800/api/users/friends/'+currentId) 
            setFriends(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    getFriends()
},[currentId])


useEffect(()=>{
setOnlineFriends(friends.filter(f=>onlineusers.includes(f._id)))
},[onlineusers,friends])

const handleClick=async(user)=>{
    try {
        const res=await axios.get(`http://localhost:8800/api/conversations/find/${currentId}/${user._id}`)
        setCurrentChat(res.data)
    } catch (error) {
        
    }
}

  return (
    <div className='chatonline'>
        <h2 >Online Friends</h2>
        {onlineFriends.map(o=>(
 <div className="chatonlinefriend" onClick={()=>handleClick(o)}>
 <div className="chatonlineimgcontainer">
     <img className='chatonlineimg' crossorigin="anonymous" src={`${PF}${o?.profilePicture}`} alt="" />
     <div className="chatonlinebadge"></div>
 </div>
<span className="chatonlinename">{o?.username}</span>
</div>
        ))}
       
       
    </div>
  )
}

export default Chatonline