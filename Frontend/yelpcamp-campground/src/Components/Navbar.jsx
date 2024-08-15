import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div className="bg-gray-800 text-lime-300 border-b-2 border-lime-300 p-4 sm:p-6 md:p-6 lg:p-4">
      <nav className="flex flex-wrap justify-between items-center sm:justify-center md:justify-start lg:justify-between">
        <span className="text-2xl font-bold text-orange-300 ml-32 my-2 sm:ml-0 md:ml-80 md:text-2xl md:my-3 lg:ml-8">YelpCamp</span>
        <div className="flex flex-wrap underline space-x-2.5 text-xs my-2 sm:space-x-4  md:space-x-10 md:no-underline md:text-xl md:my-3 md:ml-0 lg:space-x-10 mt-2 sm:mt-0 lg:ml-12 lg:text-xl lg:no-underline">
          <NavLink
            to="campgroundlist"
            onClick={props.refetchNewCamp}
            className="hover:text-orange-300 focus:text-orange-300 focus:underline sm:mr-2 md:mr-4 lg:mr-2"
          >
            Explore Campgrounds
          </NavLink>
          <NavLink
            to="newcampground"
            className="hover:text-orange-300 focus:text-orange-300 focus:underline sm:mr-2 md:mr-4 lg:mr-2"
          >
            New Campground
          </NavLink>
          <NavLink
            to="contact"
            className="hover:text-orange-300 focus:text-orange-300 focus:underline sm:mr-2 md:mr-4 lg:mr-2"
          >
            Contact
          </NavLink>
          <NavLink
            to="/"
            className="hover:text-orange-300 focus:text-orange-300 focus:underline sm:mr-2 md:mr-4 lg:mr-2"
          >
            Profile
          </NavLink>
          <NavLink
            to="/"
            className="hover:text-orange-300 focus:text-orange-300 focus:underline sm:mr-2 md:mr-4 lg:mr-2"
          >
            Logout
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
