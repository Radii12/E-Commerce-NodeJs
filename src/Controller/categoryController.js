const categoryModule = require("../Model/CategorySchema.js");
const handelError = require("../utils/errorHandler");
const ApiError=require("../utils/apiError.js")
const slugify = require("slugify");
const asyncHandler = require('express-async-handler')

//get categories ///////////////////
exports.getCategories = handelError(async (req, res) => {
  const page=req.query.page*1 ||1;
  const limit=req.query.limit*1 || 5;
  const skip=(page-1)*limit;
  console.log(req.query.sort)

  const categories=await categoryModule.find().skip(skip).limit(limit)
  
  res.status(200).json({results: categories.length,page,data:categories})
});
//Create Category //////////////////
exports.createCategory = handelError(async (req, res) => {
  let {name,slug}=req.body
  console.log(req.body)
  const add = await categoryModule.create({name,slug:slugify(name),createdBy,image});
  if(add){
    res.json("Done")

  }
  else{
    res.json("error")
  }
});
//getSpecificCategory by id 
exports.getSpecificCategory=asyncHandler(async (req,res,next)=>{
    const {id}=req.params
  const category=await categoryModule.findById(id)
  if (!category){
return next(new ApiError(`"There is no category with this id" ${id}`),404)
  }
  else{
    res.status(200).json({data:category})
  }
})


  exports.updateSpecificCategory = asyncHandler(async (req,res,next)=>
  {
      const{id}=req.params;
      if(req.body.name){
          req.body.slug=slugify(req.body.name);
      }
      const updatedCategory=await categoryModule.findOneAndUpdate({_id:id},
      {
      name:req.body.name,
      role:req.body.role,
      createdBy:req.body.createdBy,
      
      }
      ,{new:true});
  
  
      if(!updatedCategory)
      {
          return next(new ApiError(`No Product for this id ${id}`,404));
  
      }
  res.status(200).json({data:updatedCategory});
  
  });
  exports.deleteSpecificCategory=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const deleteCategory= await categoryModule.findByIdAndDelete(id)
    if(!deleteCategory){
      return next(new ApiError(`"There is no category with this id" ${id}`),404)    }
    else{
      res.send()
    }
  })


