require('dotenv').config()
const express = require('express')
const http = require('http')
const app = express()
const mongoose = require('mongoose')
const { authRouter } = require('./Routes/AuthRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { otpRouter } = require('./Routes/OTPRoute')
const { Server } = require('socket.io')


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://acciomates.vercel.app/" 
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}))



app.use(cookieParser())
app.use(express.json())

app.use('/api', authRouter)
app.use('/api',otpRouter)


//creating server 
const server = http.createServer(app)

//socket server creation 
const io = new Server(server, {
  cors : {
    origin : [
      "http://localhost:5173",
      "https://acciomates.vercel.app"
    ],
    credentials : true
  }
})


//socket-auth

io.on('connection',(socket)=>{
  console.log('User Connected', socket.id)
})


// database connection 
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Database Connected Successfully!')
    server.listen(process.env.PORT,()=>{
        console.log(`Server Running at port ${process.env.PORT}`)
    })
})
.catch(()=>{
    console.log('Database Connection Failed')
})
