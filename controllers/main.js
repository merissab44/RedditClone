const Post = require('../models/post');

const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({}).lean();
        return res.render('posts-index', {posts})
    } catch (err) {
        console.error(err)
    }
});

module.exports = router