import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'; // Adjust the path if needed

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
