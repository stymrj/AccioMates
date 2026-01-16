const mongoose = require('mongoose')
const validator = require('validator')

const OTPSchema = new mongoose.Schema({
    otp : {
        type : String,
        minLength : 6,
        maxLength :6,
        required : true
    },

    email : {
        type : String,
        required : true,
        validate : (val)=>{
            const isEmail = validator.isEmail(val)

            if(!isEmail){
                throw new Error('Please enter a valid email...')
            }
        }
    },

    createdAt : {
        type : Date,
        default : Date.now,
        expires : 120
    }

})

const OTP = mongoose.model('otp', OTPSchema)


module.exports = {
    OTP
}