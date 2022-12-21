import './Post.css'
import {MdOutlineMoreVert} from 'react-icons/md'
import {AiFillLike ,AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import {BiCommentDetail} from 'react-icons/bi'
import {RiShareForwardFill} from 'react-icons/ri'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Comment from '../comment/Comment'

const PF=process.env.REACT_APP_PUBLIC_FOLDER

function Post({post}) {
    const[like,setLike]=useState(post.likes.length)
    const[isLiked,setIsLiked]=useState(false)
    const [user,setUser]=useState({})
    const {user:currentUser}=useContext(AuthContext)
    const [commentopen,setCommentopen]=useState(false)

    // useEffect(()=>{
    //     setIsLiked(post.likes.includes(currentUser._id))
    // },[currentUser._id,post.likes])

    useEffect(()=>{
        const fetchUser=async ()=>{
          const res=await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`)
          setUser(res.data)
        }
    fetchUser()
      },[post.userId]) 
    

    const handleLike =()=>{
        try {
            axios.put("http://localhost:8800/api/posts/"+  post._id+"/like",{userId:currentUser._id})
        } catch (error) {
            
        }
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }

  return (
    <div className='post'>
        <div className="postwrapper">
            <div className="posttop">
            <div className="posttopleft">
            
            <Link to={`/profile/${user.username}`}>    <img crossorigin="anonymous" src={`${PF}${user.profilePicture}` || `${PF}noavatar.png`}className='posttopleftimage' alt="" /></Link>   
                <span className='postusername'>{user.username}</span>
                <small className='postdate'>{format(post.createdAt)}...</small>
                
            </div>
            <div className="posttopright">
                <MdOutlineMoreVert />
            </div>
            </div>
            <div className="postcenter">
                <span className='postcentertext'>{post.desc}</span>
                <img crossorigin="anonymous" src={PF+post.img} alt="" className='postcenterimage'/>
            </div>
            <div className="postbottom">
                <div className="postbottomleft">
                    <div className='likes'>
                 {
                    isLiked ? <AiFillHeart className='heart' onClick={handleLike}/> : <AiOutlineHeart className='heart' onClick={handleLike}/>
                  } 
                    
                    <span  className='postlikecounter'>{like} likes</span>
                    </div>
                    <div className="likes" onClick={()=>setCommentopen(!commentopen)}>
                    <span className="postcommenttext"><BiCommentDetail /> </span>
                    <span>comments</span>
                    </div>
                    <div className='likes'>
                        <span className='share'><RiShareForwardFill /></span>
                        <span>Share</span>
                    </div>        
                </div>  
                  </div>
                  {commentopen && <Comment />}
        </div>
         
            </div>
      
  )
}

export default Post