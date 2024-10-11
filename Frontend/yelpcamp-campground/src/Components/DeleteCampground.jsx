import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteCampground = () => {
    let { campId } = useParams();

    const handleSubmit = () => {
        axios({
            method: 'delete',
            url: `${import.meta.env.VITE_BACKEND_SERVER}/campground/${campId.slice(1, campId.length)}`,
        }).then(function (response) {
            console.log(response.data);
        });
        alert('Campground Deleted')
    };

    return (
        <div className="bg-gray-800 text-white p-4 sm:p-6 md:p-8 lg:p-10 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md text-center">
                <p className="text-xl mb-4">
                    You are going to <b className="text-red-500">PERMANENTLY DELETE</b> Campground with id: <b>{campId.slice(1, campId.length)}</b>
                </p>
                <button
                    onClick={handleSubmit}
                    className="w-full p-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
                >
                    Confirm Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteCampground;
