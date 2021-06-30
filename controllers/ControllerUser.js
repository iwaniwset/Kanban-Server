const { User } = require("../models/index");
const { comparePass } = require ('../helpers/bcryptjs')
const { generateToken } = require ('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    let { email, password } = req.body;
    User.create({
      email,
      password,
    })
      .then(data => {
        // console.log(data);
        res.status(201).json({
          id: data.id,
          email: data.email,
          msg: "register successed",
        });
      })
      .catch(err => {
        next(err)
    })
  }

  static login(req, res, next){
    const {email, password} = req.body
    User.findOne({
      where: {
        email
      }
    })
    .then(user => {
      // console.log(user, "<<<<<<<< ini user");
      if (!user)throw {
        msg: "Invalid email or password",
        statusCode: 400
      }
      let comparePassword = comparePass(password, user.password)
      if (!comparePassword) throw {
        msg: "Invalid email or password",
        statusCode: 400
      }
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = generateToken(payload)
      res.status(200).json({
        token
      })
    })
    .catch(err => {
      next(err)
  })
  }
}
module.exports = UserController;
