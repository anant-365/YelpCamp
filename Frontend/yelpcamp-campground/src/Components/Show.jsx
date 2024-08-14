import React, { createContext } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { useContext } from 'react';
import { counterContext } from '../Context/Context';
import EditCampground from './EditCampground';

const Show = () => {
  let { campId } = useParams();
  const campDetail = useContext(counterContext)
  let selectedCamp = campDetail.campData.find(data => data._id === campId.slice(1,campId.length))
  return (
    <>
      <h1>ID: {selectedCamp._id}</h1>
      <h2>Location: {selectedCamp.location}</h2>
      <h2>Title: {selectedCamp.title}</h2>
      <NavLink to={`editCampground/${campId}`}>Edit Campground</NavLink> &nbsp;&nbsp;&nbsp;&nbsp;
      <NavLink to={`deleteCampground/${campId}`}>Delete Campground</NavLink>
      <Outlet/>
    </>
  )
}

export default Show