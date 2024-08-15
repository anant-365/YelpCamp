import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { counterContext } from '../Context/Context';

const Campgrounds = () => {
    const campResponse = useContext(counterContext);

    return (
        <div className="bg-gray-800 text-white p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-lime-300 mb-6">All Campgrounds</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {campResponse.campData.map((e) => (
                    <div key={e['_id']} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold text-lime-300 mb-2">{e['location']}</h2>
                        <p className="mb-2">{e['description']}</p>
                        <NavLink
                            to={`showCamp/:${e['_id']}`}
                            className="inline-block mt-4 p-2 bg-lime-300 text-gray-800 font-bold rounded hover:bg-lime-400"
                        >
                            Show
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Campgrounds;
