import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvaider } from './contexts/AuthContext';
import './index.css';
import router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvaider>
      <RouterProvider router={router} />
    </AuthProvaider>
  </React.StrictMode>
);
