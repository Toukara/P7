require("dotenv").config({ path: "../.env" });

module.exports = config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: "root",
    password: "SrE&r3niy6yR",
    database: "TEST_DB",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "SrE&r3niy6yR",
    database: "PROD_DB",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
