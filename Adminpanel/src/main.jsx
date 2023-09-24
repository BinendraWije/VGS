import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
