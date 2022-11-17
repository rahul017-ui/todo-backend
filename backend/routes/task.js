const router = require("express").Router();
const taskController = require('../controllers/task');
const auth = require("../middleware/auth");

router.post("/add",auth, taskController.createTask);
router.put("/updatetask/:taskId", taskController.updateTask);
router.delete("/deletetask/:taskId",taskController.deleteTask)
router.get("/getalltaskss",auth,taskController.getAllTasks)


module.exports = router;
