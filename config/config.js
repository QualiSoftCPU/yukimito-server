// config/config.js
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });


module.exports = {
  development: {
    use_env_variable: 'POSTGRES_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // You might need to set it to true depending on your SSL configuration
      }
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  },
  test: {
    use_env_variable: 'POSTGRES_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // You might need to set it to true depending on your SSL configuration
      }
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  },
  production: {
    use_env_variable: 'POSTGRES_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // You might need to set it to true depending on your SSL configuration
      }
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  },
};
