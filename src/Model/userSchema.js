const { string } = require('joi');
const mongoose=require('mongoose');

const userModule=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isVerify:{
        type:Boolean,
        default:false,
        isActive:{
            type:Boolean,
            default:true
        },
    },
    role:{
        type:String,
        default:"user"
    },
    address:[]
},


{
timestamps:true
}
)
const user=mongoose.model('User',userModule);
module.exports=user;