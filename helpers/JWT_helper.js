const JWT = require("jsonwebtoken");
const createError = require("http-errors");
module.exports = {
  //generating token
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.SIGN_ACCESS_SECRET;
      const option = {
        expiresIn:'15m',
        issuer:"Gray Chain",
        audience:userId
      };
      JWT.sign(payload, secret, option, (err, token) => {
        if (err) {
            console.log(err)
            return reject(createError.InternalServerError());
        }
        return resolve(token);
      });
    });
  },
  singRefreshToken: (userId)=> {
    return new Promise( (resolve, reject)=>{
      const payload={}
      const secret=process.env.REFRESH_ACCESS_SECRET
      const option={
        expiresIn:'1y',
        issuer:"Gray Chain",
        audience:userId
      }
      JWT.sign(payload, secret,option,(err, token)=>{
        if(err) return reject(createError.InternalServerError())
        return resolve(token)
      })
    })
  }  
};
