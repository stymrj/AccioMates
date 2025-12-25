require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { authRouter } = require('./Routes/AuthRoute')
const cookieParser = require('cookie-parser')

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Database Connected Successfully!')
    app.listen(process.env.PORT,()=>{
        console.log(`Server Running at port ${process.env.PORT}`)
    })
})
.catch(()=>{
    console.log('Database Connection Failed')
})




app.use(cookieParser())
app.use(express.json())
app.use('/api', authRouter)

app.use(cors({
  origin: [
    "http://localhost:5173",       
    "https://acciomates.onrender.com/:8090/api"
  ],
  credentials: true
}))