const dotenv = require('dotenv');

dotenv.config();

const defaultPort = 4000;
const defaultMongoDbUri = 'mongodb://localhost:27017';

const environment = {
  port: process.env.PORT || defaultPort,
  mongo_db_uri: process.env.MONGO_DB_URI || defaultMongoDbUri,
};

module.exports = {
  environment: environment,
};
