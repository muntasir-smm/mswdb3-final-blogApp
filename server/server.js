const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config');

const PORT = config.port || 5000;

mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(Server running on port );
    });
  })
  .catch(err => {
    console.error('Database connection failed', err);
    process.exit(1);
  });