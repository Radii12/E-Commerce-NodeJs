const globalError=(err,req,res,next)=>{
    err.statusCode=err.statusCode ||404;
    console.log(err.statusCode)

    err.status=err.status || 'error'
    if(process.env.DOT_NEV='development'){
        sendErrorForDev(err,res)
    }
   
}
const sendErrorForDev=(err,res)=>{
    return res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack,
    })
    
}

module.exports =globalError