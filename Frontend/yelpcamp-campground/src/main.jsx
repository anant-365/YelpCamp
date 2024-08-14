import React from 'react'
import ReactDOM from 'react-dom/client'
import Campgrounds from './Components/Campgrounds';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Components/Home';
import App  from './App.jsx'
import './index.css'
import Show from './Components/Show.jsx';
import { counterContext } from './Context/Context.js';
import NewCampground from './Components/NewCampground.jsx';
import EditCampground from './Components/EditCampground.jsx';
import DeleteCampground from './Components/DeleteCampground.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='home' element={<Home/>}/>
      <Route path='newcampground' element={<NewCampground/>}/>
        <Route path='campgroundlist' >
        <Route index element={<Campgrounds />} />
          <Route path="showCamp/:campId" element={<Show />}>
          <Route path="editCampground/:campId" element={<EditCampground />} />
          <Route path="deleteCampground/:campId" element={<DeleteCampground />} />
        </Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
