
const jwt = require('jsonwebtoken')
const { User } = require('../Models/User')

const isLoggedIn = async (req,res,next)=>{

    try {
        const{ loginToken } = req.cookies
        const foundObj = await jwt.verify(loginToken,process.env.JWT_SECRET)

        const foundUser = await User.findOne({_id:foundObj.id})

        if(!foundUser){
            throw new Error('Please login first!')
        }

        req.user = foundUser
        next()
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    isLoggedIn
}