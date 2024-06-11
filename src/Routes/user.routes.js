const express = require("express");
const {userSignUp,login,verifyAccount,update,getInfo, getSpecificUser, updateUser, deleteSpecificUser}=require("../Controller/userControlar.js")
const { auther } =require( "../Middleware/auth.js");
const {validation} = require("../Model/validation.js")
 const { loginSchema, signUpSchema } =require( "../utils/validator/userValidator.js");
const { isAdmin } = require("../Middleware/isAdmin.js");
const userRout =express.Router();
userRout.post("/signup",validation(signUpSchema),userSignUp)
userRout.post("/login",validation(loginSchema),login)
userRout.post("/update/:id",auther(),isAdmin(),updateUser)
userRout.get("/getuser",auther(),validation(getInfo))
userRout.get("/deleteuser/:id",auther(),isAdmin(),deleteSpecificUser)


module.exports=userRout
