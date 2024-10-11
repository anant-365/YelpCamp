require('dotenv').config()
const express = require('express');
const Campground = require('./Models/Campground')
const User = require('./Models/User');
const dbConnect = require('./Seeds/index');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const socketIo = require('socket.io');
const Post = require('./Models/Post');

dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow any origin
    methods: ['GET', 'POST']
  }
});

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_SERVER, credentials: true }));

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) return res.json({ success: false, message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    userId: uuidv4(),
  });

  await newUser.save();
  res.json({ success: true, userId: newUser.userId });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.json({ success: false, message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ success: false, message: 'Invalid credentials' });

  res.json({ success: true, userId: user.userId });
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

app.get('/api/allusers/:userId', async (req, res) => {
  try {
    const username = req.params.userId
    const user = await User.findOne({username}); // Fetch user by ID
    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error');
  }
});

// Get posts of a specific user
app.get('/api/users/:userId/posts', async (req, res) => {
  try {
    const {posts} = await User.findOne({ username: req.params.userId }); // Fetch posts by user ID
    res.json(posts);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});


//fetching user by userIdYelp
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from the URL parameters
    const user = await User.findOne({ userId });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

app.put('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from the URL parameters
    const updatedData = req.body; // Get the data to update from the request body
    // Update the user in the database
    const user = await User.findOneAndUpdate({ userId }, updatedData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation on update
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});


// Route to delete a specific post
app.delete('/api/users/:userId/deletePost', async (req, res) => {
  const { postId } = req.body; // Extract postId from request body
  const { userId } = req.params; // Extract userId from request parameters

  try {
    // Find the user and remove the post with the matching postId
    const postsnum = await User.findOne(
      { userId }  
    );

    if(postsnum.posts.length === 1){

    }

        const user = await User.findOneAndUpdate(
        { userId }, 
        { $pull: { posts: { postId } } }, // Remove post with matching postId
        { new: true } // Return the updated user document
      );

     await Post.findOneAndDelete(
      { postId } 
    );

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error deleting post', error });
  }
});


app.put('/api/users/:userId/clearBio', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({userId});
    user.about = ''; // Clear the about field
    await user.save();
    res.status(200).json({ message: 'Bio cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing bio', error });
  }
});


// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Populating the user’s name
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/posts/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    post.likes = req.body.likeCount; // Update the like count
    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.get('/api/posts/:id/comments', async (req, res) => {
  try {
      const post = await Post.findById(req.params.id).populate('comments');
      res.status(200).json(post.comments);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching comments' });
  }
});

// Socket.io connection for real-time comments
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for new comments
  socket.on('newComment', async ({ postId, comment }) => {
      try {
          const post = await Post.findById(postId);
          post.comments.push(comment);
          await post.save();
          const comments = post.comments
          // Broadcast the new comment to all connected clients
          io.emit('commentAdded', { postId, comments });
      } catch (error) {
          console.error('Error adding comment:', error);
      }
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});



app.put('/api/posts/:userId', async (req, res) => {
  try {
    const {userId} = req.params; // Correctly extracting userId
    const user = await User.findOne({userId}); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { username } = user;
    const { posts } = user;

    // Check if posts is an array and has content
    if (posts.length === 0) {
      return res.send('no post to add');
    }

    else{
      for (let i = 0; i < posts.length; i++) {
        const { postId, text } = posts[i];
        const post = await Post.findOne({ postId });
        if(post){ 
               if(post.text !== text){
                const postUpdate = await Post.findOneAndUpdate({ postId }, { text }, {
                  new: true, // Return the updated document
                  runValidators: true, // Ensure validation on update
              })
               }
          }
        else{
          const newPost = new Post({ text: text, username: username, postId : postId });
          await newPost.save(); // Save each post to the database
        }
      }
    }

    res.status(201).json({ message: 'Posts created successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});


app.get('/campground', async (req, res) => {
  try {
    const campgrounds = await Campground.find({});
    res.json([...campgrounds]);
  } catch (error) {
    console.error('Error fetching campgrounds:', error);
  }
});

app.put('/campground', async(req, res)=>{
  let id = req.body._id
  await Campground.findByIdAndUpdate(id,{location:req.body.location, title:req.body.title, price:req.body.price, description:req.body.description})
  res.send('it worked')
})

app.post('/campground',async (req, res) => {
  const campground = new Campground( req.body)
  await campground.save()
  res.send('it worked')
})

app.delete('/campground/:id', async(req, res)=>{
  const { id } = req.params;
  await Campground.findByIdAndDelete(id)
  res.send('it worked')
})