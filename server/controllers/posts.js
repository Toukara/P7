const { Post } = require("../models");

exports.createPost = async (req, res) => {
  const { authorId, title, content } = req.body;

  const post = await Post.create({
    AUTHOR_ID: authorId,
    title: title,
    content: content,
    attachment: req.file.path,
  });

  await post.save().then(() => {
    res.status(200).json({ message: "Post created successfully" });
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

  res.status(200).json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (!post) {
    return res.status(400).send({ message: "Post does not exist" });
  }

  await Post.destroy().then(() => {
    res.status(200).json({ message: "Post deleted successfully" });
  });
};

exports.editPost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (!post) {
    return res.status(400).send({ message: "Post does not exist" });
  }

  await post.update(req.body);
  await post.save().then(() => {
    res.status(200).json({ message: "Post updated successfully" });
  });
};
