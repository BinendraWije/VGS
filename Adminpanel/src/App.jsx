import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import Signin from './pages/Signin';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        {/* public routes  */}
        <Route exact path="/signin" element={<Signin />} />

        {/* protected routes  */}
        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={['Admin','Moderator']} />}>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/users" element={<UsersPage />} />
        </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
