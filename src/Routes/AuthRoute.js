const express = require("express");
const router = express.Router();

const { userSignIn, userSignOut, userSignUp } = require("../Controllers/Auth");
const { isLoggedIn } = require("../Middleware/isLoggedIn");
const { getUserData, updateProfile } = require("../Controllers/User");


router.post("/signup",userSignUp );
router.post('/signin',userSignIn)
router.post('/signout',userSignOut)

router.get('/me', isLoggedIn, getUserData)
router.patch('/profile', isLoggedIn , updateProfile)


module.exports = {
  authRouter: router,
};
