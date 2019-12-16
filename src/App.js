import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Dash1 from './pages/Dash1'
import Dashboards from './pages/Dashboards'
import NavBar from './components/NavBar.js'
import Charts from './components/Chart'


import { getAllDashboards, getCharts, oneChart, getData, request } from './utils/APIUtils'
import { BASE_URL } from './constants/Constants';




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
    oneChart().then(data => { this.setState({ dashId: data }) })


  }


  render() {


    const { charts, dashboards, dashId } = this.state

    if (!charts || !dashboards) {
      return <div>Loading....</div>
    }

    const dashboardOneItems = dashboards[0].dashboardItems
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

    //prpare chart One
    const chartOneMetadata = requiredCharts[6];

    const chartOneName = chartOneMetadata.displayName
    const chartOneType = chartOneMetadata.type.toLowerCase()

    // const dimensionOne = chartOneMetadata.filterDimension;

    // const rows = dashId.rows;
    // const columns = dashId.metadata;

    // const single = request({
    //   url: BASE_URL,
    //   method: 'GET'
    // }).then(data => JSON.stringify(data))
    // const value = parseFloat(rows[0][2])
    // // const value2 = rows[0][2]
    // const value3 = rows[0][2]


    // requiredCharts[0].
    console.log(chartOneMetadata)
    const dataPoints = [
      { x: 0, y: 104 },
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
      return <Charts type={chartOneType} title={chartOneName} data={dataPoints} />
    }
    const chartTwo = () => {
      return <Charts type={"bar"} title={"hiv fact"} data={dataPoints} />
    }
    return (
      <div className="App" >

        <NavBar dash1={dashboards[3].displayName} dash2={dashboards[6].displayName} dash3={dashboards[0].displayName} dash4={dashboards[1].displayName} />
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
