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
    }
})

const User = mongoose.model('user',userSchema)

module.exports = {
    User
}