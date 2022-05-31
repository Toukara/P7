var express = require("express");
var router = express.Router();

const userController = require("../controllers/users.js");
const authorization = require("../middleware/authorization.js");
const { avatarStockage } = require("../middleware/multer.js");

router.get("/:id", userController.getUser);
router.patch("/:id", authorization.isVerifiedUser, authorization.isAuthorized, avatarStockage, userController.editUser);
router.delete("/:id", authorization.isVerifiedUser, userController.deleteUser);

module.exports = router;
