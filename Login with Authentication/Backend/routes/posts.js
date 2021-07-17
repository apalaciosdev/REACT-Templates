const express = require('express');
const router = express();
const Post = require('../models/post');
const checkAuth = require('../middlewares/auth')

router.use(express.json());

router.post('/posts/new', checkAuth, (req, res) => {
  const post= new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save()
      .then(result => res.sendStatus(201)) 
      .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
      })
});

module.exports = router;