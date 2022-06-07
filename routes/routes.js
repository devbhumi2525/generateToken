const router=require('express').Router()
const {Home} = require('../controllers/Home.controller')
const {getLogin,postLogin}=require('../controllers/Login.controller')
const {getSign,postSign}=require('../controllers/Signup.controller')
const {getUser, postUser, putUser, deleteUser}=require('../controllers/User.controller')
const {verifyAccessToken}= require('../middileware/auth.User')



router.get('/',Home)
router.get('/login',getLogin)
router.post('/login',postLogin)
router.get('/signup',getSign)
router.post('/signup',postSign)
router.get('/user',verifyAccessToken,getUser)
router.post('/user',verifyAccessToken,postUser)
router.delete('/logout',verifyAccessToken,deleteUser)

module.exports=router