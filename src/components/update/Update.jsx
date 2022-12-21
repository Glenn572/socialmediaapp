import { useState } from 'react'
import './Update.css'
import axios from 'axios'
import { useContext } from 'react'
import {BiImages} from 'react-icons/bi'
import {AiOutlinePicture} from 'react-icons/ai'
import { AuthContext } from '../../context/AuthContext'

const Update = ({setOpenupdate}) => {
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[desc,setDesc]=useState("")
    const[city,setCity]=useState("")
    const[from,setFrom]=useState("")
    const[relationship,setRelationship]=useState("")
    const [profile,setProfile]=useState(null)
    const [cover,setCover]=useState(null)
    const {user} =useContext(AuthContext)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        
        const updateData={
            userId:user._id,
            username,
            email,
            password,
            desc,
            city,
            from,
    relationship,
           }
           if(profile || !profile || cover || !cover){
            const data=new FormData()
              const profileName= profile.name
              const coverName= cover.name
              data.append("profile",profile)
              data.append("name",profileName)
              data.append("cover",cover)
              data.append("name",coverName)
              updateData.profilePicture=profileName
              updateData.coverPicture=coverName
        try {
            await axios.put("http://localhost:8800/api/users/"+user._id,updateData)
            setOpenupdate(false)
            JSON.stringify(localStorage.setItem('userDetails',user))
        } catch (error) {
           console.log(error) 
        }
    }}
  
  return (
    <div className='update'>
        <button className='close' title ="Close"onClick={()=>setOpenupdate(false)}>X</button>
        <form className='form'>
<input type="text" placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)}/>
<input type="email" placeholder='Email'value={email} onChange={e=>setEmail(e.target.value)}/>
<input type="password" placeholder='Password'value={password} onChange={e=>setPassword(e.target.value)}/>
<input type="text" placeholder='Description'value={desc} onChange={e=>setDesc(e.target.value)}/>
<input type="text" placeholder='City' value={city} onChange={e=>setCity(e.target.value)}/>
<input type="text" placeholder='From'value={from} onChange={e=>setFrom(e.target.value)}/>
<input type="number" placeholder='Relationship'value={relationship} onChange={e=>setRelationship(e.target.value)}/>

<label htmlFor="profile"><AiOutlinePicture title="Profile Picture" className='coverphoto'/>
<input type="file" id='profile' placeholder='ProfilePicture' accept='.png , .jpeg , .jpg ,.webp'  onChange={e=>setProfile(e.target.files[0])} hidden/></label>

<label  htmlFor="cover"><BiImages title="Cover Picture"className='coverphoto'/>
<input  type="file" id='cover' placeholder='CoverPicture' accept='.png , .jpeg , .jpg ,.webp'  onChange={e=>setCover(e.target.files[0])} hidden/></label>
<button onClick={handleSubmit}>Update</button>
        </form>
    </div>
  )
}

export default Update