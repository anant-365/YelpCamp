import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { counterContext } from './Context/Context';
import { NavLink } from 'react-router-dom';

function App() {
  const [campData, setCampData] = useState([]);
  const location = useLocation();

  const func = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/campground', {
          headers: {
            Accept: 'application/json',
          },
        });
        setCampData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  useEffect(func, []);

  const isOutletRendered = location.pathname !== '/';

  return (
    <>
      <counterContext.Provider value={{ campData, setCampData }}>
        <Navbar refetchNewCamp={func} />
        <Outlet />
      </counterContext.Provider>
      {!isOutletRendered && (
        <div className="bg-gray-800 text-white p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-lime-300 mb-4">Welcome to YelpCamp</h1>
            <p className="text-xl">Discover and share the best campgrounds around the world.</p>
          </header>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-lime-300 mb-4">Explore Campgrounds</h2>
              <p className="mb-4">Find the perfect campground for your next adventure.</p>
              <NavLink
                to="/campgroundlist"
                className="inline-block mt-4 p-2 bg-lime-300 text-gray-800 font-bold rounded hover:bg-lime-400"
              >
                View Campgrounds
              </NavLink>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-lime-300 mb-4">Add a New Campground</h2>
              <p className="mb-4">Share your favorite camping spots with the community.</p>
              <NavLink
                to="/newcampground"
                className="inline-block mt-4 p-2 bg-lime-300 text-gray-800 font-bold rounded hover:bg-lime-400"
              >
                Add Campground
              </NavLink>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
