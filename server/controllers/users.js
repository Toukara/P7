const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");
const { isEmail, isAlphanumeric, isStrongPassword } = require("validator");

const { checkUserID, getUserId } = require("../utils/user");

const { User, Post, Comment } = require("../models");

const passwordValidatorOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  returnScore: false,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10,
};

exports.getUser = async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user || isNaN(req.params.id)) {
    res.status(400).send({ message: "User does not exist" });
  } else {
    if (
      (await checkUserID(user.id, req.headers.authorization)) ||
      (await User.findOne({ where: { id: await getUserId(req.headers.authorization) } }).then((user) => {
        if (!user) return false;
        else user.authLevel >= 2;
      }))
    ) {
      res.status(200).json(user);
    } else {
      res.status(200).json({
        username: user.username,
        id: user.id,
        avatar: user.avatar,
        bio: user.bio,
        authLevel: user.authLevel,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    }
  }
};

async function deleteAvatar(user) {
  if (user.avatar !== "default_avatar0.png") {
    fs.unlink(`${path.join(__dirname, "../public/images/avatars")}/${user.avatar}`, (err) => {
      if (err) {
        return res.status(400).send({ message: "Error deleting user avatar", error: err });
      }
    });
  } else {
    return;
  }
}

async function deleteAttachment(post) {
  if (post.attachment) {
    fs.unlink(`${path.join(__dirname, "../public/images/attachments")}/${post.attachment}`, (err) => {
      if (err) {
        return res.status(400).send({ message: "Error deleting post attachment", error: err });
      }
    });
  } else {
    return;
  }
}

exports.editUser = async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }

  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  console.log(req.body);

  let newData = {};

  if (req.body.email) {
    if (isEmail(req.body.email)) {
      newData.email = req.body.email;
    } else {
      return res.status(400).send({ message: "Invalid email!" });
    }
  }

  if (req.body.username) {
    if (isAlphanumeric(req.body.username)) {
      newData.username = req.body.username;
    } else {
      return res.status(400).send({ message: "Invalid username!" });
    }
  }

  if (req.body.password) {
    if (isStrongPassword(req.body.password, passwordValidatorOptions)) {
      newData.password = await bcrypt.hash(req.body.password, 10);
    } else {
      return res.status(400).send({ message: "Invalid password!" });
    }
  }

  if (req.body.bio) {
    newData.bio = req.body.bio;
  }

  if (req.file) {
    await deleteAvatar(user);
    newData.avatar = req.file.filename;
  }

  await User.update(newData, { where: { id: user.id } });
  res.status(200).json({ message: "User updated successfully" });
};

exports.deleteUser = async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }

  const posts = await Post.findAll({ where: { authorId: user.id } });

  if (posts) {
    await posts.forEach(async (post) => {
      await deleteAttachment(post);
      await post.destroy();
    });
  }

  const comments = await Comment.findAll({ where: { authorId: user.id } });

  if (comments) {
    await comments.forEach(async (comment) => {
      await comment.destroy();
    });
  }

  await deleteAvatar(user);
  await user.destroy();
  res.status(200).json({ message: "User deleted successfully" });
};
