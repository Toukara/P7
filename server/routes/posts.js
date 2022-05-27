var express = require("express");
var router = express.Router();

const postsController = require("../controllers/posts.js");
const authorization = require("../middleware/authorization.js");
const { attachmentStockage } = require("../middleware/multer.js");

router.get("/", authorization.isVerifiedUser, postsController.getPosts);
router.post("/", authorization.isVerifiedUser, attachmentStockage, postsController.createPost);
router.get("/:id", authorization.isVerifiedUser, postsController.getOnePost);
router.delete("/:id", authorization.isVerifiedUser, postsController.deletePost);
router.patch("/:id", authorization.isVerifiedUser, attachmentStockage, postsController.editPost);
router.post("/:id/likes", authorization.isVerifiedUser, postsController.likePost);

module.exports = router;
