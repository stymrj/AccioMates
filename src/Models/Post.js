const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'user'
    },
    caption : {
        type : String,
        maxLength : 500,
        trim : true
    },

    image : [{
        type : String
    }],

//comments

    comments : [{
        user: {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
        },
        text : {
            type : String,
            maxLength : 500
        },
        createdAt : {
            type : Date,
            default : Date.now
        }
    }],

    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        unique : true //It will not store duplicate
    }]

},{timestamps : true})

const Post = mongoose.model('post', postSchema)

module.exports = {
    Post
}