import React, { useState } from 'react';
import axios from 'axios';

const NewCampground = () => {
    const [newCamp, setNewCamp] = useState({ location: '', title: '', price:'', description:'' });

    const handleChange = (evt) => {
        setNewCamp((prev) => {
            let changedProperty = evt.target.name;
            let changedValue = evt.target.value;
            prev[changedProperty] = changedValue;
            return { ...prev };
        });
    };

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: '/campground',
            data: newCamp
        }).then(function (response) {
            //pass
        });
    };

    return (
        <div className="bg-gray-800 text-white p-4 sm:p-6 md:p-8 lg:p-10 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-lime-300 mb-6">New Campground</h1>
                <label htmlFor="location" className="block text-lime-300 mb-2">Location:</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="location"
                    id="location"
                    value={newCamp.location}
                    className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
                />
                <label htmlFor="title" className="block text-lime-300 mb-2">Title:</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="title"
                    id="title"
                    value={newCamp.title}
                    className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
                />
                <label htmlFor="price" className="block text-lime-300 mb-2">Price:</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="price"
                    id="price"
                    value={newCamp.price}
                    className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
                />
                <label htmlFor="description" className="block text-lime-300 mb-2">Description:</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="description"
                    id="description"
                    value={newCamp.description}
                    className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full p-2 bg-green-500 text-gray-800 font-bold rounded hover:bg-lime-400"
                >
                    Add Campground
                </button>
            </div>
        </div>
    );
};

export default NewCampground;
