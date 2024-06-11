
const user=require ("../Model/userSchema");

exports.isAdmin=()=>{
return async(req,res,next)=>{
    console.log(req.userId)
    
    let findAdmin=await user.findById(req.userId);
    if(findAdmin.role=="admin")
    {
        
        next()
    }
    else{
        return res.json({message:"Access deny You are not admin"})
}
}


}