import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router-dom';

function App() {

  return( 
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App;
