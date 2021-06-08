const mongoose = require('mongoose');

module.exports = {
  connect: (MONGO_DB_URL) => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(MONGO_DB_URL);
    mongoose.connection.on('error', (err) => {
      console.error(err);
      console.log('MongoDB connection failed: ' + MONGO_DB_URL);
      process.exit();
    });
    mongoose.connection.once('open', function () {
      console.log('Successfully connected to mongodb');
    });
  },
  close: () => {
    mongoose.connection.close();
  },
};
