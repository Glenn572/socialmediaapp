import './Message.css'
import {format} from 'timeago.js'
const PF=process.env.REACT_APP_PUBLIC_FOLDER

const Message = ({message,own}) => {
  return (
    <div className={own ? 'message own' : 'message'}>
        <div className="messagetop">
            <img src={`${PF}kanepro.jpg`} className="messageimg"
             alt="" />
             <p className='messagetext'>{message.text}</p>
        </div>
        <div className="messagebottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message