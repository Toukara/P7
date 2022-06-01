var express = require("express");
var router = express.Router();

const postsController = require("../controllers/posts.js");
const authorization = require("../middleware/authorization.js");
const { attachmentStockage } = require("../middleware/multer.js");

router.get("/", postsController.getPosts);
router.post("/", authorization.isVerifiedUser, attachmentStockage, postsController.createPost);
router.get("/:id", postsController.getOnePost);
router.delete("/:id", authorization.isVerifiedUser, authorization.isAuthorized, postsController.deletePost);
router.post("/:id/comments", authorization.isVerifiedUser, postsController.addComment);
router.delete("/:id/comments/", authorization.isVerifiedUser, authorization.isAuthorized, postsController.deleteComment);
router.get("/comments/all", authorization.isVerifiedUser, postsController.getComments);
router.patch("/:id", authorization.isVerifiedUser, authorization.isAuthorized, attachmentStockage, postsController.editPost);
router.post("/:id/likes", authorization.isVerifiedUser, postsController.likePost);
router.get("/:id/likes", authorization.isVerifiedUser, postsController.getLikes);

module.exports = router;
