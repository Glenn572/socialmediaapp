import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Comment.css'
const PF=process.env.REACT_APP_PUBLIC_FOLDER
const Comment = () => {
    const {user}=useContext(AuthContext)
    //Temporary
    const comments=[
        {
            id:1,
            desc:'Lorem ipsum dolor sit amet consecteturore!',
            name:"John Doe",
            userId:1,
            profilePicture:`${PF}pro1.jpg`
        },
        {
            id:2,
            desc:'Lorem ipsum dolor sit amet equi ea! At.',
            name:"Jaden Smith",
            userId:2,
            profilePicture:`${PF}pro2.jpg`
        }
    ]
  return (
    <div className='comments'>
<div className="write">
    <img className="commentimg" src={`${PF}${user.profilePicture}`} alt="" />
    <input className='text' type="text" placeholder='Write your comment' />
    <input className='submit' type="submit" value="Send" />
</div>
        {
            comments.map(c=>(
            <div className="comment">
                <img className='commentimg'src={c.profilePicture} alt="" />
                  <div className='info'>
                    <span className='name'>{c.name}</span>
                    <p className='desc'>{c.desc}</p>
                </div>
                <div className="bottom">
                <span className='date'>1 hour ago</span> 
                </div>
                </div>
            ))
        }
    </div>
  )
}

export default Comment