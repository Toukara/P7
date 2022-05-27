const { User } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { isEmail, isAlphanumeric, isStrongPassword } = require("validator");

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

exports.signup = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  } else if (!email || !username || !password) {
    return res.status(400).send({
      message: "Fill all the fields!",
    });
  }

  if (!isEmail(email)) {
    return res.status(400).send({ message: "Invalid email!" });
  }

  if (!isAlphanumeric(username)) {
    return res.status(400).send({ message: "Invalid username!" });
  }

  if (!isStrongPassword(password, passwordValidatorOptions)) {
    return res.status(400).send({ message: "Invalid password!" });
  }

  if (isEmail(email) && isAlphanumeric(username) && isStrongPassword(password, passwordValidatorOptions)) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user, create] = await User.findOrCreate({
      where: { [Op.or]: [{ email: email }, { username: username }] },
      defaults: { email: email, username: username, password: hashedPassword },
    });
    if (create) {
      res.status(201).json({ message: "User created successfully!" });
    } else {
      res.status(400).json({ message: "User already exists!" });
    }
  } else {
    res.status(400).send({ message: "Something went wrong!" });
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    return res.status(404).send({ message: "User does not exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send({ message: "Invalid password" });
  } else {
    const token = jwt.sign({ id: user.id, authLevel: user.authLevel }, process.env.Secret_Key, { expiresIn: "24h" });
    res.status(200).json({ message: "User logged in successfully!", token: token, userId: user.id });
  }
};
