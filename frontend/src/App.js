import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { About } from './components/About';
import { Users } from './components/Users';
import { NavBar } from './components/Navbar';

import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Switch>
          <Route path="/about" component={ About } />
          <Route path="/" component= { Users } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
