const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pfe-client',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(
    () => { console.log('Database connection is successful') },
    err => { console.log('Error when connecting to the database' + err) }
);

module.exports = mongoose;