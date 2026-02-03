
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from './layout/AppLayout.jsx'
import HomePage from "./pages/HomePage/HomePage.jsx";
import TrainPage from "./pages/TrainSelectPage/TrainSelectPage.jsx";
import CornerPermutationPage from "./pages/CpPage/CpPage.jsx";
import BarPersevationPage from "./pages/BarPersevationPage/BarPersevationPage.jsx";
import CpTrainer from './pages/CpTrainerPage/CpTrainerPage.jsx'
import BarTrainer from "./pages/BarTrainerPage/BarTrainer.jsx";
import LabsPage from "./pages/LabsPage/LabsPage.jsx";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'


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
          { path: "alg", element: <TrainPage /> },
          { path: "cp", element: <CpTrainer/> },
          { path: "bar", element: <BarTrainer /> },
        ],
      },

      {
        path: "recognition",
        children: [
          { index: true, element: <CornerPermutationPage /> },
          { path: "cp", element: <CornerPermutationPage /> },
          { path: "bar", element: <BarTrainer /> },
        ],
      },

      { path: "labs", element: <LabsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
