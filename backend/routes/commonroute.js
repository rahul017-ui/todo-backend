const router = require("express").Router();
const taskRoute = require("./task");

const userRoute = require("./User");

router.use("/api/v1/users", userRoute)
router.use("/api/v1/tasks", taskRoute)


module.exports = router;