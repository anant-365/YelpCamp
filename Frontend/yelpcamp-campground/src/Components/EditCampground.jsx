import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react';
import { counterContext } from '../Context/Context';

const EditCampground = () => {
    const campDetail = useContext(counterContext)
    let { campId } = useParams();
    let selectedCamp = campDetail.campData.find(data => data._id === campId.slice(1,campId.length))
    const [editCamp, setEditCamp] = useState({location:selectedCamp.location,title:selectedCamp.title,_id:selectedCamp._id})
    const handleChange = (evt)=>{
        setEditCamp((prev)=>{
            let changedProperty = evt.target.name
            let changedValue = evt.target.value
            prev[changedProperty] = changedValue
            return {...prev}
        })
    }
    const handleSubmit = ()=>{

        axios({
            method: 'put',
            url: '/campground',
            data:editCamp
          }).then(function (response) {
            //pass
          });
    }
  return (
    <>
    <h1> Edit Campground </h1>
    <br/>
    <p>Camp ID: {editCamp._id} </p>
    <label htmlFor='location'>Location:</label>
    <input onChange={handleChange} type='text' name='location' id='location' value={editCamp.location}/><br/><br/>
    <label htmlFor='title'>Title:</label>
    <input onChange={handleChange} type='text' name='title' id='title' value={editCamp.title}/><br/><br/>
    <button onClick={handleSubmit}>Submit Edit</button>
    </>
  )
}

export default EditCampground