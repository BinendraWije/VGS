import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path='/*' element = {<App/>} />
        </Routes>
      </ThemeProvider>
    </Router>
    </AuthProvider>
  </React.StrictMode>
);
