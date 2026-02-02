
import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import TrainPage from "./TrainPage.jsx";
import CpPage from "./CpPage";
import BarPersevation from "./BarPersevation";
import CpTrainer from './CpTrainer.jsx'
import BarTrainer from "./BarTrainer.jsx";
import LabsPage from "./LabsPage";
import NotFoundPage from './NotFoundPage.jsx'


export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <HomePage /> }, // homepage

      {
        path: "train",
        children: [
          { index: true, element: <TrainPage /> },
          { path: "alg", element: <TrainPage /> },
          { path: "cp", element: <CpPage /> },
          { path: "bar", element: <BarPersevation /> },
        ],
      },

      {
        path: "recognition",
        children: [
          { index: true, element: <CpTrainer /> },
          { path: "cp", element: <CpTrainer /> },
          { path: "bar", element: <BarTrainer /> },
        ],
      },

      { path: "labs", element: <LabsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
