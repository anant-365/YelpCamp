import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { counterContext } from '../Context/Context';
const Campgrounds = () => {
    const campResponse = useContext(counterContext)
    return (
        <div>
            <h1>All Campgrounds</h1>
            <ul>
            {
                campResponse.campData.map((e)=>{
                    return <li key={e['_id']}><NavLink to={`showCamp/:${e['_id']}`}>{e['location']}</NavLink></li>
                })
            }
            </ul>
        </div>
    );
}

export default Campgrounds