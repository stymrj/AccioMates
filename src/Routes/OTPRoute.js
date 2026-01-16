const express = require("express");
const router = express.Router();


router.post("/send-otp", sendOTP);
router.post('/verify-otp', verifyOTP)



module.exports = {
    otpRouter : router
}
