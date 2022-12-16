import './CloseFriend.css'
const PF=process.env.REACT_APP_PUBLIC_FOLDER
function CloseFriend({user}) {
 
  return (
    <div>
         <li className='sidebarfriendlistitem'>
                <img crossorigin="anonymous"src={PF+user.profilepicture} alt="" className='sidebarfriendimage'/>
                <span className="sidebarfriendname">{user.username}</span>
            </li>
    </div>
  )
}

export default CloseFriend