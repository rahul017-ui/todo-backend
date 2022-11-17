const { task, validate } = require("../model/task");


const createTask = async (req, res) => {
  try {
    const { error } = validate(req.body);
    const { _id: user_id } = req.user;

    if (error) return res.status(400).send(error.details[0].message);

    const user = new task(
      {
        user_id: user_id,
        pincode: req.body.pincode,
        task: req.body.task
      }
    );
    await user.save();
    res.json(user);

  } catch (error) {
    console.log("error", error)
    res.json({ message: "error" })

  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const userTask = {
      pincode: req.body.pincode,
      task: req.body.task,
    };

    const updatedtask = await task.findByIdAndUpdate(
      req.params.taskId,
      userTask);
    res.json(updatedtask);
  } catch (error) {
    res.json({ message: error });
  }
};

const deleteTask = async (req, res) => {
  try {

    const userTask = await task.findOneAndDelete(req.params.taskId);
    res.json(userTask);
  } catch (error) {
    console.log(error)
    res.json({ message: error });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const { _id: user_id } = req.user;

    const alltask = await task.find({ user_id: user_id });
    res.json(alltask);
  } catch (error) {
    res.json({ message: "error" })
  }
}


module.exports = {
  updateTask,
  createTask,
  deleteTask,
  getAllTasks
};
