const nodemailer = require("nodemailer");
const { verifiedMails } = require("../Models/VerifiedMails");
const { OTP } = require("../Models/OTP");
const { sendOTP, verifyOTP } = require("../Controllers/OTP");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const foundMail = await verifiedMails.findOne({ email });
    if (foundMail) {
      throw new Error("Email Already Verified.");
    }

    let otp = "";
    for (let i = 1; i <= 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    //console.log(otp)

    await OTP.create({ email, otp });

    const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>OTP Verification</title>
<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #f4f6f8;
    font-family: Arial, Helvetica, sans-serif;
  }
  .container {
    max-width: 600px;
    margin: 30px auto;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  }
  .header {
    background: linear-gradient(135deg, #4f46e5, #6366f1);
    padding: 25px;
    text-align: center;
    color: #ffffff;
  }
  .header h1 {
    margin: 0;
    font-size: 26px;
    letter-spacing: 1px;
  }
  .content {
    padding: 30px;
    color: #333333;
  }
  .content h2 {
    margin-top: 0;
    font-size: 22px;
  }
  .content p {
    font-size: 15px;
    line-height: 1.6;
    color: #555555;
  }
  .otp-box {
    margin: 30px auto;
    text-align: center;
  }
  .otp {
    display: inline-block;
    background: #f3f4f6;
    color: #111827;
    font-size: 32px;
    letter-spacing: 8px;
    padding: 15px 25px;
    border-radius: 10px;
    font-weight: bold;
  }
  .note {
    margin-top: 25px;
    font-size: 13px;
    color: #777777;
  }
  .footer {
    background: #f9fafb;
    padding: 20px;
    text-align: center;
    font-size: 13px;
    color: #888888;
  }
  .footer span {
    color: #4f46e5;
    font-weight: 600;
  }
</style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>AccioMates</h1>
      <p>Verify Your Email</p>
    </div>

    <div class="content">
      <h2>Hello 👋</h2>
      <p>
        Thank you for registering with <strong>AccioMates</strong>.<br />
        Please use the following OTP to complete your email verification.
      </p>

      <div class="otp-box">
        <div class="otp">${otp}</div>
      </div>

      <p>
        This OTP is valid for the next <strong>10 minutes</strong>.
        Please do not share this code with anyone for security reasons.
      </p>

      <p class="note">
        If you did not request this, you can safely ignore this email.
      </p>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} <span>AccioMates</span> · All rights reserved
    </div>
  </div>
</body>
</html>
`;

    await transport.sendMail({
      from: '"AccioMates" <sstymrj>',
      to: email,
      subject: "OTP for Account Registration",
      html : otpEmailTemplate(otp)
    });

    res.status(201).json({msg: 'OTP Successfully sent'})
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

const verifyOTP = async(req,res)=>{
    try {
        const { otp, email } = req.body

        const founData = await OTP.findOne({
            $and : [
                {otp} ,{email}
            ]
        })

        if(!founData){
            throw new Error('Invalid OTP')
        }

        await verifiedMails.create({email})
        res.status(200).json({msg:'Email Verified Scuccessfully!'})

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    sendOTP, verifyOTP
}