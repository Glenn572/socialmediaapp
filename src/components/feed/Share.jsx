import './Share.css'
import {MdPermMedia,MdLocationPin,MdEmojiEmotions} from 'react-icons/md'
import {AiFillTag} from 'react-icons/ai'
import { useContext, useRef ,useState} from 'react'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import {MdCancel} from 'react-icons/md'
const PF=process.env.REACT_APP_PUBLIC_FOLDER

function Share() {
    const {user}=useContext(AuthContext) 
    const desc=useRef()
    const [file,setFile]=useState(null)

    const submitHandler=async(e)=>{
        e.preventDefault()
        const newPost={
            userId:user._id,
            desc:desc.current.value
        }
        if(file){
            const data=new FormData()
            const fileName= file.name
            data.append("file",file)
            data.append("name",fileName)
            newPost.img=fileName
            try {
                await axios.post('http://localhost:8800/api/upload',data)
            } catch (error) {
                console.log("Error in uploading the photo",error);
            }
        }
              try {
            await axios.post('http://localhost:8800/api/posts',newPost)
            window.location.reload()
        } catch (error) {
            console.log("Error in uploading the post",error);
        }
    }
  return (
    <div className='share'>
        <div className="share-wrapper">
            <div className="sharetop">
                <img  crossorigin="anonymous"src={user.profilePicture ? `${PF}${user.profilePicture}` :`${PF}noavatar.png`}  className='shareimage'alt="" />
                <input type="text" className='shareinput'placeholder={`Whats in your mind ${user.username}?`} 
                ref={desc}/>
            </div>
            <hr className='sharehr'/>
            {file && (
                <div className="shareimgcontainer">
                <img className='shareimg' src={URL.createObjectURL(file)} alt="" />
                <MdCancel className='shareimgcancel' onClick={()=>setFile(null)} />
            </div>
            )}
            
            <form className="sharebottom" onSubmit={submitHandler}>
                <div className="shareoptions">
                    <label htmlFor='file' className="shareoption">
                        <MdPermMedia className='shareicon photo'/>
                        <span className='sharetext'>Photo/Video</span>
                        <input type="file" id="file" accept='.png , .jpeg , .jpg ,.webp' 
                        onChange={e=>setFile(e.target.files[0])}
                        hidden 
                        />
                    </label>
                    <div className="shareoption">
                        <AiFillTag className='shareicon tag'/>
                        <span className='sharetext'>Tag</span>
                    </div>
                    <div className="shareoption">
                        <MdLocationPin className='shareicon location'/>
                        <span className='sharetext'>Loation</span>
                    </div>
                    <div className="shareoption">
                        <MdEmojiEmotions className='shareicon emoji'/>
                        <span className='sharetext'>Feelings</span>
                    </div>
                    <button className="sharebutton" type='submit'>Share</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Share