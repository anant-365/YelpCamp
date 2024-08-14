import React, { useState } from 'react'
import axios from 'axios'

const NewCampground = () => {
    const [newCamp, setNewCamp] = useState({location:'',title:''})
    const handleChange = (evt)=>{
        setNewCamp((prev)=>{
            let changedProperty = evt.target.name
            let changedValue = evt.target.value
            prev[changedProperty] = changedValue
            return {...prev}
        })
    }
    const handleSubmit = ()=>{

        axios({
            method: 'post',
            url: '/campground',
            data:newCamp
          }).then(function (response) {
            //pass
          });
    }
  return (
    <>
    <h1> New Campground </h1>
    <br/>
    <label htmlFor='location'>Location:</label>
    <input onChange={handleChange} type='text' name='location' id='location' value={newCamp.location}/><br/><br/>
    <label htmlFor='title'>Title:</label>
    <input onChange={handleChange} type='text' name='title' id='title' value={newCamp.title}/><br/><br/>
    <button onClick={handleSubmit}>Add Campground</button>
    </>
  )
}

export default NewCampground