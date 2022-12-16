import { useState,useEffect } from 'react'
import './Conversation.css'
import axios  from 'axios'
const PF=process.env.REACT_APP_PUBLIC_FOLDER

const Conversation = ({conversation,currentUser}) => {
  const [user,setUser]=useState("")

useEffect(()=>{
    const friendId=conversation.members.find(m=>m !== currentUser._id)
    const getFriends=async()=>{
      try {
        const res=await axios.get('http://localhost:8800/api/users?userId='+friendId)
      setUser(res.data)
    console.log(res.data.username)
      } catch (error) {
        console.log(error)
      } 
    } 
    getFriends()
},[conversation,currentUser])

  return (
    <div className='conversation'>
         <img crossorigin="anonymous" src={`${PF}${user?.profilePicture}`} className='conversationimg' alt="" />
        <span className="conversationname" key={user?._id}>{user?.username}</span>
        
    </div>
  )
}

export default Conversation