import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import ResisterPage from './components/views/ResisterPage/ResisterPage';
import Auth from './hoc/auth';

function App() {
  return (
      <Router>
          <div>
              <Switch>
                <Route exact path ="/" component = { Auth(LandingPage, null) } />
                <Route  path ="/login" component = { Auth(LoginPage, false) } />
                <Route  path ="/resister" component = { Auth(ResisterPage, false) } />
              </Switch>
          </div>
      </Router>
  )
}

export default App
