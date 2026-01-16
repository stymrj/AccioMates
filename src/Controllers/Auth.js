const validator = require("validator");
const bcrypt = require('bcrypt');
const { User } = require("../Models/User");
const jwt = require('jsonwebtoken');

const userSignUp = async (req, res) => {
  try {
    const { firstName,lastName,username,email,password,role,phoneNumber} = req.body
    if(!firstName){
      throw new Error("Please Enter First Name");
    }
    if(!username){
      throw new Error("Please Enter A Valid Username");
    }
    if(!password){
      throw new Error("Please Enter password");
    }
    const isValidEmail = validator.isEmail(email);
    if(!isValidEmail){
      throw new Error("Please Enter a Valid Email..");
    }

    const isValidPhone = validator.isMobilePhone(phoneNumber);
    if(!isValidPhone){
      throw new Error("Please Enter a Valid Phone Number...");
    }

    const isStrongPassword = validator.isStrongPassword(password)
    if(!isStrongPassword){
        throw new Error('Please Enter a Strong Password')
    }

    const hashedPassword = await bcrypt.hash(password,10)

    //now fetching data from Database
    const foundData = await User.findOne({
      $or:[
        {username},
        {email}
      ]
    })

    if(foundData){
        throw new Error('User already exist!')
    }

    const createdUser = await User.create({firstName,lastName,username,email,password : hashedPassword,role,phoneNumber})

    res.status(201).json({Success : true, createdUser})

  } catch(error){
    res.status(400).json({error:error.message})
  }
}

const userSignIn =  async (req,res)=>{
    try {
        const{username , password } = req.body
    if(!username){
        throw new Error('Please Enter your username')
    }
    if(!password){
        throw new Error('Please Enter your password')
    }

    const foundUser = await User.findOne({username})
    if(!foundUser){
        throw new Error('User not exits')
    }

    const isValidUser = await bcrypt.compare(password, foundUser.password )

    if(!isValidUser){
        throw new Error('Incorrect Password!')
    }

    const token = jwt.sign({id:foundUser._id},process.env.JWT_SECRET)
    const { firstName,lastName, email, role,phoneNumber } = foundUser

    res.cookie(
      'loginToken',token,{ 
        httpOnly: true,
        secure: true,         
        sameSite: 'none',
        maxAge:24*60*60*1000}
    ).status(200).json({msg:'User Logged IN', data: {firstName,lastName, email, role,phoneNumber}})

    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

const userSignOut = async(req,res)=>{
    try {
        res.cookie('loginToken',null).status(200).json({msg:'User Logged Out'})
    } catch (error) {
         res.status(400).json({error:error.message})
    }
}

module.exports = {
   userSignUp, userSignIn, userSignOut
}