const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength : 2,
        maxLength : 10,
        trim : true
    },
    lastName : {
        type: String,
        minLength : 2,
        maxLength : 10,
        trim : true
    },
    username : {
        type : String,
        unique : true,
        minLength : 2,
        maxLength : 10,
        required : true,
        immutable : true
    },
    email : {
        type : String,
        validate : (email)=>{
            const isValidEmail = validator.isEmail(email)
            if(!isValidEmail){
                throw new Error('Please Enter a Valid Email')
            }
        }
    },
    password : {
        type : String,
        validate : (password)=>{
            const isStrongPassword = validator.isStrongPassword(password)
            if(!isStrongPassword){
                throw new Error('Please use a Strong Password!')
            }
        }
    },
    role : {
        type : String,
        enum : ['Faculty','Student','Admin','Employee']
    },
    phoneNumber : {
        type : String,
        validate : (phoneNumber)=>{
            const isValidPhoneNumber = validator.isMobilePhone(phoneNumber)
            if(!isValidPhoneNumber){
                throw new Error('Please use a valid Phone Number')
            }
        }
    },
    post : [{
        
    }],

    bio : {
        type : String,
        minLength : 10,
        maxLength : 500
    },
    postCount : {
        type : Number,
        default : 0
    },

    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }],

    following : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }],

    profilePicture : {
        type : String,
        default : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s'
    }

}, { timestamps : true} )

const User = mongoose.model('user',userSchema)

module.exports = {
    User
}