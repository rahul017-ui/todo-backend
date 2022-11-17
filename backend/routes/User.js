const router = require("express").Router();
const userController = require('../controllers/User');
const auth = require('../middleware/auth');


router.post("/register", userController.createUser);
router.post('/login', userController.login);
router.put("/updateuser/:userId",auth, userController.updateUser);
router.delete("/deleteUser/:userId", userController.deleteUser);



module.exports = router;
