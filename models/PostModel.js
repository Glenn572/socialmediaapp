const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]

    }
},{
    timestamps:true
})
 
mongoose.models={}   //to avoid overwrite error

const Postmodel=mongoose.model.posts ||   mongoose.model("posts",PostSchema)
module.exports=Postmodel