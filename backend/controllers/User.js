const {task } =require("../model/task");
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../model/User.js');
const Joi = require('joi');
const jwt = require("jsonwebtoken");
require('dotenv').config()


const createUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already register');

    user = new User(_.pick(req.body, ['name', 'email', 'contact', 'username', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();

    
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWTPRIVATEKEY);
    res.json({ message: "user logined successfully", token: token });

  } catch (error) {
    res.json({ message: error });
  }
}

//login user  

const login = async (req, res) => {
  try {
    const { error } = validatelogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });

     if (!user) return res.status(400).send('invalid email');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('invalid password');

    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWTPRIVATEKEY);
    res.json({ message: "user logined successfully", token: token });

  } catch (error) {
    // console.log(error)
    res.json({ message: error });
  }
};

function validatelogin(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}


// Update user
const updateUser = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      username: req.body.username,
      password: req.body.password,
    };

    const updateduser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      user
    );
    if (!updateduser) return res.status(404).send('The user with the given ID was not found.');

    res.send(user);
  } catch (error) {
    res.json({ message: error });
  }
};

// Delete user and Task
const deleteUser = async (req, res) => {
  try {
    const removeuser = await User.findByIdAndDelete(req.params.userId);
    const userTask = await task.findOneAndDelete({ user_id: req.params.userId });
    const userDelete = { "user": removeuser, "task": userTask };

    if (!removeuser) return res.status(404).send('The user with the given ID was not found.');

    res.json(userDelete);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = {
  createUser,
  login,
  updateUser,
  deleteUser
}