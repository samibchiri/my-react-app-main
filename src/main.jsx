import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styling/index.css'
import AppLayout from './layout/AppLayout.jsx'
import CornerPermutationPage from './pages/CpPage/CpPage.jsx'
import BarPersevation from './pages/BarPersevationPage/BarPersevationPage.jsx'
import BarTrainer from './pages/BarTrainerPage/BarTrainer.jsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'
import {Navigate, RouterProvider } from 'react-router-dom'

import { router } from "./Router.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)