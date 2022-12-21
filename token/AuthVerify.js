const {tokenValidator} =require('./token')

module.exports=async(req,res,next)=>{
    try {
        const {jwt}=req.cookies
        const valid=await tokenValidator(jwt)
        if(valid){
            next()
        }
    } catch (error) {
        res.send(403).json("Access Denied")
    }
   

}