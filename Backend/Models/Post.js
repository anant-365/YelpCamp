const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
  text: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new Schema({
  text: {
    type: String,
    trim: true,
  },
  lastReviewed: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,  // Using username instead of ObjectId
    trim: true,
  },
  postId: {
    type: String,
  },
  likes: { type: Number, default: 0 },
  comments: [commentSchema],
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;