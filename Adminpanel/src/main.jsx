import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path='/*' element = {<App/>} />
        </Routes>
      </ThemeProvider>
    </Router>
    </GoogleOAuthProvider>;
    </AuthProvider>
  </React.StrictMode>
);
