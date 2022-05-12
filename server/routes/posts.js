var express = require("express");
var router = express.Router();

const postsController = require("../controllers/posts.js");
const authMiddleware = require("../middleware/auth.js");



module.exports = router;
