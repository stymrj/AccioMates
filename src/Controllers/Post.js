const { Post } = require('../Models/Post')
const { User } = require('../Models/User')

const createPost = async(req,res)=>{
    try {
        const { caption , image } = req.body

        if(!caption && !image){
            throw new Error("Please Provide Either Caption or Image!")
        }
        const createdPost = await Post.create({caption, image, author : req.user._id})

        const user = await User.findById(req.user._id)

        if(!user){
            throw new Error('Not a Valid User')
        }

        user.posts.push(createdPost._id)
        await user.save()


        res.status(201).json({msg:'Post Created!', createdPost})

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const viewPosts = async(req,res)=>{
    try {
        const foundUserPosts = await User.findById(req.user._id).populate('posts')
        res.status(200).json({msg:'Done', foundUserPosts})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const editPost = async(req,res)=>{
    try {
        const { id } = req.params
        const { caption, image} = req.body
        const foundPost =await Post.findById(id)

        if(!foundPost){
            throw new Error('Post Not Found!')
        }

        if(foundPost.author.toSting() !== req.user._id.toSting()){
            throw new Error('Not a Valid User for this Operation')
        }

        const updatedPost = await Post.findByIdAndUpdate(id,{
            caption, image
        }, { new: true })
        res.status(200).json({msg:'Done!', updatedPost})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deletePost = async (req,res)=>{
    try {
        const { id } = req.params
        const foundPost = await Post.findById(id)

        if(!foundPost){
            throw new Error('Post Not Found')
        }

        if(foundPost.author.toString() !== req.user._id.toSting()){
            throw new Error('Not a Valid User for this Operation')
        }

        await Post.findByIdAndDelete(id)
        res.status(201).json({msg:'Post Deleted'})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
   createPost, viewPosts, editPost, deletePost
}