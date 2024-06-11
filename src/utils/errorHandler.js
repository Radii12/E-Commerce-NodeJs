let handelError=(func)=>{
    return (req,res,next)=>{
        func(req,res).catch(err=>res.json({err}))
    }
}
module.exports=handelError;
