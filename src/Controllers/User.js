const { User } = require("../Models/User")


const getUserData = async(req,res)=>{
    try {
        const foundUser =await User.findById(req.user._id)

        if(!foundUser){
            throw new Error('User Not Foundd')
        }
        res.status(200).json({success: true, foundUser})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}


const updateProfile = async(req,res)=>{
    try {
        const foundUser =await User.findById(req.user._id)

        const { firstName, lastName, username} = req.body

        if(!foundUser){
            throw new Error('User not found!')
        }
        const updatedProfile = await User.findByIdAndUpdate(req.user._id,{
            firstName,lastName,username
        })

        res.status(200).json({msg:'done', updatedProfile})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getUserData, updateProfile
}