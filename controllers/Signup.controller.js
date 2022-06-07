const User = require("../models/User_model");
const createError = require("http-errors");
const { authSchema } = require("../helpers/Joi_validator_helper");

module.exports = {
  getSign: (req, res, next) => {
    res.render("signup");
  },
  postSign: async (req, res, next) => {
    try {
        console.log(req.body)
      const result = await authSchema.validateAsync(req.body);
      console.log(result.email);
      const doesExist = await User.findOne({ email: result.email });
      if (doesExist) throw createError.Conflict("user is already exixt");
      const { name, email, password } = result;
      const user = new User({ name, email, password });
      const savedUser = await user.save();
      // const token= await signAccessToken(savedUser.id)
      // const refreshToken= await refreshAccessToken(savedUser.id)
      // res.cookie('token',token,{httpOnly:true})
      // res.cookie('refreshToken',refreshToken,{httpOnly:true})
      // res.json(savedUser)
      res.redirect("/login");
    } catch (error) {
      res.send(error);
    }
  },
};
