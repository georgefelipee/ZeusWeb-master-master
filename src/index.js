import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './Context/Authprovider';
import './index.css';
import AppRoutes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <React.StrictMode>
      <AppRoutes/>
   </React.StrictMode>
  </AuthProvider>
  
);

