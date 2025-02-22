import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import Campgrounds from './Components/Campgrounds';
import Contact from './Components/Contact.jsx';
import App from './App.jsx';
import './index.css';
import Show from './Components/Show.jsx';
import NewCampground from './Components/NewCampground.jsx';
import EditCampground from './Components/EditCampground.jsx';
import DeleteCampground from './Components/DeleteCampground.jsx';
import LoginRegister from './Components/LoginRegister/LoginRegister.jsx';
import Cookies from 'js-cookie';
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx';
import Logout from './Components/Logout/Logout.jsx';
import UserProfile from './Components/UserProfile/UserProfile.jsx';
import CampPosts from './Components/AllPosts/CampPosts.jsx';
import ProfileView from './Components/UserList/ProfileView.jsx';
import UserList from './Components/UserList/UserList.jsx';
import CampgroundMap from './Components/Map/CampgroundMap.jsx'
import axios from 'axios';

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userIdYelp = Cookies.get('userIdYelp');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/api/protected`, {
          withCredentials: true,
        });
        
        const jwtExpiryTime = response.data.tokenExpiry * 1000;
        const timeRemaining = jwtExpiryTime - Date.now();

        if (timeRemaining > 0) {
          setTimeout(() => {
            Cookies.remove('userIdYelp');
            setIsLoggedIn(false);
            alert("Your session has expired. Please log in again.");
          }, timeRemaining);
        } else {
          Cookies.remove('userIdYelp');
          setIsLoggedIn(false);
          alert("Your session has expired. Please log in again.");
        }

        setIsLoggedIn(!!userIdYelp);
      } catch (error) {
        console.error("Error fetching token expiry:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);
  

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path="*" element={isLoggedIn ? <Navigate to="/home" /> : <LoginRegister />}  errorElement={<ErrorPage />} />
            <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginRegister />} errorElement={<ErrorPage />}/>
            <Route path="/home" element={isLoggedIn ? <App/> : <LoginRegister />} errorElement={<ErrorPage />}>
              <Route path="contact" element={<Contact />} errorElement={<ErrorPage />}/>
              <Route path="map" element={<CampgroundMap/>} errorElement={<ErrorPage />}/>
              <Route path="userlist" element={<UserList />} errorElement={<ErrorPage />} />
              <Route path="viewposts/profile/:userId" element={<ProfileView />} errorElement={<ErrorPage />} />
              <Route path="userlist/profile/:userId" element={<ProfileView />} errorElement={<ErrorPage />} />
              <Route path="viewposts" element={<CampPosts />} errorElement={<ErrorPage />}/>
              <Route path="userprofile" element={<UserProfile />} errorElement={<ErrorPage />}/>
              <Route path="newcampground" element={<NewCampground />} errorElement={<ErrorPage />}/>
              <Route path="logout" element={<Logout />} errorElement={<ErrorPage />} />
              <Route path="explorecampground" element={<Campgrounds />} errorElement={<ErrorPage />}>
              <Route path="showCamp/:campId" element={<Show />} errorElement={<ErrorPage />}>
                <Route path="editCampground/:campId" element={<EditCampground />} errorElement={<ErrorPage />}/>
                <Route path="deleteCampground/:campId" element={<DeleteCampground/>} errorElement={<ErrorPage />}/>
              </Route>
              </Route>
            </Route>
          </>
        )
      )}
    />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
