const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    text : {
        type : String,
        maxLength : 1500,
        trim : true
    }
},{timestamps:true})

const Message = mongoose.model('message',messageSchema)

module.exports = {
    Message
}