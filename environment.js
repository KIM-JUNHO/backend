const dotenv = require('dotenv');

dotenv.config();

const defaultPort = 4000;

const environment = {
  port: process.env.PORT || defaultPort,
};

module.exports = {
  environment: environment,
};
