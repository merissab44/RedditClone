const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  upVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  voteScore: { type: Number },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  subreddit: { type: String, required: false }
});

module.exports = model('Post', postSchema);