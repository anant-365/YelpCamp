import React, { useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaTag, FaDollarSign, FaRegFileAlt, FaPlusCircle, FaInfoCircle } from 'react-icons/fa';

const NewCampground = () => {
    const [newCamp, setNewCamp] = useState({
        location: '',
        title: '',
        price: '',
        description: '',
        image: 'https://picsum.photos/400/300',
    });

    const handleChange = (evt) => {
        setNewCamp((prev) => {
            const changedProperty = evt.target.name;
            const changedValue = evt.target.value;
            prev[changedProperty] = changedValue;
            return { ...prev };
        });
    };

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: `${import.meta.env.VITE_BACKEND_SERVER}/campground`,
            data: newCamp,
        }).then(function (response) {
            // Handle response as needed
            console.log(response.data);
        });
        alert('New Campground Added');
    };

    return (
        <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white p-4 sm:p-6 md:p-8 lg:p-10 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md">
                {/* Summary Section as a Card */}
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-2xl font-bold text-lime-300 mb-2 flex items-center justify-center">
                        <FaInfoCircle className="mr-2 text-lime-300" />
                        Create Your Campground
                    </h2>
                    <p className="text-lg">
                        Fill in the details below to add a new campground to our platform. Your contributions help others find the perfect outdoor getaway!
                    </p>
                </div>

                <h1 className="text-3xl font-bold text-center text-lime-300 mb-6 flex items-center justify-center">
                    <FaPlusCircle className="mr-2 text-lime-300" />
                    New Campground
                </h1>

                {/* Location Input */}
                <div className="mb-4">
                    <label htmlFor="location" className="block text-lime-300 mb-2 flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        Location:
                    </label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="location"
                        id="location"
                        value={newCamp.location}
                        className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200"
                    />
                </div>

                {/* Title Input */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-lime-300 mb-2 flex items-center">
                        <FaTag className="mr-2" />
                        Title:
                    </label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="title"
                        id="title"
                        value={newCamp.title}
                        className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200"
                    />
                </div>

                {/* Price Input */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-lime-300 mb-2 flex items-center">
                        <FaDollarSign className="mr-2" />
                        Price:
                    </label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="price"
                        id="price"
                        value={newCamp.price}
                        className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200"
                    />
                </div>

                {/* Description Input */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-lime-300 mb-2 flex items-center">
                        <FaRegFileAlt className="mr-2" />
                        Description:
                    </label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="description"
                        id="description"
                        value={newCamp.description}
                        className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200"
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full p-3 bg-green-500 text-gray-800 font-bold rounded hover:bg-lime-400 transition duration-200"
                >
                    Add Campground
                </button>
            </div>
        </div>
    );
};

export default NewCampground;
