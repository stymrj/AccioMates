const mongoose = require('mongoose')
const validator = require('validator')

const verifiedMailSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        validate : (mail)=>{
            const isEmail = validator.isEmail(mail)
            if(!isEmail){
                throw new Error('Please Enter a valid email...')
            }
        }
    }
}, { timestamps : true})


const verifiedMails = mongoose.model('verifiedMail', verifiedMailSchema)

module.exports = {
    verifiedMails
}