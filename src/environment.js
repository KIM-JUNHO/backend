const dotenv = require('dotenv');

dotenv.config();

const defaultPort = 4000;
const defaultMongoDbUri = 'mongodb://localhost:27017';

const environment = {
  PORT: process.env.PORT || defaultPort,
  MONGO_DB_URI: process.env.MONGO_DB_URI || defaultMongoDbUri,
};

module.exports = {
  environment: environment,
};
