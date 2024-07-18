const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()
const cookieParser = require('cookie-parser') 
const fileUpload = require('express-fileupload')
const server = express()
server.use(cookieParser())
server.use(fileUpload({
    useTempFiles:true
}))

const PORT = process.env.PORT || 5000;
server.use(express.json())
server.get('/',(req,res)=>{``
    res.json("msg:This is Server")
})
server.listen(PORT,()=>{
    console.log("SERVER IS RUNNING")
})

//Routes
server.use('/user',require('./Routes/Useroutes'))
server.use('/api',require('./Routes/categoryRouters'))
server.use('/api',require('./Routes/upload'))
server.use('/api',require('./Routes/productroters'))


const URI = process.env.MONGODB_URL;

mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MONGO DB Connected")
}).catch(err=>{
    console.log(err)
})