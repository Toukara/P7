var express = require("express");
var router = express.Router();

const postsController = require("../controllers/posts.js");
const authMiddleware = require("../middleware/auth.js");

router.get("/", authMiddleware, postsController.getPosts);
router.post("/", authMiddleware, postsController.createPost);
router.get("/:id", authMiddleware, postsController.getOnePost);
router.delete("/:id", authMiddleware, postsController.deletePost);
router.put("/:id", authMiddleware, postsController.editPost);

module.exports = router;
