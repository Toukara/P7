const { User } = require("../models");

exports.getUser = async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }
  res.status(200).json(user);
};

exports.updateUser = async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }

  await user.update(req.body);
  await user.save().then(() => {
    res.status(200).json({ message: "User updated successfully" });
  });
};

exports.deleteUser = async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }

  await user.destroy();
  res.status(200).json({ message: "User deleted successfully" });
};
