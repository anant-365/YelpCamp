import React, { useContext, useState } from 'react';
import { NavLink, useOutlet } from 'react-router-dom';
import { counterContext } from '../Context/Context';
import { Outlet } from 'react-router-dom';
const Campgrounds = () => {
  const campResponse = useContext(counterContext);
  const [searchQuery, setSearchQuery] = useState('');
  const outlet = useOutlet();

  // Filter campgrounds based on the search query
  const filteredCampgrounds = campResponse.campData.filter((camp) =>
    Object.values(camp).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      {outlet ? (
        <Outlet /> // Render the child route's content
      ) : (
        <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen">
          <h1 className="text-3xl font-bold text-center text-lime-300 mb-6">All Campgrounds</h1>

          {/* Search input */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search campgrounds by its location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 w-full max-w-md bg-gray-800 text-white border border-gray-600 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCampgrounds.length > 0 ? (
              filteredCampgrounds.map((e) => (
                <div key={e['_id']} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold text-lime-300 mb-2">{e['location']}</h2>
                  <p className="mb-2">{e['description']}</p>
                  <p className="mb-2 font-bold italic"> Posted By: {e['username'] || 'anant'}</p>
                  <NavLink
                    to={`showCamp/:${e['_id']}`}
                    className="inline-block mt-4 p-2 bg-lime-300 text-gray-800 font-bold rounded hover:bg-lime-400"
                  >
                    Show
                  </NavLink>
                </div>
              ))
            ) : (
              <p className="text-center col-span-4 text-lime-300">No campgrounds found.</p>
            )}
          </div>
        </div> // Fallback if no child route matches
      )}
    </>
  );
};

export default Campgrounds;
