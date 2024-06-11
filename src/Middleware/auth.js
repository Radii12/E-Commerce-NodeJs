const jwt=require ("jsonwebtoken")
exports.auther=(req,res)=>{
    // console.log(req.headers.token)
    return (req,res,next)=>{

        jwt.verify(req.headers.token,"iti",(err,decode)=>{
            if(err)
            return res.json({message:"invalid token"})
            else{
                req.userId=decode.id
                next()
            }
        })
    }
}