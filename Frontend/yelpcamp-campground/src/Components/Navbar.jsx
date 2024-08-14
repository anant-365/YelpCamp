import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <div>
      <nav>
        <NavLink to='home'><li>Home</li></NavLink>
        <NavLink to='campgroundlist' onClick={props.refetchNewCamp }><li>Campgrounds</li></NavLink>
        <NavLink to='newcampground'><li> Create new campgrounds</li></NavLink>
      </nav>
    </div>
  )
}

export default Navbar