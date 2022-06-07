const User = require("../models/User_model");
const createError = require("http-errors");
module.exports = {
  getUser: async (req, res) => {
    try {
      const id = req.payload.aud;
      const user = await User.findOne({ _id: id });
      if (!user) throw createError.Unauthorized();
      res.render("user", user);
      // res.json(user)
    } catch (error) {}
  },
  postUser: async (req, res, next) => {
    try {
      const id = req.payload.aud;
      const user = await User.findOne({ _id: id });
      if (!user) throw createError.Unauthorized();
      const { name, email, password } = req.body;
      const uUser = await User.update({ _id: id }, { name, email, password });
      console.log(uUser)
      res.send("user updated")
    } catch (err) {
      next(err);
    }
  },
  putUser: async (req, res) => {},
  deleteUser: (req, res, next) => {
    // req.headers.cookie=''
    // res.redirect('/')
    console.log(`delete request`);
    res.send(req.body);
  },
};
