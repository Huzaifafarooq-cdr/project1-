import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginForm from '../components/login';
import RegisterForm from '../components/register';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (userData) => {
     fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      const { token } = data;
      if (token) {
        setLoggedIn(true);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleRegister = (userData) => {
    
    fetch('/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        
        window.location.href = '/login';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    
    });
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/register">
            <RegisterForm onSubmit={handleRegister} />
          </Route>
          <Route path="/">
            <LoginForm onSubmit={handleLogin} />
          </Route>
        </Switch>

    
      </div>
    </Router>
  );
};

export default App;
