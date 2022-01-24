require("dotenv").config();
module.exports = {
  development: {
    use_env_variable: process.env.DB_PRODUCTION_URL,
    username: process.env.DB_PRODUCTION_USERNAME,
    password: process.env.DB_PRODUCTION_PASSWORD,
    database: process.env.DB_PRODUCTION_NAME,
    host: process.env.DB_PRODUCTION_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: process.env.DB_PRODUCTION_URL,
    username: process.env.DB_PRODUCTION_USERNAME,
    password: process.env.DB_PRODUCTION_PASSWORD,
    database: process.env.DB_PRODUCTION_NAME,
    host: process.env.DB_PRODUCTION_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
