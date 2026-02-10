
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from './layout/AppLayout.jsx'
import HomePage from "./pages/HomePage/HomePage.jsx";
import AlgTrainerPage from "./pages/AlgTrainerPage/AlgTrainerPage.jsx"
import TrainPage from "./pages/TrainSelectPage/TrainSelectPage.jsx";
import CornerPermutationPage from "./pages/CpPage/CpPage.jsx";
import BarPersevationPage from "./pages/BarPersevationPage/BarPersevationPage.jsx";
import CpTrainer from './pages/CpTrainerPage/CpTrainerPage.jsx'
import BarTrainer from "./pages/BarTrainerPage/BarTrainer.jsx";
import LabsPage from "./pages/LabsPage/LabsPage.jsx";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'
import BarOverlay from "./pages/BarPersevationPage/SingleBarOverlay.jsx";
import { ArrowDataGenerator } from "./dataGeneration/ArrowDataGenerator.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, 
    children: [
      { index: true, element: <HomePage /> }, // homepage

      {
        path: "train",
        children: [
          { index: true, element: <HomePage /> },
          { path: "alg", element: <AlgTrainerPage /> },
          { path: "cp", element: <CpTrainer/> },
          { path: "bar", element: <ArrowDataGenerator /> },
        ],
      },

      {
        path: "recognition",
        children: [
          { index: true, element: <CornerPermutationPage /> },
          { path: "cp", element: <CornerPermutationPage /> },
          { path: "bar", element: <BarPersevationPage /> },
        ],
      },

      { path: "labs", element: <BarOverlay
                                  
                                  ollAlg=""
                                  pllAlg= "x R2 F R F' R U2 r' U r U2x'" 
                                  ollId= "OLL 23-0"
                                  /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
