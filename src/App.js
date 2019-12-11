import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Dash1 from './pages/Dash1'
import Dashboards from './pages/Dashboards'
import NavBar from './components/NavBar.js'

import { getBaseResources } from './utils/APIUtils'

import { Button } from 'reactstrap'

function App() {

  return (
    <div className="App">
      <NavBar dash1={"MALARIA"} dash2={"IMMUNISATION"} dash3={"AIDS"} dash4={"HIV"} />


      <Switch>
        <Route exact path="/" component={Dash1} />
        <Route exact path="/dash1" component={Dashboards} />
        <Route exact path="/dash2" component={Dashboards} />
        <Route exact path="/dash3" component={Dashboards} />
        <Route exact path="/dash4" component={Dashboards} />
        <Route exact path="/dashboard" component={Dashboards} />

      </Switch>

    </div>

  );
}

export default App;
