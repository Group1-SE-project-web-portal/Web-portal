import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Dash1 from './pages/Dash1'
import Dashboards from './pages/Dashboards'
import NavBar from './components/NavBar.js'
import Charts from './components/Chart'

import { getAllDashboards, getCharts } from './utils/APIUtils'



class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      charts: '',
      dashId: '',
      isLoading: false,
      singleDashboard: '',
      dashboards: '',
      dataElements: '',
      organisationUnits: ''

    }
  }
  componentDidMount() {

    getCharts().then(data => { this.setState({ charts: data.charts }) })
    getAllDashboards().then(data => { this.setState({ dashboards: data.dashboards }) })

  }


  render() {


    const { charts, dashboards } = this.state

    if (!charts || !dashboards) {
      return <div>Loading....</div>
    }

    const dashboardOneItems = dashboards[2].dashboardItems
    const itemsIds = []

    for (let i = 0; i < dashboardOneItems.length; i++) {
      if (dashboardOneItems[i].chart) {
        itemsIds.push(dashboardOneItems[i].chart)
      }
    }

    let requiredCharts = []

    charts.forEach(keys1 => {

      if (itemsIds.find(keys2 => keys2.id === keys1.id)) {
        requiredCharts.push(keys1)
      }
    })
    console.log(dashboards)
    const dataPoints = [
      { x: 0, y: 25 },
      { x: 1, y: 27 },
      { x: 2, y: 428 },
      { x: 3, y: 324 },
      { x: 4, y: 35 },
      { x: 5, y: 339 },
      { x: 6, y: 4 },
      { x: 7, y: 525 },
      { x: 8, y: 323 },
      { x: 9, y: 420 },
      { x: 10, y: 37 },
      { x: 11, y: 384 }
    ]


    const chartOne = () => {
      return <Charts type={"spline"} title={"HELLO"} data={dataPoints} />
    }
    const chartTwo = () => {
      return <Charts type={"bar"} title={"hiv fact"} data={dataPoints} />
    }
    return (
      <div className="App" >

        <NavBar dash1={dashboards[3].displayName} dash2={dashboards[4].displayName} dash3={dashboards[5].displyName} dash4={"HIV"} />
        <Switch>
          <Route exact path="/" component={() =>
            <Dash1 >
              {chartOne()}
              {chartTwo()}
            </Dash1>} />
          <Route exact path="/dash2" component={Dashboards} />
          <Route exact path="/dash3" component={Dashboards} />
          <Route exact path="/dash4" component={Dashboards} />

        </Switch>

      </div>

    )

  }
}

export default App;
