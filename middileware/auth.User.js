
const JWT =require('jsonwebtoken')
const createError = require('http-errors')
module.exports={
    //veryfing token
    verifyAccessToken: (req, res, next)=>{
        // if(!req.headers['authorization']) return next(createError.Unauthorized())
        // const Bearer=req.headers['authorization']
        // const bearerToken=Bearer.split(" ")
        // const token =bearerToken[1]
        const getCookies = req.headers.cookie
        const bearerToken=getCookies.split(";")
        const newToken=bearerToken[0].split('=')
        const token =newToken[1] 
        // console.log(token)
        const isVerify=JWT.verify(token,process.env.SIGN_ACCESS_SECRET,(err, payload)=>{
          if(err){
            return next(createError.Unauthorized())
          }
          req.payload=payload
          next()
        })
    },
    verifyRefreshAccessToken: (refreshToken)=>{
        return new Promise((resolve, reject)=>{
          JWT.verify(refreshToken, process.env.REFRESH_ACCESS_SECRET,(err, payload)=>{
            if(err) return reject(createError.Unauthorized())
            const userId=payload.aud
            return resolve(userId)
          })
        })
      }
}