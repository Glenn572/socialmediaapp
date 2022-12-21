const jwt=require('jsonwebtoken')

const tokenGenerator=(email)=>{
    const token= jwt.sign({email},process.env.SECRET_KEY,{expiresIn:"3hours"})
    return token
}
const tokenValidator=async(token)=>{
    try {
       const data=jwt.verify(token,process.env.SECRET_KEY) 
       return data
    } catch (error) {
        return false
    }
}

module.exports.tokenGenerator=tokenGenerator
module.exports.tokenValidator=tokenValidator