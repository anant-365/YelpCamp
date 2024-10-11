import React, { useContext } from 'react';
import { NavLink, Outlet, useOutlet, useParams } from 'react-router-dom';
import { counterContext } from '../Context/Context';

const Show = () => {
  const outlet = useOutlet(); 
  let { campId } = useParams()
  const campDetail = useContext(counterContext);
  let selectedCamp = campDetail.campData.find(data => data._id === campId.slice(1, campId.length));

  return (<>
  {outlet ? (
        <Outlet /> // Render the child route's content
      ) : (
        <div className="bg-gray-800 text-white p-4 sm:p-6 md:p-8 md:flex-row lg:p-10 lg:flex-row min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
        <img src={selectedCamp.image} alt="Campground" className="w-full md:w-1/2 h-auto mb-4 md:mb-0 md:mr-6 rounded" />
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-lime-300 mb-4">ID: {selectedCamp._id}</h3>
            <h3 className="text-xl text-lime-300 mb-2">Location: {selectedCamp.location}</h3>
            <h3 className="text-xl text-lime-300 mb-2">Title: {selectedCamp.title}</h3>
            <h3 className="text-xl text-lime-300 mb-2">Price: {selectedCamp.price} $</h3>
            <h3 className="text-xl text-lime-300 mb-4">Description: {selectedCamp.description}</h3>
          </div>
          <div className="flex justify-between mt-4">
            <NavLink
              to={`editCampground/${campId}`}
              className="p-2 bg-lime-300 text-gray-800 font-bold rounded hover:bg-lime-400"
            >
              Edit Campground
            </NavLink>
            <NavLink
              to={`deleteCampground/${campId}`}
              className="p-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
            >
              Delete Campground
            </NavLink>
          </div>
        </div>
      </div>
    </div> // Fallback if no child route matches
      )}
    </>
  );
};

export default Show;
