var express = require("express");
var router = express.Router();

const userController = require("../controllers/users.js");
const authMiddleware = require("../middleware/auth.js");

router.get("/:id", authMiddleware, userController.getUser);
router.patch("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);


module.exports = router;
