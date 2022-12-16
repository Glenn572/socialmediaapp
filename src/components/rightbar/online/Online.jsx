import React from 'react'
import './Online.css'

function Online({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div>
<li className="onlinefriendlistitem">
          <div className="onlinefriendcontainer">
            <img crossorigin="anonymous" className='onlinefriend'
          src={PF+user.profilepicture} alt="" />
          <span className="online"></span>
          </div>
          <span className='onlinefriendname'>{user.username}</span>
          </li>
    </div>
  )
}

export default Online