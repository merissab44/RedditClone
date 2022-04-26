const Post = require('../models/post');

module.exports = (app) => {

   app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    });
  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    console.log(req.body);
    // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
    post.save(() => res.redirect('/'));
  });
  // Display all posts
  app.get('/', (req, res) => {
  Post.find({}).lean()
    .then((posts) => res.render('posts-index', { posts }))
    .catch((err) => {
      console.log(err.message);
    })
  });

  // LOOK UP THE POST
  app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).lean()
      .then((post) => res.render('posts-show', { post }))
      .catch((err) => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get('/n/:subreddit', (req, res) => {
    console.log(req.params.subreddit);
  });

};