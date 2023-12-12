import './index.css';

import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Article from './pages/Article';
import Main from './pages/Main';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/article/:articleId",
    element: <Article />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

