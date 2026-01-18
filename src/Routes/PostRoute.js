const express = require('express')
const { Post } = require('../Models/Post')
const router = express.Router()
const { isLoggedIn } = require('../Middleware/isLoggedIn')

router.post('/post', isLoggedIn,  async(req,res)=>{
    try {
        const { caption , image } = req.body

        if(!caption && !image){
            throw new Error("Please Provide Either Caption or Image!")
        }
        const createdPost = await Post.create({caption, image, author : req.user._id})
        res.status(200).json({msg:'done', createdPost})

    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

