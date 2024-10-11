const mongoose = require('mongoose');

// Define the Post Schema
const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  postId: { type: String },
  likes: { type: Number, default: 0 }, // Add more fields as needed
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  name: {type: String , default: 'Your Name'},
  about: {type: String, default: 'Tell us about yourself!'},
  profilePic: {type: String, default: 'https://via.placeholder.com/150'},
  posts: {type: [{ type: postSchema, default: ['This Initial Post by server, You can edit this or even post new.',] }]},
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
