import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { FaCampground, FaMoneyBillWave } from 'react-icons/fa';
import { BsFillGeoAltFill } from 'react-icons/bs';

const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

const CampgroundMap = () => {
  const [campgroundCoordinates, setCampgroundCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Create a delay function

  const geocodeLocation = async (location) => {
    try {
      const response = await axios.get('https://us1.locationiq.com/v1/search.php', {
        params: {
          key: API_KEY,
          q: location,
          format: 'json',
        },
      });
      const { lat, lon } = response.data[0]; // Update here for correct property access
      return { lat, lng: lon }; // Return the coordinates
    } catch (geocodeError) {
      console.error('Error fetching coordinates:', geocodeError);
      return null;
    }
  };

  const fetchCampgrounds = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/campground`, {
        withCredentials: true, // This ensures cookies are sent with the request
      });
      const campgrounds = response.data;

      const updatedCampgrounds = [];
      
      for (const camp of campgrounds) {
        const coordinates = await geocodeLocation(camp.location);
        if (coordinates) {
          updatedCampgrounds.push({ ...camp, ...coordinates });
        }
        await delay(800); // Delay between requests to avoid hitting the free-tier rate limit
      }

      setCampgroundCoordinates(updatedCampgrounds);
    } catch (fetchError) {
      console.error('Error fetching campgrounds:', fetchError);
      setError('Failed to load campgrounds.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampgrounds();
  }, []);

  if (loading) return <div className="text-center text-xl font-semibold text-blue-600 mt-10">Loading map...<br></br> <p className="text-lg text-red-600">Please note, this map uses the free tier of the LocationIQ API, which has a limited number of requests per day. If some campgrounds are not displayed, kindly try again later. Your cooperation is appreciated!</p></div>;
  if (error) return <div className="text-center text-red-500 text-lg">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Explore Campgrounds</h1>
        <p className="text-lg text-gray-600">
          Discover the best campsites across the globe with real-time locations and info.
        </p>
        <p className="text-lg text-red-600">Please note, this map uses the free tier of the LocationIQ API, which has a limited number of requests per day. If some campgrounds are not displayed, kindly try again later. Your cooperation is appreciated!</p>
      </div>

      <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer center={[37.7749, -122.4194]} zoom={2} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {campgroundCoordinates.map((camp, index) => (
            <Marker key={index} position={[camp.lat, camp.lng]}>
              <Popup>
                <div className="p-2 text-center">
                  <h3 className="text-xl font-bold text-blue-800 mb-1 flex items-center justify-center">
                    <FaCampground className="mr-2" /> {camp.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">{camp.description}</p>
                  <p className="text-md font-semibold text-green-600 flex items-center justify-center mb-2">
                    <FaMoneyBillWave className="mr-1" /> Price: ${camp.price}
                  </p>
                  <p className="text-md font-semibold text-blue-500 flex items-center justify-center">
                    <BsFillGeoAltFill className="mr-1" /> Location: {camp.location}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Get Ready for Your Next Adventure!</h2>
        <p className="text-md text-gray-600">Whether you're a seasoned camper or a first-timer, explore these campgrounds and create unforgettable memories!</p>
      </div>
    </div>
  );
};

export default CampgroundMap;
