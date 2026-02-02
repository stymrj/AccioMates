const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../Middleware/isLoggedIn')
const { deletePost, editPost, viewPosts, createPost } = require('../Controllers/Post')

router.post('/post', isLoggedIn,  createPost)

router.get('/getUserPost', isLoggedIn , viewPosts)

router.put('/:id/editPost',isLoggedIn,editPost)


router.delete('/:id/deletePost',isLoggedIn, deletePost)