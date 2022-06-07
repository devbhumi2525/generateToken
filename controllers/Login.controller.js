const User = require("../models/User_model");
const createError = require("http-errors");
const {signAccessToken,singRefreshToken} = require('../helpers/JWT_helper');

module.exports={
    postLogin:async (req, res, next) => {
        // res.send("logn route");
        try {        
        const {email, password}=req.body
          const user = await User.findOne({ email});
          if (!user)
            throw createError.Unauthorized("Username & password in not valid");
          const isValidPass = await user.isValidPassword(password);
          if (isValidPass) {
            const token = await signAccessToken(user.id);
            const refreshToken = await singRefreshToken(user.id);            
            res.cookie('token',token,{httpOnly:true} )
            res.cookie('refreshToken',refreshToken,{httpOnly:true} )
            // res.send({ token, refreshToken });
            res.redirect('/user')
          } else {
            throw createError.Unauthorized("Username and password is not valid");
          }
        } catch (error) {
          if (error.isJoi === true) {
            console.log(error);
            return next(createError.BadRequest("Username/Password is invalid"));
          }
          next(error);
        }
      },
      getLogin:(req, res)=>{
          res.render('login')
      }
}
