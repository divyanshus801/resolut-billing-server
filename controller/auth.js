const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user) {
      return res.status(400).json({
        message: "user already registered",
      });
    }
    const { fullName, email, role, passwordRepeat } = req.body;
    console.log(req.body);
    const hash_password = await bcrypt.hash(passwordRepeat, 10);
    const _user = new User({
      fullName,
      email,
      role,
      hash_password,
    });
    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: "something went wrong",
        });
      }
      if (user) {
        const { _id, fullName, email, role } = user;
        return res.status(201).json({
          message: "user registered successfully",
          user: { _id, fullName, email, role },
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (
        (await user.authenticate(req.body.password)) &&
        user.role === "admin"
      ) {
        const token = generateJwtToken(user._id, user.role);
        const { _id, fullName, email, role } = user;
        res.status(200).json({
          token,
          user: { _id, fullName, email, role },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password or Something went wrong",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
