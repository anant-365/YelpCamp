import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { counterContext } from '../Context/Context';

const EditCampground = () => {
    const campDetail = useContext(counterContext);
    let { campId } = useParams();
    let selectedCamp = campDetail.campData.find(data => data._id === campId.slice(1, campId.length));
    const [editCamp, setEditCamp] = useState({ location: selectedCamp.location, title: selectedCamp.title, _id: selectedCamp._id, price: selectedCamp.price, description: selectedCamp.description   });

    const handleChange = (evt) => {
        setEditCamp((prev) => {
            let changedProperty = evt.target.name;
            let changedValue = evt.target.value;
            prev[changedProperty] = changedValue;
            return { ...prev };
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios({
                method: 'put',
                url: `${import.meta.env.VITE_BACKEND_SERVER}/campground`,
                data: editCamp,
                withCredentials: true, // This ensures cookies are sent with the request
            });
            alert('campground edited');
        } catch (error) {
            // Display error message in an alert
            alert(`Error: ${error.response?.data?.message || error.message || 'Something went wrong!'}`);
            console.error(error);
        }
    };
    

    return (
        <div className="bg-gray-800 text-white p-4 sm:p-6 md:p-8 lg:p-10 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-lime-300 mb-6">Edit Campground</h1>
                <p className="text-center text-lime-300 mb-4">Camp ID: {editCamp._id}</p>
                <label htmlFor="location" className="block text-lime-300 mb-2">Location:</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="location"
                    id="location"
                    value={editCamp.location}
                    className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
                />
                <label htmlFor="title" className="block text-lime-300 mb-2">Title:</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="title"
                    id="title"
                    value={editCamp.title}
                    className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
                />
                <label htmlFor="price" className="block text-lime-300 mb-2">Price:</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="price"
                    id="price"
                    value={editCamp.price}
                    className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
                />
                <label htmlFor="description" className="block text-lime-300 mb-2">Description:</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="description"
                    id="description"
                    value={editCamp.description}
                    className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full p-2 bg-lime-300 text-gray-800 font-bold rounded hover:bg-lime-400"
                >
                    Update Campground
                </button>
            </div>
        </div>
    );
};

export default EditCampground;
