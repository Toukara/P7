const express = require("express");
const router = express.Router();

let multer = require("multer");
let upload = multer();

const multerMiddleware = require("../middleware/multer");

const authController = require("../controllers/auth");

router.post("/signup", multerMiddleware, authController.signup);
router.post("/login", upload.fields([]), authController.signin);

module.exports = router;
