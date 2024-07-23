import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { counterContext } from './Context/Context';

function App() {
  const [campData, setCampData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/campground', {
          headers: {
            Accept: 'application/json',
          },
        });
        setCampData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <counterContext.Provider value={{ campData, setCampData }}>
      <Navbar />
      <Outlet />
    </counterContext.Provider>
  );
}

export default App;