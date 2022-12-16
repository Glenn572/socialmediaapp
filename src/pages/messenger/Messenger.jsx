import './Messenger.css'
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import Chatonline from '../../components/chatonline/Chatonline'
import { useContext ,useState,useEffect,useRef} from 'react'
import { AuthContext } from '../../context/AuthContext'
import {io} from 'socket.io-client'
import axios from 'axios'


 function Messenger() {
    const [conversations,setConversations]=useState([])
    const [currentChat,setCurrentChat]=useState("")
    const [messages,setMessages]=useState([])
    const [newmessage,setNewmessage]=useState('')
    const [arrivalmessage,setArrivalmessage]=useState('')
    const [onlineusers,setOnlineusers]=useState([])
    const socket=useRef()
    const {user}=useContext(AuthContext)
    const scrollRef=useRef()

    useEffect(()=>{
        socket.current=io("ws://localhost:8900")
        socket.current.on('getMessages',data=>{
setArrivalmessage({
    sender:data.senderId,
    text:data.text,
    createdAt:Date.now()
})
        })
    },[])


    useEffect(()=>{
arrivalmessage && currentChat?.members.includes(arrivalmessage.sender) &&
setMessages(prev=>[...prev,arrivalmessage])
    },[arrivalmessage,currentChat])
    //sending user id to socket server
    useEffect(()=>{
        socket.current.emit('addUser',user._id)
        socket.current.on('getUsers',users=>{
           setOnlineusers(
            user.following.filter(f=>users.some(u=>u.userId === f))
           )
        })
    },[user])
 
   
    useEffect(()=>{
        const getConversations=async()=>{
            try {
                const res=await axios.get("http://localhost:8800/api/conversations/"+user._id)
                setConversations(res.data)
            } catch (error) {
                console.log(error);
            }

        }
        getConversations()
    },[user._id])
    


    useEffect(()=>{
        const getMessages=async()=>{
            try {
                const res=await axios.get("http://localhost:8800/api/messages/"+currentChat?._id) 
                setMessages(res.data)
            } catch (error) {
             console.log(error);
            }
        }
        getMessages()
    },[currentChat])
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])


   const handleSubmit=async(e)=>{
    e.preventDefault()
    const message={
        sender:user._id,
        text:newmessage,
        conversationId:currentChat._id
    }
    const receiverId=currentChat.members.find(m=>m !== user._id)
    socket.current.emit('sendMessage',{
        senderId:user._id,
        receiverId,
        text:newmessage
    })
    try {
       const res=await axios.post('http://localhost:8800/api/messages',message) 
       setMessages([...messages,res.data])
       setNewmessage('')
    } catch (error) {
        
    }
   }

    return (
    <>
    <Topbar />
    <div className='messenger'>
        <div className="chatmenu">
        <div className="chatmenuwrapper">
            <input type="text" placeholder='search for friends' className='chatmenuinput' />
            {conversations.map(c=>(
                <div onClick={()=>setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user}/>
                </div>
            ))}
        </div>
        </div>
        
        <div className="chatbox">
        <div className="chatboxwrapper">
{currentChat ? 
<>
            <div className="chatboxtop">
                {messages.map(m=>(
                    <div ref={scrollRef}>
 <Message message={m} own={m.sender === user._id}/>
 </div>
                ))}
               
                </div>
                </> : (
                <span className='noconversationtext'>Open a New conversation here!!!</span>)
 }

            <div className="chatboxbottom">
                <textarea className='chatmessageinput'  value={newmessage} placeholder='Write Something!!' onChange={e=>setNewmessage(e.target.value)}></textarea>
                <button className='chatsubmitbutton' onClick={handleSubmit}>Send</button>
            </div>
        </div>
        </div>
        <div className="chatonline">
        <div className="chatonlinewrapper">
            <Chatonline 
            onlineusers={onlineusers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
            />
        </div>
        </div>
    </div>
    </>
  )
}


export default  Messenger 


