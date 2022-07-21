import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import * as jwt from 'jsonwebtoken';

import StudentApp from './StudentApp';
import TPOApp from './TPOApp';
import Login from './components/Login/Login';
import useToken from './components/App/useToken';
import ForgotPassword from './components/ForgotPassword';
import AddJob from './pages/AddJob';

import './css/style.scss';
import './css/styles.css';
import './css/more-styles.css';

function App() {
  const location = useLocation();
  const { token, setToken } = useToken();

  if (location.pathname === '/forgot-password') {
    return <ForgotPassword />;
  }
 
  if (location.pathname === '/add-job') {
    return (<AddJob />);
  }

  if (!token) {
    return <Login setToken={setToken} />;
  }

  const payload = jwt.decode(token);
  // console.log(payload);
  // console.log(Date.now()/1000)
  if (payload.exp <= Date.now() / 1000) {
    localStorage.removeItem('token');
    return <Login setToken={setToken} />;
  }

  if (payload.role === 'student') {
    return <StudentApp />;
  }

  if (payload.role === 'tpo') {
    return <TPOApp />;
  }

  return <Login setToken={setToken} />;
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
