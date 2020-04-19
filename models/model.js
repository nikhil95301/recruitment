const validator = require('validator')
const mongoose = require('mongoose')
const userSchema  = new mongoose.Schema({
name:{
    type:String,
 required: true,
 trim: true
},
email:{
    type:String,
    trim:true,
    required:true,
    validate(value){
        if(!validator.isEmail(value))
        throw new Error('email is not valid')
    }
},
student_number:{
    type:Number,
    required:true,
},
phone:{
    type:Number,
    required:true
},
password:{
    type:String,
    required:true,
    minlength: 8
},
branch:{
    type:String,
    enum:['CSE','IT','cse','it','Cse','It'],
    ignoreCase:true,
    required:true
}
})
module.exports=(mongoose.model('User',userSchema))