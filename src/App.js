import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Dashboards from './pages/Dashboards'
import NavBar from './components/NavBar.js'
import { getBaseResources } from './utils/APIUtils'

import { Button } from 'reactstrap'

function App() {

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboards/:id" component={Dashboards} />

      </Switch>

    </div>

  );
}

export default App;
