import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const Campgrounds = () => {
    const campResponse = useLoaderData();
    
    return (
        <div>
            <h1>All Campgrounds</h1>
            <ul>
            {
                campResponse.data.map((e)=>{
                    return <li key={e['_id']}><NavLink to={'show'}>{e['location']}</NavLink></li>
                })
            }
            </ul>
        </div>
    );
}

export default Campgrounds

export const dataFetch = async ()=>{
    const response = await axios.get('/campground', {
        headers: {
          'Accept': 'application/json',
        },
      })
      return response;
}