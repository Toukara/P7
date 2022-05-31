const fs = require("fs");
const path = require("path");

const { Post, Comment } = require("../models");
const { getUserId } = require("../utils/user");

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  let authorId = await getUserId(req.headers.authorization);

  console.log(req.file);

  const post = await Post.create({
    authorId: authorId,
    title: title,
    content: content,
    attachment: req.file?.filename ?? null,
  });

  await post.save().then(() => {
    res.status(201).json({ message: "Post created successfully" });
  });
};

exports.getPosts = async (req, res) => {
  const posts = await Post.findAll({});

  if (!posts) {
    res.status(400).json({ message: "No posts found" });
    posts = [];
  }

  res.status(200).json(posts);
};

exports.getOnePost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (!post) {
    return res.status(400).send({ message: "Post does not exist" });
  }

  const comments = await Comment.findAll({ where: { postId: req.params.id } });

  res.status(200).json({ post, comments });
};

exports.deletePost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (!post) {
    return res.status(400).send({ message: "Post does not exist" });
  }

  if (post.attachment) {
    await fs.unlink(`${path.join(__dirname, "../public/images/attachments")}/${post.attachment}`, (err) => {
      if (err) {
        return res.status(400).send({ message: "Error deleting post attachment", error: err });
      }
    });
  }

  const comments = await Comment.findAll({ where: { postId: req.params.id } });

  if (comments) {
    await comments.forEach(async (comment) => {
      await comment.destroy();
    });
  }

  await Post.destroy({ where: { id: req.params.id } }).then(() => {
    res.status(200).json({ message: "Post deleted successfully" });
  });
};

exports.editPost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (!post) {
    return res.status(400).send({ message: "Post does not exist" });
  }

  post.title = req.body.title ?? post.title;
  post.content = req.body.content ?? post.content;

  // Sets the attachment for the request.
  if (req.file) {
    post.attachment = req.file.filename ?? post.attachment;
  } else {
    post.attachment = post.attachment;
  }

  await post.save().then(() => {
    res.status(200).json({ message: "Post updated successfully" });
  });
};

exports.likePost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (!post) {
    return res.status(400).send({ message: "Post does not exist" });
  }

  const userId = await getUserId(req.headers.authorization);

  let succesMessage = "Nothing happened";
  let likesUsers_Array = [...post.likesUsers];
  let dislikesUsers_Array = [...post.dislikesUsers];

  if (req.body.like === 0) {
    if (post.likesUsers.includes(userId)) {
      likesUsers_Array = post.likesUsers.filter((user) => user !== userId);
      post.likes -= 1;
      succesMessage = "You unliked this post";
    } else if (post.dislikesUsers.includes(userId)) {
      dislikesUsers_Array = post.dislikesUsers.filter((user) => user !== userId);
      post.dislikes -= 1;
      succesMessage = "You undisliked this post";
    }
  } else if (req.body.like === 1) {
    if (post.likesUsers.includes(userId)) {
      return res.status(400).send({ message: "You already liked this post" });
    } else {
      await likesUsers_Array.push(userId);
      post.likes += 1;
      succesMessage = "Post liked successfully";
      if (post.dislikesUsers.includes(userId)) {
        post.dislikes -= 1;
        let filteredDislikesUsers = post.dislikesUsers.filter((id) => id !== userId);
        dislikesUsers_Array = filteredDislikesUsers;
        console.log(filteredDislikesUsers);
        succesMessage = "Post liked successfully and dislike removed";
      }
    }
  } else if (req.body.like === -1) {
    if (post.dislikesUsers.includes(userId)) {
      return res.status(400).send({ message: "You already disliked this post" });
    } else {
      await dislikesUsers_Array.push(userId);
      post.dislikes += 1;
      succesMessage = "Post disliked successfully";
      if (post.likesUsers.includes(userId)) {
        post.likes -= 1;
        let filteredLikesUsers = post.likesUsers.filter((id) => id !== userId);
        likesUsers_Array = filteredLikesUsers;
        console.log(filteredLikesUsers);
        succesMessage = "Post disliked successfully and like removed";
      }
    }
  }

  post.likesUsers = likesUsers_Array;
  post.dislikesUsers = dislikesUsers_Array;

  await post.save().then((post) => {
    res.status(200).json({ message: succesMessage });
  });
};

exports.getLikes = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  res.status(200).json({ likes: post.likes, dislikes: post.dislikes, likesUsers: post.likesUsers, dislikesUsers: post.dislikesUsers });
};

exports.addComment = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  const userId = await getUserId(req.headers.authorization);

  const comment = await Comment.create({
    authorId: userId,
    postId: post.id,
    content: req.body.content,
  });

  console.log(req);

  await comment.save().then(() => {
    res.status(201).json({ message: "Comment added successfully" });
  });
};

exports.deleteComment = async (req, res) => {
  const comment = await Comment.findOne({ where: { id: req.params.id } });

  if (!comment) {
    return res.status(400).send({ message: "Comment does not exist" });
  }

  await Comment.destroy({ where: { id: req.params.id } }).then(() => {
    res.status(200).json({ message: "Comment deleted successfully" });
  });
};

exports.getComments = async (req, res) => {
  const comments = await Comment.findAll({});

  res.status(200).json({ comments });
};
