const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/loginUsers', () => {
  console.log('Database connected')
})

module.exports = mongoose;