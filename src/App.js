import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Dashboards from './pages/Dashboards'
import NavBar from './components/NavBar.js'
import Charts from './components/Chart'
import { getBaseResources } from './utils/APIUtils'

import { Button } from 'reactstrap'

function App() {

  const dataPoints = [
    { x: new Date(2017, 0), y: 25060 },
    { x: new Date(2017, 1), y: 27980 },
    { x: new Date(2017, 2), y: 42800 },
    { x: new Date(2017, 3), y: 32400 },
    { x: new Date(2017, 4), y: 35260 },
    { x: new Date(2017, 5), y: 33900 },
    { x: new Date(2017, 6), y: 40000 },
    { x: new Date(2017, 7), y: 52500 },
    { x: new Date(2017, 8), y: 32300 },
    { x: new Date(2017, 9), y: 42000 },
    { x: new Date(2017, 10), y: 37160 },
    { x: new Date(2017, 11), y: 38400 }
  ]

  return (
    <div className="App">
      <NavBar dash1={"MALARIA"} dash2={"IMMUNISATION"} dash3={"AIDS"} dash4={"HIV"} />

      <div>
       <div> <Charts title={"MARIA VACCINES"} type={"spline"} data={dataPoints} />
        <Charts title={"HIV"} type={"bar"} data={dataPoints} />
        <Charts title={"IMMUNISATION"} type={"scatter"} data={dataPoints} />
        <Charts title={"EBOLA"} type={"area"} data={dataPoints} />
        <Charts title={"CHOLERA"} type={"waterfall"} data={dataPoints} />
        <Charts title={"TB"} type={"pie"} data={dataPoints} />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboards} />

      </Switch>

    </div>

  );
}

export default App;
