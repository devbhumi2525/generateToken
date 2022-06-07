const express = require("express");
const app = express();
const logger = require("morgan");
require("dotenv").config();
const createError = require("http-errors");
const router = require("./routes/routes");
const { mongoConnect } = require("./config/connection");
const req = require("express/lib/request");
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use(logger('dev')) // for logging 
app.set('view engine','ejs')

// router
app.use(router)






//page not found
app.use((req, res, next)=>{
    next(createError.NotFound())
})

// error hanlding
app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    .send({message:err.message})
})

// connection for db

mongoConnect(process.env.DB_URI,process.env.DB_NAME)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));