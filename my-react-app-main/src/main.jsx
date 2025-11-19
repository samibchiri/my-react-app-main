import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NotFoundPage from '../PageNotFound.jsx'
import {Navigate,createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {path: "/", element: <Navigate to="/train" replace />}, //Redirect to train
  { path: '/train', element: <App /> }, 
  { path: '*', element: <NotFoundPage /> },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)