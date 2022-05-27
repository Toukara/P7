const jwt = require("jsonwebtoken");
const { Post, User } = require("../models");

// 0 : Pas de modération
// 1 : Modérateur (Edit)
// 2 : Admin (Edit + Delete)
// 3 : Super Admin (Edit + Delete + Ban)

async function verifyUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.Secret_Key);
    const userId = decodedToken.id;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({
      error: "You are not authenticated!",
    });
  }
}

async function authorization(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.Secret_Key);

  let requestDirectory = req.originalUrl.split("/");
  console.log(requestDirectory[2]);

  if (requestDirectory[2] === "posts") {
    const post = await Post.findOne({ where: { id: requestDirectory[3] } });

    if (req.method === "DELETE") {
      if (decodedToken.authLevel >= 2 || post.authorId === decodedToken.id) {
        next();
      } else {
        res.status(401).send({ message: "You are not authorized to delete this post" });
      }
    } else if (req.method === "PATCH" || req.method === "PUT") {
      if (decodedToken.authLevel >= 1 || post.authorId === decodedToken.id) {
        next();
      } else {
        res.status(401).send({ message: "You are not authorized to edit this post" });
      }
    }
  }

  if (requestDirectory[2] === "users") {
    const user = await User.findOne({ where: { id: requestDirectory[3] } });

    if (!user) {
      res.status(404).send({ message: "User not found" });
    }

    if (req.method === "DELETE") {
      if (decodedToken.authLevel >= 2 || user.id === decodedToken.id) {
        next();
      } else {
        res.status(401).send({ message: "You are not authorized to delete this user" });
      }
    } else if (req.method === "PATCH" || req.method === "PUT") {
      if (decodedToken.authLevel >= 1 || user.id === decodedToken.id) {
        next();
      } else {
        res.status(401).send({ message: "You are not authorized to edit this user" });
      }
    } else {
      next();
    }
  }
}

module.exports.isAuthorized = authorization;
module.exports.isVerifiedUser = verifyUser;
