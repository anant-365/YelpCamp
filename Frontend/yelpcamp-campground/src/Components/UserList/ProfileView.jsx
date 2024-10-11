import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { FaUserAlt, FaCalendarAlt, FaEdit, FaPenAlt } from 'react-icons/fa'; // Import icons

const ProfileView = () => {
  const { userId } = useParams(); // Get userId from URL params
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // Fetch user details and posts from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/api/allusers/${userId}`);
        setUser(userResponse.data);

        const postsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/api/users/${userId}/posts`);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserData();
  }, [userId]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-gray-900 p-8 text-white">
      <div className="max-w-5xl mx-auto">
        {/* User Profile Section */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
          <div className="flex items-center">
            <img
              src={user.profilePic || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-20 h-20 rounded-full mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                 {user.name} {/* User Icon */}
              </h1>
              <p className="text-sm text-gray-400">@{user.username}</p>
              <p className="mt-4 text-gray-300">{user.about || "No bio available."}</p>
            </div>
          </div>
        </div>

        {/* User Posts Section */}
        <h2 className="text-2xl font-bold mb-6">Posts by {user.name}</h2>
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.postId} className="bg-gray-700 p-6 rounded-lg shadow-md">
                <p className="text-xl mb-4 flex items-center">
                   {post.text} {/* Post Text with Icon */}
                </p>
                <div className="text-gray-400 text-sm flex">
                  <span className="flex items-center">
                    <FaEdit className="mr-2" /> {/* Edit Icon */}
                    Reviewed {moment(user.updatedAt).fromNow()} by The Author
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">This user hasn't posted anything yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;