const jwt = require("jsonwebtoken");

exports.checkUserID = async function (id, authorization) {
  if (!authorization) {
    return false;
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return false;
  }
  const decodedToken = jwt.verify(token, process.env.Secret_Key);
  const userId = decodedToken.id;
  const requestId = id;

  if (requestId !== userId) {
    return false;
  }
  return true;
};

exports.getUserId = async function (authorization) {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.Secret_Key);
  const userId = decodedToken.id;

  return userId;
};
