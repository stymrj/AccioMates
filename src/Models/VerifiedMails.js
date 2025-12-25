const mongoose = require('mongoose')
const validator = require('validator')

const verifiedMailSchema = new mongoose({
    mail : {
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


const verifiedMails = mongoose.model('VerifiedMail', verifiedMailSchema)

module.exports = {
    verifiedMails
}