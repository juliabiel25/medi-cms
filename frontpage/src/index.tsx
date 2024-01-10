import './index.css';

import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Main from './pages/Main';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import ArticlePage from './pages/ArticlePage';
import ArticlesPage from './pages/ArticlesPage';
import DoctorPage from './pages/Doctor';
import DoctorsPage from './pages/Doctors';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/articles",
    element: <ArticlesPage />,
  },
  {
    path: "/articlesOne",
    element: <ArticlePage />,
  },
  {
    path: "/doctors",
    element: <DoctorsPage/>
  },
  {
    path: "/doctorsOne",
    element: <DoctorPage/>
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

