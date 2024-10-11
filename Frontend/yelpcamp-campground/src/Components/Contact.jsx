import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';

const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen flex flex-col items-center">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-lime-300 mb-4">Contact Us</h1>
        <p className="text-xl">
          Learn more about us -{' '}
          <NavLink to="/" className="hover:text-orange-300 text-lime-300">
            <HiExternalLink className="inline" />
            <span className="underline"> Home</span>
          </NavLink>
        </p>
      </header>
      
      <section className="w-full max-w-4xl bg-gray-900 p-8 rounded-lg shadow-2xl transition-transform transform hover:scale-105 duration-300 mb-10">
        <h2 className="text-2xl font-bold text-lime-300 mb-4">Our Mission</h2>
        <p className="mb-4">
          At YelpCamp, our mission is to help outdoor enthusiasts find and share the best campgrounds around the world.
          We believe in the power of community and the joy of exploring nature.
        </p>

        <h2 className="text-2xl font-bold text-lime-300 mb-4">The Team</h2>
        <p className="mb-4">
          Our team is made up of passionate campers and developers who are dedicated to providing the best platform for discovering and reviewing campgrounds. We are constantly working to improve YelpCamp and add new features to enhance your experience.
        </p>

        <h2 className="text-2xl font-bold text-lime-300 mb-4">Contact Us</h2>
        <p className="mb-4">
          Have questions or feedback? We'd love to hear from you! Reach out to us at{' '}
          <a href="mailto:support@yelpcamp.com" className="text-lime-300 hover:underline">
            support@yelpcamp.com
          </a>.
        </p>
      </section>

      {/* Additional Contact Information */}
      <section className="w-full max-w-4xl bg-gray-900 p-8 rounded-lg shadow-2xl transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-2xl font-bold text-lime-300 mb-4">Get In Touch</h2>
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <FaPhone className="text-lime-300 mr-2" />
            <span className="text-lg">+1 (800) 123-4567</span>
          </div>
          <div className="flex items-center mb-4 md:mb-0">
            <FaEnvelope className="text-lime-300 mr-2" />
            <span className="text-lg">
              <a href="mailto:support@yelpcamp.com" className="text-lime-300 hover:underline">
                support@yelpcamp.com
              </a>
            </span>
          </div>
          <div className="flex items-center mb-4 md:mb-0">
            <FaMapMarkerAlt className="text-lime-300 mr-2" />
            <span className="text-lg">123 Campground Ave, Outdoorsy City, CA 12345</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-lime-300 mb-4">Business Hours</h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center mb-4 md:mb-0">
            <FaClock className="text-lime-300 mr-2" />
            <span className="text-lg">Monday - Friday: 9 AM - 5 PM</span>
          </div>
          <div className="flex items-center mb-4 md:mb-0 md:mx-4">
            <FaClock className="text-lime-300 mr-2" />
            <span className="text-lg">Saturday: 10 AM - 4 PM</span>
          </div>
          <div className="flex items-center">
            <FaClock className="text-lime-300 mr-2" />
            <span className="text-lg">Sunday: Closed</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
