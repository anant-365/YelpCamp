import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const DeleteCampground = () => {
    let { campId } = useParams();
    const handleSubmit = ()=>{
        axios({
            method: 'delete',
            url: `/campground/${campId.slice(1, campId.length)}`,
          }).then(function (response) {
            console.log(response.data)
          });
    }
  return (
    <>
    <p>You are going to <b>PERMANENTLY DELETE</b> Campground with id: <b> {campId.slice(1,campId.length)} </b></p>
    <button onClick={handleSubmit}>Confirm Delete</button>
    </>
  )
}

export default DeleteCampground