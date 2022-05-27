const jwt = require("jsonwebtoken");

exports.checkUserID = async function (id, authorization) {
  const token = authorization.split(" ")[1];
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
