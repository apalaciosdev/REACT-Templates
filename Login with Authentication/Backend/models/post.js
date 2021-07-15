const db = require('../database');

const postScheema = new db.Schema({
  title: {type: String, require: true},
  content: {type: String, require: true}
}, {timestamps: true})

const Post = db.model('Post', postScheema);

module.exports = Post;