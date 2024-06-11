// const joi=require("joi")
const user=require("../Model/userSchema")
const asyncHandler = require('express-async-handler')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const slugify=require("slugify")
const sendOrEmail=require("../utils/sendMail")
exports.userSignUp= asyncHandler(async (req,res)=>{
    console.log(req.body.address)
    let {name,email,password,address}=req.body
    const founded= await user.findOne({email})
    
        if(founded)
        {
            res.json({message:"user is exist"})
        }
        else{
            let hashPass=bcrypt.hashSync(password,10)
            console.log(hashPass)
            let insert= await user.insertMany({name,email,password:hashPass,address})
            //send email
            let token= jwt.sign({id:insert[0]._id},"verifyaccount");
            sendOrEmail({email,url:`http://localhost:3000/verify/${token}`});
            res.json({message:"user is added successful",insert})
        }
        
    })
    exports.login=asyncHandler(async (req,res)=>{
        let {email,password}=req.body

            const userFind=await user.findOne({email})
            console.log(userFind)
            if(!userFind||userFind==false) return res.json({message:"the user is not found plz register first or verify your account"})
                let passMach=bcrypt.compareSync(password,userFind.password)
            if (passMach)
            {
                let token=jwt.sign({id:userFind._id,name:userFind.name},"iti")
                res.json({message:"login successful",token})
            }
                else
                {
                    res.json({message:"the password is not correct"})
                }
        }
    )
    
    exports.verifyAccount =  (req,res)=>{
        jwt.verify(req.params.token,"verifyaccount",async(err,decoded)=>{
            if(err) return res.json({message:"token err"})
        let apdateUser=await user.findByIdAndUpdate(decoded.id,{isVerify:true},{new:true})
        res.json({message:"done",apdateUser})
        })
    }

    exports.getInfo= asyncHandler(async(req,res)=>{
        const ifo= await user.findById({_id:req.userId})
        res.json({message:"the Info ",ifo})
    })

    exports.updateUser = asyncHandler(async (req,res,next)=>
{
    const{id}=req.params;
    if(req.body.name){
        req.body.slug=slugify(req.body.name);
    }
    const User=await user.findOneAndUpdate({_id:id},
    {
    name:req.body.name,
    role:req.body.role,
    isVerify:req.body.isVerify,
    address:req.body.address,
    }
    ,{new:true});


    if(!user)
    {
        return next(new ApiError(`No user for this id ${id}`,404));

    }
res.status(200).json({data:User});

});
exports.deleteSpecificUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deleteUser = await user.findByIdAndDelete(id);
    if (!deleteUser) {
      return next(new ApiError(`"There is no user with this id" ${id}`), 404);
    } else {
      res.status(204).send();
    }
  });
