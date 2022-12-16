import React from 'react'
import './Sidebar.css'
import {MdRssFeed, MdOutlineVideoCall,MdOutlineWork,MdOutlineMenuBook,MdFamilyRestroom} from 'react-icons/md'
import {users} from '../../DummyData'
import CloseFriend from './closefriend/CloseFriend'
function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-wrapper">
        <ul className="sidebarlist">
            <li className="sidebarlistitem">
                <MdRssFeed className='sidebaricon'/>
                <span className='sidebaricontext'>Feed</span>
            </li>
            <li className="sidebarlistitem">
                <MdOutlineVideoCall className='sidebaricon'/>
                <span className='sidebaricontext'>Videos</span>
            </li>
            <li className="sidebarlistitem">
                <MdOutlineWork className='sidebaricon'/>
                <span className='sidebaricontext'>Jobs</span>
            </li>
            <li className="sidebarlistitem">
                <MdOutlineMenuBook className='sidebaricon'/>
                <span className='sidebaricontext'>Courses</span>
            </li>
            <li className="sidebarlistitem">
                <MdFamilyRestroom className='sidebaricon'/>
                <span className='sidebaricontext'>Community</span>
            </li>
        </ul>
        <button className='btn btn-outline-secondary sidebarbutton'>Show More</button>
        <hr />
        <ul className='sidebarfriendlist'>
            {users.map(u=>(
                <CloseFriend key={u.id} user={u}/>
            ))}
        </ul>
        </div>
        </div>
  )
}

export default Sidebar