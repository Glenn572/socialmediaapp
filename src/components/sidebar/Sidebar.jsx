import React from 'react'
import './Sidebar.css'
// import {MdRssFeed, MdOutlineVideoCall,MdOutlineWork,MdOutlineMenuBook,MdFamilyRestroom} from 'react-icons/md'
import {users} from '../../DummyData'
import CloseFriend from './closefriend/CloseFriend'
import friend from '../../assests/friend.png'
import group from '../../assests/2.png'
import market from '../../assests/3.png'
import watch from '../../assests/4.png'
import memories from '../../assests/5.png'
import events from '../../assests/6.png'
import gaming from '../../assests/7.png'
import gallery from '../../assests/8.png'
import videos from '../../assests/9.png'
import msg from '../../assests/10.png'
import tut from '../../assests/11.png'
import courses from '../../assests/12.png'
import fund from '../../assests/13.png'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
const PF=process.env.REACT_APP_PUBLIC_FOLDER
function Sidebar() {
    const {user} =useContext(AuthContext)
  return (
    <div className='sidebar'>
        <div className="sidebar-wrapper">
        <ul className="sidebarlist">
            <li className="sidebarlistitem">
                <img className="sidebarprofilepic"src={`${PF}${user.profilePicture}`} alt="" />
                
                <span className='sidebaricontext'>{user.username}</span>
            </li>
            <li className="sidebarlistitem">
                <img className="sidebarimg"src={friend} alt="" />
                <span className='sidebaricontext'>Friends</span>
            </li>
            <li className="sidebarlistitem">
                <img className="sidebarimg"src={group} alt="" />
                
                <span className='sidebaricontext'>Groups</span>
            </li>
            <li className="sidebarlistitem">
                <img className="sidebarimg"src={market} alt="" />
                
                <span className='sidebaricontext'>Marketplace</span>
            </li>
            <li className="sidebarlistitem">
                <img className="sidebarimg"src={watch} alt="" />
                
                <span className='sidebaricontext'>Watch</span>
            </li>
            <li className="sidebarlistitem">
                <img className="sidebarimg"src={memories} alt="" />
                
                <span className='sidebaricontext'>Memories</span>
            </li>
        </ul>
         <hr />
         <div className='shortcuts'>
            <span className='shortcutsheading' >Your Shortcuts</span> 
            <ul className="sidebarlist shortcutslist">
            <li className="sidebarlistitem">
                <img className="sidebarprofilepic"src={events} alt="" />
                <span className='sidebaricontext'>Events</span>
            </li>
            <li className="sidebarlistitem">
                <img className="sidebarprofilepic"src={gaming} alt="" />
                <span className='sidebaricontext'>Gaming</span>
            </li>
            <li className="sidebarlistitem">
                <img className="sidebarprofilepic"src={gallery} alt="" />
                <span className='sidebaricontext'>Gallery</span>
            </li>
            <li className="sidebarlistitem">
                <img className="sidebarprofilepic"src={videos} alt="" />
                <span className='sidebaricontext'>Videos</span>
            </li>
            <li className="sidebarlistitem">
                <img className="sidebarprofilepic"src={msg} alt="" />
                <span className='sidebaricontext'>Messages</span>
            </li>
            </ul>
         </div>
         <hr />
         <div className='others'>
            <span>Others</span>
            <ul className="sidebarlist shortcutslist">
            <li className="sidebarlistitem">
                <img className="sidebarprofilepic"src={fund} alt="" />
                <span className='sidebaricontext'>FundRaiser</span>
            </li>
            <li className="sidebarlistitem">
                <img className="sidebarprofilepic"src={tut} alt="" />
                <span className='sidebaricontext'>Tutorials</span>
            </li>
            <li className="sidebarlistitem">
                <img className="sidebarprofilepic"src={courses} alt="" />
                <span className='sidebaricontext'>Courses</span>
            </li>
            </ul>
         </div>
     
        {/* <ul className='sidebarfriendlist'>
            {users.map(u=>(
                <CloseFriend key={u.id} user={u}/>
            ))}
        </ul> */}
        </div>
        </div>
  )
}

export default Sidebar