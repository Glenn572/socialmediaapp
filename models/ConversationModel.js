const mongoose=require('mongoose')

const ConversationSchema=new mongoose.Schema({
   members:{
    type:Array
   }
},{
    timestamps:true
})
 
mongoose.models={}   //to avoid overwrite error

const Conversationmodel=mongoose.model.posts ||   mongoose.model("conversations",ConversationSchema)
module.exports=Conversationmodel