const Post = require('../models/post');
const Comment = require('../models/comment');

const express = require('express')
const router = express.Router({mergeParams: true})
const requireLogin = require('../middleware/requireLogin');

router.get('/replies/new', requireLogin, async (req, res) => {
    try {
        const currentUser = req.user;
        const post = await Post.findById(req.params.postId).lean();
        const comment = await Comment.findById(req.params.commentId).lean();

        if (!post || !comment)
            return res.redirect("/");

        res.render('replies-new.handlebars', {post, comment, currentUser});
    } catch (err) {
        console.error(err);
    }
});

router.post('/replies', requireLogin, async (req, res) => {
    try {
        const reply = await new Comment(req.body);
        reply.author = req.user._id;
        await reply.save();

        const post = await Post.findById(req.params.postId)
        const comment = await Comment.findById(req.params.commentId);
        comment.comments.unshift(reply._id);
        await comment.save();

        res.redirect(`/posts/${req.params.postId}`)
        return post.save();
    } catch (err) {
        console.error(err);
    }
})


module.exports = router