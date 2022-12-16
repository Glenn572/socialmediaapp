const mongoose=require('mongoose')

const MessageSchema=new mongoose.Schema(
    {
        conversationId:{type:String},
        sender:{type:String},
        text:{type:String}
    }

    ,{
    timestamps:true
})
 
mongoose.models={}   //to avoid overwrite error

const Messagemodel=mongoose.model.posts ||   mongoose.model("messages",MessageSchema)
module.exports=Messagemodel