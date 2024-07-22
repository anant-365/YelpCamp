import React from 'react'
import ReactDOM from 'react-dom/client'
import Campgrounds,{dataFetch } from './Components/Campgrounds';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Components/Home';
import App from './App.jsx'
import './index.css'
import Show from './Components/Show.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='home' element={<Home/>}/>
      <Route path='campgroundlist'>
        <Route loader={dataFetch} index element={<Campgrounds/>}/>
        <Route path='show' element={<Show/>}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
