import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import ResisterPage from './components/views/ResisterPage/ResisterPage';


function App() {
  return (
      <Router>
          <div>
              <switch>
                <Route exact path ="/" component = { LandingPage } />
                <Route  path ="/login" component = { LoginPage } />
                <Route  path ="/resister" component = {ResisterPage} />
              </switch>
          </div>
      </Router>
  )
}

export default App