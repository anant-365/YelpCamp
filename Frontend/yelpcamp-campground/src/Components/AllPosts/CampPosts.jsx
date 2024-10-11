import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaHeart, FaRegHeart, FaSearch, FaUserAlt, FaCalendarAlt, FaCommentDots } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

const socket = io(`${import.meta.env.VITE_BACKEND_SERVER}`); // Connect to Socket.IO backend

const CampPosts = () => {
  const userId = Cookies.get('userIdYelp');
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState({});
  const [commentText, setCommentText] = useState({}); // Separate state for each post's comment

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/api/posts`);
        setPosts(response.data);

        const initialLikes = {};
        response.data.forEach(post => {
          initialLikes[post._id] = { count: post.likes || 0, liked: false };
        });
        setLikes(initialLikes);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    socket.on('commentAdded', ({ postId, comments }) => {
      setComments(comments);
    });
  }, []);

  const handleLike = async (postId) => {
    setLikes((prevLikes) => {
      const isLiked = prevLikes[postId].liked;
      const updatedLikes = isLiked ? prevLikes[postId].count - 1 : prevLikes[postId].count + 1;

      return {
        ...prevLikes,
        [postId]: {
          count: updatedLikes,
          liked: !isLiked,
        },
      };
    });

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_SERVER}/api/posts/${postId}/like`, {
        liked: !likes[postId]?.liked,
        likeCount: likes[postId]?.liked ? likes[postId].count - 1 : likes[postId].count + 1,
      });
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  const handleCommentSubmit = (postId) => {
    const newComment = { text: commentText[postId] || '', author: userData.username };

    socket.emit('newComment', { postId, comment: newComment });
    setCommentText({ ...commentText, [postId]: '' }); // Clear input for the specific post
  };

  const handleCommentChange = (postId, text) => {
    setCommentText((prevComments) => ({
      ...prevComments,
      [postId]: text,
    }));
  };

  const filteredPosts = posts.filter((post) =>
    post.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Camp Experience Posts</h1>

        {/* Search Component */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search post by username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-lg text-black w-full"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>

        <div className="space-y-6">
          {filteredPosts.length ? (
            filteredPosts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-700 p-4 sm:p-6 rounded-lg shadow-md transition-all duration-200"
              >
                <p className="text-lg sm:text-xl mb-4">{post.text}</p>
                <div className="text-gray-400 flex flex-col sm:flex-row justify-between text-xs sm:text-sm items-start sm:items-center">
                  <span className="flex items-center mb-2 sm:mb-0"><FaCalendarAlt className="mr-1" /> Created {moment(post.lastReviewed).fromNow()}</span>
                  <span className="flex items-center"><FaUserAlt className="mr-1" /> Posted by:&nbsp; <NavLink to={`profile/${post.username}`}><b className='text-lime-500 hover:text-white'><em><u>{post.username}</u></em></b></NavLink></span>
                </div>

                {/* Like Button */}
                <div className="mt-4 flex items-center">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center text-lg sm:text-xl transition-all duration-200 ${likes[post._id]?.liked ? 'text-red-500' : 'text-gray-400'} hover:text-red-400`}
                  >
                    {likes[post._id]?.liked ? <FaHeart /> : <FaRegHeart />}
                    <span className="ml-2">{likes[post._id]?.count > 0 ? likes[post._id].count : ''}</span>
                  </button>
                </div>

                {/* Comment Section */}
                <div className="mt-4">
                  <h3 className="text-lg sm:text-xl font-bold">Comments</h3>
                  <div className="space-y-2 mt-2 bg-gray-600 text-white flex flex-col rounded-2xl p-4">
                      {comments.length !== 0 ? comments.map((cmt, index) => (
                      <p key={index} className="text-sm text-gray-300"><b className='text-lime-500'><NavLink to={`profile/${cmt.author}`} className="underline hover:text-white">@{cmt.author}</NavLink></b>: {cmt.text}</p>
                    )) : post.comments.map((cmt, index) => (
                      <p key={index} className="text-sm text-gray-300"><b className='text-lime-500'><NavLink to={`profile/${cmt.author}`} className="underline hover:text-white">@{cmt.author}</NavLink></b>: {cmt.text}</p>
                    ))}
                  </div>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      value={commentText[post._id] || ''} // Unique comment for each post
                      onChange={(e) => handleCommentChange(post._id, e.target.value)}
                      placeholder="Write a comment..."
                      className="p-2 sm:p-3 pr-10 w-full bg-transparent rounded focus:outline-none border-b-2 focus:border-lime-500"
                    />
                    <FaCommentDots className="absolute right-3 top-3 text-lime-500" />
                  </div>
                  <button
                    onClick={() => handleCommentSubmit(post._id)}
                    className="bg-lime-500 text-black px-3 sm:px-4 py-2 rounded mt-2 hover:bg-lime-400 transition-all duration-200"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No posts available yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampPosts;
