import React from 'react';
import { NavLink } from 'react-router-dom';

const Contact = () => {
  return (
     <div className="bg-gray-800 text-white p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen flex flex-col items-center">
     <header className="text-center mb-10">
       <h1 className="text-4xl font-bold text-lime-300 mb-4">About YelpCamp</h1>
       <p className="text-xl">Learn more about our mission and the team behind YelpCamp.</p>
     </header>
     <section className="w-full max-w-4xl bg-gray-700 p-6 rounded-lg shadow-lg">
       <h2 className="text-2xl font-bold text-lime-300 mb-4">Our Mission</h2>
       <p className="mb-4">
         At YelpCamp, our mission is to help outdoor enthusiasts find and share the best campgrounds around the world. We believe in the power of community and the joy of exploring nature.
       </p>
       <h2 className="text-2xl font-bold text-lime-300 mb-4">The Team</h2>
       <p className="mb-4">
         Our team is made up of passionate campers and developers who are dedicated to providing the best platform for discovering and reviewing campgrounds. We are constantly working to improve YelpCamp and add new features to enhance your experience.
       </p>
       <h2 className="text-2xl font-bold text-lime-300 mb-4">Contact Us</h2>
       <p className="mb-4">
         Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:support@yelpcamp.com" className="text-lime-300 hover:underline">support@yelpcamp.com</a>.
       </p>
     </section>
   </div>
  );
};

export default Contact;
