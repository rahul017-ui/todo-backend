const mongoose = require("mongoose");
const Joi = require('joi');


const taskSchema = new mongoose.Schema({
  user_id: {
    type: String
  },
  pincode: {
    type: Number,
    required: true
  },
  task: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


const todoTask = mongoose.model('todotask', taskSchema);

function validateTask(task) {
  const schema = {
    pincode: Joi.required(),
    task: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(task, schema);
}


exports.task = todoTask;
exports.validate = validateTask;
